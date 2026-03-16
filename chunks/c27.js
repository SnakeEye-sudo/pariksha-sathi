// c27.js — Weather Widget + Current Affairs RSS + Web Speech API

// ══════════════════════════════════════════════════════════════
// 1. WEATHER WIDGET (Open-Meteo — free, no API key)
// ══════════════════════════════════════════════════════════════
const WMO_CODES = {
  0:'☀️ Clear',1:'🌤️ Mainly Clear',2:'⛅ Partly Cloudy',3:'☁️ Overcast',
  45:'🌫️ Foggy',48:'🌫️ Icy Fog',51:'🌦️ Light Drizzle',53:'🌦️ Drizzle',
  55:'🌧️ Heavy Drizzle',61:'🌧️ Light Rain',63:'🌧️ Rain',65:'🌧️ Heavy Rain',
  71:'🌨️ Light Snow',73:'🌨️ Snow',75:'❄️ Heavy Snow',80:'🌦️ Showers',
  81:'🌧️ Heavy Showers',82:'⛈️ Violent Showers',95:'⛈️ Thunderstorm',
  96:'⛈️ Hail Storm',99:'⛈️ Heavy Hail',
};

const WEATHER_TIPS = {
  rain: ['Ghar par padho — perfect study weather! 📚', 'Barish mein chai + books = perfect combo ☕'],
  clear: ['Aaj mausam saaf hai — focus karo! 🎯', 'Sunny day — energy high rakho! ⚡'],
  cloudy: ['Cloudy day — concentration ke liye best! 🧠', 'Overcast sky — deep study mode on! 📖'],
  cold: ['Thandi hai — warm raho aur padhte raho! 🧣', 'Sardi mein blanket + books = cozy study! 🛋️'],
  hot: ['Garmi hai — hydrated raho aur padhte raho! 💧', 'AC/fan on karo aur study karo! 🌬️'],
};

let _weatherCache = null;
let _weatherCacheTime = 0;

async function fetchWeather() {
  const now = Date.now();
  if (_weatherCache && now - _weatherCacheTime < 30 * 60 * 1000) return _weatherCache;

  return new Promise(resolve => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const { latitude: lat, longitude: lon } = pos.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m&timezone=Asia%2FKolkata`;
        const res = await fetch(url);
        const data = await res.json();
        const c = data.current;
        _weatherCache = { temp: Math.round(c.temperature_2m), code: c.weathercode, wind: Math.round(c.windspeed_10m) };
        _weatherCacheTime = now;
        resolve(_weatherCache);
      } catch { resolve(null); }
    }, () => resolve(null), { timeout: 5000 });
  });
}

function getWeatherTip(code, temp) {
  if (code >= 51 && code <= 82) return WEATHER_TIPS.rain[Math.floor(Math.random()*2)];
  if (code >= 95) return WEATHER_TIPS.rain[0];
  if (temp <= 15) return WEATHER_TIPS.cold[Math.floor(Math.random()*2)];
  if (temp >= 35) return WEATHER_TIPS.hot[Math.floor(Math.random()*2)];
  if (code >= 2) return WEATHER_TIPS.cloudy[Math.floor(Math.random()*2)];
  return WEATHER_TIPS.clear[Math.floor(Math.random()*2)];
}

async function injectWeatherWidget() {
  const existing = document.getElementById('weatherWidget');
  if (existing) return;

  const progressLabel = document.getElementById('planProgressLabel');
  if (!progressLabel) return;

  const widget = document.createElement('div');
  widget.id = 'weatherWidget';
  widget.className = 'weather-widget loading';
  widget.innerHTML = `<span class="weather-loading">🌡️ Loading weather…</span>`;
  progressLabel.parentNode.insertBefore(widget, progressLabel.nextSibling);

  const w = await fetchWeather();
  if (!w) { widget.remove(); return; }

  const label = WMO_CODES[w.code] || '🌡️ Weather';
  const tip = getWeatherTip(w.code, w.temp);
  widget.className = 'weather-widget';
  widget.innerHTML = `
    <div class="weather-main">
      <span class="weather-label">${label}</span>
      <span class="weather-temp">${w.temp}°C</span>
    </div>
    <div class="weather-tip">${tip}</div>
  `;
}

// ══════════════════════════════════════════════════════════════
// 2. CURRENT AFFAIRS — GNews API (free, CORS-friendly)
// ══════════════════════════════════════════════════════════════
// GNews free tier: 100 req/day, no CORS issues
const GNEWS_API_KEY = 'def2f18d9384efb35cb6217a7659c5f0';
const NEWS_CATEGORIES = [
  { label: 'India', query: 'India government policy', lang: 'en' },
  { label: 'UPSC', query: 'UPSC civil services exam India', lang: 'en' },
  { label: 'Economy', query: 'India economy budget finance', lang: 'en' },
];
let _currentFeedIdx = 0;
let _newsCache = {};

// Multiple free API fallbacks
async function fetchNewsItems(categoryIdx) {
  const catKeys = ['india', 'upsc', 'economy'];
  const catKey = catKeys[categoryIdx] || 'india';
  const cat = NEWS_CATEGORIES[categoryIdx];
  const cacheKey = `cat_${categoryIdx}`;
  if (_newsCache[cacheKey] && Date.now() - _newsCache[cacheKey].time < 20 * 60 * 1000) {
    return _newsCache[cacheKey].items;
  }

  // ── Try 1: news.json from repo (GitHub Action updates daily) ──
  try {
    const base = window.location.pathname.replace(/\/$/, '');
    const res = await fetch(`${base}/news.json?t=${Math.floor(Date.now()/3600000)}`);
    if (res.ok) {
      const data = await res.json();
      const items = (data.categories?.[catKey] || []);
      if (items.length) {
        _newsCache[cacheKey] = { items, time: Date.now() };
        return items;
      }
    }
  } catch { /* fall through */ }

  // ── Try 2: GNews API directly ──
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(cat.query)}&lang=${cat.lang}&country=in&max=15&apikey=${GNEWS_API_KEY}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.articles && data.articles.length) {
        const items = data.articles.map(a => ({
          title: a.title,
          link: a.url,
          pubDate: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short' }) : '',
          description: (a.description || '').slice(0, 130),
          source: a.source?.name || '',
        }));
        _newsCache[cacheKey] = { items, time: Date.now() };
        return items;
      }
    }
  } catch { /* fall through */ }

  // ── Try 3: Static curated links (always works) ──
  return getStaticNewsLinks(categoryIdx);
}

function getStaticNewsLinks(idx) {
  const staticLinks = [
    [
      { title: 'PIB — Press Information Bureau (Government of India)', link: 'https://pib.gov.in', pubDate: 'Today', description: 'Official government press releases — best for UPSC current affairs', source: 'PIB' },
      { title: 'The Hindu — National News', link: 'https://www.thehindu.com/news/national/', pubDate: 'Today', description: 'Top national news for UPSC preparation', source: 'The Hindu' },
      { title: 'Indian Express — India News', link: 'https://indianexpress.com/section/india/', pubDate: 'Today', description: 'Latest India news and analysis', source: 'Indian Express' },
      { title: 'Lok Sabha — Latest Bills & Acts', link: 'https://loksabha.nic.in', pubDate: 'Today', description: 'Parliament bills, acts, and debates', source: 'Lok Sabha' },
    ],
    [
      { title: 'UPSC Official Website', link: 'https://upsc.gov.in', pubDate: 'Today', description: 'Official UPSC notifications, syllabus, and results', source: 'UPSC' },
      { title: 'Insights IAS — Current Affairs', link: 'https://www.insightsonindia.com/current-affairs/', pubDate: 'Today', description: 'Daily current affairs for UPSC', source: 'Insights IAS' },
      { title: 'Vision IAS — Monthly Magazine', link: 'https://www.visionias.in/current-affairs/', pubDate: 'Today', description: 'Monthly current affairs compilation', source: 'Vision IAS' },
    ],
    [
      { title: 'RBI — Monetary Policy & Reports', link: 'https://www.rbi.org.in', pubDate: 'Today', description: 'RBI reports, monetary policy, and economic data', source: 'RBI' },
      { title: 'Ministry of Finance — Budget', link: 'https://www.indiabudget.gov.in', pubDate: 'Today', description: 'Union Budget documents and economic survey', source: 'MoF' },
      { title: 'NITI Aayog — Reports', link: 'https://www.niti.gov.in', pubDate: 'Today', description: 'Policy reports and India development data', source: 'NITI Aayog' },
    ],
  ];
  return staticLinks[idx] || staticLinks[0];
}

function generateNewsTabHTML() {
  return `
    <div class="news-tab-wrap">
      <div class="news-feed-selector">
        ${NEWS_CATEGORIES.map((f, i) => `<button class="news-src-btn${i===0?' active':''}" onclick="switchNewsFeed(${i})">${f.label}</button>`).join('')}
      </div>
      <div id="newsContainer" class="news-container">
        <div class="news-loading">📰 Loading current affairs…</div>
      </div>
    </div>
  `;
}

async function loadNewsTab(feedIdx) {
  _currentFeedIdx = feedIdx;
  const container = document.getElementById('newsContainer');
  if (!container) return;
  container.innerHTML = '<div class="news-loading">📰 Loading…</div>';

  const items = await fetchNewsItems(feedIdx);

  if (!items.length) {
    container.innerHTML = `<div class="news-empty">⚠️ Could not load news. Check internet connection.</div>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <a class="news-card" href="${item.link}" target="_blank" rel="noopener">
      <div class="news-card-meta">
        ${item.pubDate ? `<span class="news-card-date">${item.pubDate}</span>` : ''}
        ${item.source ? `<span class="news-card-source">${item.source}</span>` : ''}
      </div>
      <div class="news-card-title">${item.title}</div>
      ${item.description ? `<div class="news-card-desc">${item.description}</div>` : ''}
    </a>
  `).join('');
}

function switchNewsFeed(idx) {
  _currentFeedIdx = idx;
  document.querySelectorAll('.news-src-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  loadNewsTab(idx);
}

// ══════════════════════════════════════════════════════════════
// 3. WEB SPEECH API — Voice Read Aloud
// ══════════════════════════════════════════════════════════════
let _speechActive = false;

function speakText(text) {
  if (!('speechSynthesis' in window)) {
    alert('Your browser does not support text-to-speech.');
    return;
  }
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'hi-IN';
  utt.rate = 0.9;
  utt.pitch = 1;
  // Try to pick a Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const hiVoice = voices.find(v => v.lang.startsWith('hi')) || voices.find(v => v.lang.startsWith('en-IN'));
  if (hiVoice) utt.voice = hiVoice;
  utt.onstart = () => { _speechActive = true; };
  utt.onend = () => { _speechActive = false; };
  window.speechSynthesis.speak(utt);
}

function speakSlot(btn) {
  const card = btn.closest('.slot-card');
  if (!card) return;

  if (_speechActive) {
    window.speechSynthesis.cancel();
    _speechActive = false;
    btn.textContent = '🔊';
    btn.title = 'Read aloud';
    return;
  }

  const title = card.querySelector('.slot-card-title')?.textContent || '';
  const part  = card.querySelector('.slot-part-label')?.textContent || '';
  const micros = [...card.querySelectorAll('.slot-micro-list li')].map(li => li.textContent).join(', ');
  const text = [part, title, micros ? 'Topics: ' + micros : ''].filter(Boolean).join('. ');

  btn.textContent = '⏹️';
  btn.title = 'Stop';
  speakText(text);

  // Reset button after speech ends
  const utt = window.speechSynthesis.speaking;
  const checkDone = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      btn.textContent = '🔊';
      btn.title = 'Read aloud';
      clearInterval(checkDone);
    }
  }, 500);
}

// Patch generateDayPlanHTML to inject 🔊 button into subject slot cards
(function patchSpeechButtons() {
  const origGen = window.generateDayPlanHTML;
  if (typeof origGen !== 'function') return;
  window.generateDayPlanHTML = function() {
    let html = origGen();
    // Inject speech button after slot-card-title in subject-slot-cards
    html = html.replace(
      /(<div class="slot-card subject-slot-card"[^>]*>)/g,
      '$1<button class="slot-speak-btn" onclick="speakSlot(this)" title="Read aloud">🔊</button>'
    );
    return html;
  };
})();

// ══════════════════════════════════════════════════════════════
// 4. PATCH renderPlan — add 📰 News tab + weather widget
// ══════════════════════════════════════════════════════════════
(function initC27() {
  const origRender = window.renderPlan;
  if (typeof origRender !== 'function') return;

  window.renderPlan = function() {
    origRender();

    // Add News tab to tab bar
    const tabBar = document.querySelector('.tab-bar');
    if (tabBar && !tabBar.querySelector('[data-tab="tabNews"]')) {
      const newsBtn = document.createElement('button');
      newsBtn.className = 'tab-btn';
      newsBtn.setAttribute('data-tab', 'tabNews');
      newsBtn.textContent = '📰 News';
      newsBtn.onclick = function() { showTab('tabNews'); };
      tabBar.appendChild(newsBtn);
    }

    // Add News tab content panel
    const planBody = document.getElementById('planBody');
    if (planBody && !document.getElementById('tabNews')) {
      const newsDiv = document.createElement('div');
      newsDiv.id = 'tabNews';
      newsDiv.className = 'tab-content';
      newsDiv.innerHTML = generateNewsTabHTML();
      planBody.appendChild(newsDiv);
    }

    // Patch showTab to load news on first open
    const origShowTab = window.showTab;
    window.showTab = function(id) {
      origShowTab(id);
      if (id === 'tabNews') {
        // Load if not already loaded
        const container = document.getElementById('newsContainer');
        if (container && container.querySelector('.news-loading')) {
          loadNewsTab(_currentFeedIdx);
        }
      }
    };

    // Inject weather widget
    setTimeout(injectWeatherWidget, 200);
  };
})();
