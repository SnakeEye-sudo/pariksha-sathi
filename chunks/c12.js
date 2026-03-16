// Returns a human-readable exam label for PDF cover
function getExamDisplayLabel() {
  if (userData.exam === 'bpsc') {
    return 'BPSC TRE 4.0 — Class ' + (userData.bpscClass === 'both' ? '1–5 & 6–8' : userData.bpscClass);
  }
  if (userData.exam === 'upsc') {
    return 'UPSC CSE ' + (userData.upscYear || '2027');
  }
  const cfg = (typeof getExamConfig === 'function') ? getExamConfig(userData.exam) : null;
  if (cfg) {
    if (userData.exam === 'bpsc_tre') {
      return 'BPSC TRE 4.0 — Class ' + (userData.bpscClass === 'both' ? '1–5 & 6–8' : userData.bpscClass);
    }
    return cfg.title;
  }
  return userData.exam.toUpperCase();
}
