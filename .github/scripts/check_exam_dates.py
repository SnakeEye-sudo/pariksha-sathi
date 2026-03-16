#!/usr/bin/env python3
"""
ParikshaSathi — Exam Date Auto-Checker
Runs every 24 hours via GitHub Actions.
Fetches official exam dates from reliable sources and updates chunks/c14.js + chunks/c19.js if changed.
By Er. Sangam Krishna
"""

import re
import sys
import json
import urllib.request
import urllib.parse
from datetime import datetime, date

# ── KNOWN OFFICIAL DATES (updated manually or by this script) ──────────────
# Format: exam_id -> { date: 'YYYY-MM-DD', label: 'display text', source: 'url', tentative: bool }
KNOWN_DATES = {
    # Teaching
    "bpsc_tre":         {"date": "2026-09-22", "label": "Sep 2026 (Tentative)", "tentative": True},
    # Civil Services
    "upsc_2026":        {"date": "2026-05-24", "label": "May 24, 2026",         "tentative": False},
    "upsc_2027":        {"date": "2027-05-16", "label": "May 2027",             "tentative": True},
    # State PSC (Bihar)
    "bpsc_71":          {"date": "2026-04-25", "label": "Apr 25–30, 2026",      "tentative": False},
    "bpsc_72":          {"date": "2026-07-26", "label": "Jul 26, 2026",         "tentative": False},
    # SSC
    "ssc_cgl":          {"date": "2026-05-20", "label": "May–Jun 2026 (Tentative)", "tentative": True},
    # Banking
    "ibps_po":          {"date": "2026-08-22", "label": "Aug 22–23, 2026",      "tentative": False},
    "sbi_po":           {"date": "2026-09-01", "label": "Sep 2026 (Tentative)", "tentative": True},
    "ibps_rrb":         {"date": "2026-11-21", "label": "Nov 21–22, 2026",      "tentative": False},
    "ibps_clerk":       {"date": "2026-10-10", "label": "Oct 10–11, 2026",      "tentative": False},
    # Defence
    "nda_2026":         {"date": "2026-04-12", "label": "Apr 12, 2026",         "tentative": False},
    # Medical
    "neet_2026":        {"date": "2026-05-03", "label": "May 3, 2026",          "tentative": False},
    # Engineering
    "jee_main_2026":    {"date": "2026-04-02", "label": "Apr 2–9, 2026",        "tentative": False},
    "jee_advanced_2026":{"date": "2026-05-17", "label": "May 17, 2026",         "tentative": False},
    # Other State PSC
    "uppsc_2026":       {"date": "2026-12-06", "label": "Dec 6, 2026",          "tentative": False},
    "mppsc_2026":       {"date": "2026-04-26", "label": "Apr 26, 2026",         "tentative": False},
    "rpsc_ras_2026":    {"date": "2026-06-15", "label": "Jun–Jul 2026 (Tentative)", "tentative": True},
    "mpsc_2026":        {"date": "2026-03-29", "label": "Mar 29 – Apr 26, 2026","tentative": False},
}

# ── SEARCH QUERIES for each exam ───────────────────────────────────────────
SEARCH_QUERIES = {
    "bpsc_tre":          "BPSC TRE 4.0 exam date 2026 official",
    "upsc_2026":         "UPSC CSE prelims 2026 exam date official May 24",
    "upsc_2027":         "UPSC CSE prelims 2027 exam date official",
    "bpsc_71":           "BPSC 71st CCE mains exam date 2026 official",
    "bpsc_72":           "BPSC 72nd CCE prelims exam date 2026 official July 26",
    "ssc_cgl":           "SSC CGL 2026 tier 1 exam date official",
    "ibps_po":           "IBPS PO 2026 prelims exam date official August",
    "sbi_po":            "SBI PO 2026 exam date official notification",
    "ibps_rrb":          "IBPS RRB PO 2026 prelims exam date official November",
    "ibps_clerk":        "IBPS Clerk 2026 prelims exam date official October",
    "nda_2026":          "NDA 1 2026 exam date official UPSC April 12",
    "neet_2026":         "NEET UG 2026 exam date official NTA May 3",
    "jee_main_2026":     "JEE Main 2026 session 2 exam date official NTA April",
    "jee_advanced_2026": "JEE Advanced 2026 exam date official IIT Roorkee May 17",
    "uppsc_2026":        "UPPSC PCS 2026 prelims exam date official",
    "mppsc_2026":        "MPPSC SSE 2026 prelims exam date official",
    "rpsc_ras_2026":     "RPSC RAS 2026 prelims exam date official",
    "mpsc_2026":         "MPSC Rajyaseva 2026 mains exam date official",
}

# ── DATE PATTERNS to extract from search snippets ──────────────────────────
DATE_PATTERNS = [
    # "May 3, 2026" / "May 17, 2026"
    r'\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),?\s+(202[6-9])\b',
    # "3 May 2026" / "26 April 2026"
    r'\b(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(202[6-9])\b',
    # "26th July 2026"
    r'\b(\d{1,2})(?:st|nd|rd|th)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(202[6-9])\b',
]

MONTH_MAP = {
    "january":1,"february":2,"march":3,"april":4,"may":5,"june":6,
    "july":7,"august":8,"september":9,"october":10,"november":11,"december":12
}

def parse_date_from_text(text):
    """Extract the earliest future date from text."""
    found = []
    for pat in DATE_PATTERNS:
        for m in re.finditer(pat, text, re.IGNORECASE):
            g = m.groups()
            try:
                if g[0].isdigit():
                    # "3 May 2026" format
                    day, month_str, year = int(g[0]), g[1].lower(), int(g[2])
                else:
                    # "May 3 2026" format
                    month_str, day, year = g[0].lower(), int(g[1]), int(g[2])
                month = MONTH_MAP.get(month_str)
                if month and 1 <= day <= 31 and 2026 <= year <= 2028:
                    found.append(date(year, month, day))
            except (ValueError, TypeError):
                continue
    if not found:
        return None
    today = date.today()
    future = [d for d in found if d >= today]
    return min(future) if future else min(found, key=lambda d: abs((d - today).days))

def fetch_url(url, timeout=10):
    """Simple HTTP GET."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 ParikshaSathi-DateChecker/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  [WARN] fetch failed: {e}")
        return ""

def search_duckduckgo(query):
    """Search DuckDuckGo instant answers API (no key needed)."""
    q = urllib.parse.quote_plus(query)
    url = f"https://api.duckduckgo.com/?q={q}&format=json&no_html=1&skip_disambig=1"
    text = fetch_url(url)
    if not text:
        return ""
    try:
        data = json.loads(text)
        parts = []
        if data.get("AbstractText"):
            parts.append(data["AbstractText"])
        for r in data.get("RelatedTopics", [])[:5]:
            if isinstance(r, dict) and r.get("Text"):
                parts.append(r["Text"])
        return " ".join(parts)
    except Exception:
        return text[:2000]

def search_google_cache(query):
    """Try Google search via scraping (fallback)."""
    q = urllib.parse.quote_plus(query)
    url = f"https://www.google.com/search?q={q}&num=5"
    text = fetch_url(url)
    # Strip HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text[:3000]

def check_exam_date(exam_id, query):
    """Search for exam date and return parsed date or None."""
    print(f"  Checking: {exam_id}")
    # Try DuckDuckGo first
    text = search_duckduckgo(query)
    parsed = parse_date_from_text(text) if text else None
    if not parsed:
        # Fallback: Google
        text = search_google_cache(query)
        parsed = parse_date_from_text(text) if text else None
    if parsed:
        print(f"    Found date: {parsed}")
    else:
        print(f"    No date found, keeping existing")
    return parsed

def update_js_file(filepath, exam_id, new_date_str):
    """Update examDate in a JS chunk file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern: id: 'exam_id', ... examDate: new Date('YYYY-MM-DD')
    # We look for the examDate line near the exam_id block
    pattern = r"(id:\s*['\"]" + re.escape(exam_id) + r"['\"].*?examDate:\s*new Date\(['\"])(\d{4}-\d{2}-\d{2})(['\"])"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_date = match.group(2)
        if old_date != new_date_str:
            new_content = content[:match.start(2)] + new_date_str + content[match.end(2):]
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"    ✅ Updated {exam_id}: {old_date} → {new_date_str}")
            return True
        else:
            print(f"    ✓ {exam_id}: date unchanged ({old_date})")
    else:
        print(f"    [WARN] Could not find examDate pattern for {exam_id} in {filepath}")
    return False

def update_index_html(exam_id, new_label):
    """Update display label in index.html for the exam card."""
    # We don't auto-update index.html labels to avoid breaking HTML structure
    # Just log it
    print(f"    [INFO] index.html label for {exam_id} may need manual update to: {new_label}")

def write_report(results):
    """Write a markdown report of what was checked/changed."""
    lines = [
        "# ParikshaSathi — Exam Date Check Report",
        f"**Run date:** {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "| Exam | Previous Date | Checked Date | Status |",
        "|------|--------------|--------------|--------|",
    ]
    for r in results:
        status = "✅ Updated" if r["changed"] else ("⚠️ Not found" if not r["found"] else "✓ Unchanged")
        lines.append(f"| {r['exam_id']} | {r['prev_date']} | {r['new_date'] or 'N/A'} | {status} |")
    lines += ["", "---", "_Auto-generated by ParikshaSathi date checker_"]
    with open("exam_date_report.md", "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("\n📄 Report written to exam_date_report.md")

def main():
    print("=" * 60)
    print("ParikshaSathi — Exam Date Auto-Checker")
    print(f"Run: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
    print("=" * 60)

    # Map exam_id to which JS file it lives in
    C14_EXAMS = {"bpsc_tre","upsc_2026","upsc_2027","bpsc_71","bpsc_72",
                 "ssc_cgl","ibps_po","sbi_po","ibps_rrb","ibps_clerk","nda_2026"}
    C19_EXAMS = {"neet_2026","jee_main_2026","jee_advanced_2026",
                 "uppsc_2026","mppsc_2026","rpsc_ras_2026","mpsc_2026"}

    any_changed = False
    results = []

    for exam_id, query in SEARCH_QUERIES.items():
        known = KNOWN_DATES.get(exam_id, {})
        prev_date = known.get("date", "unknown")

        # Skip exams that are already past
        try:
            exam_dt = date.fromisoformat(prev_date)
            if exam_dt < date.today():
                print(f"  Skipping {exam_id} — exam date {prev_date} already passed")
                results.append({"exam_id": exam_id, "prev_date": prev_date, "new_date": prev_date, "changed": False, "found": True})
                continue
        except ValueError:
            pass

        found_date = check_exam_date(exam_id, query)
        new_date_str = found_date.isoformat() if found_date else None
        changed = False

        if new_date_str and new_date_str != prev_date:
            # Only update if the new date is different AND not tentative override
            if exam_id in C14_EXAMS:
                changed = update_js_file("chunks/c14.js", exam_id, new_date_str)
            elif exam_id in C19_EXAMS:
                changed = update_js_file("chunks/c19.js", exam_id, new_date_str)
            if changed:
                KNOWN_DATES[exam_id]["date"] = new_date_str
                any_changed = True

        results.append({
            "exam_id": exam_id,
            "prev_date": prev_date,
            "new_date": new_date_str,
            "changed": changed,
            "found": found_date is not None
        })

    write_report(results)

    if any_changed:
        print("\n🔄 Changes detected — build.py will be run by GitHub Action")
        sys.exit(0)
    else:
        print("\n✓ No date changes detected")
        sys.exit(0)

if __name__ == "__main__":
    main()
