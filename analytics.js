/* ============================================================
   RII APK BUILDER — analytics.js
   ============================================================ */
(function () {
  const LS_KEY = 'rii_analytics';
  const SESSION_KEY = 'rii_session_id';

  function getSessionId() {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  }

  function track(eventName, data) {
    data = data || {};
    try {
      const events = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      events.push({
        event: eventName,
        data: data,
        session: getSessionId(),
        url: window.location.href,
        referrer: document.referrer || 'direct',
        time: new Date().toISOString()
      });
      localStorage.setItem(LS_KEY, JSON.stringify(events.slice(-200)));
    } catch (e) { console.warn('Analytics error:', e); }
  }

  track('page_view', { title: document.title, path: window.location.pathname });

  document.addEventListener('click', function (e) {
    const el = e.target.closest('button, a');
    if (!el) return;
    const t = (el.textContent || '').trim().substring(0, 50);
    if (!t) return;
    if (t.includes('Convert')) track('click_convert', { text: t });
    else if (t.includes('Build')) track('click_build', { text: t });
    else if (t.includes('Download')) track('click_download', { text: t });
    else track('click_generic', { text: t });
  }, true);

  window.riiTrack = track;
})();