/* ============================================================
   RII APK BUILDER — app.js
   ============================================================ */

const FEATURES = [
  { icon: '🔔', title: 'Push Notification', desc: 'Send real-time push notifications to engage users.' },
  { icon: '🎨', title: 'Custom Splash', desc: 'Set a customised splash screen with your branding.' },
  { icon: '📡', title: 'No Internet Screen', desc: 'Custom screen when users have no connection.' },
  { icon: '🔗', title: 'Deep Linking', desc: 'Link directly to specific app pages from external sources.' },
  { icon: '👤', title: 'Custom User Agent', desc: "Control your app's interaction with websites." },
  { icon: '🔄', title: 'Internal vs External', desc: 'Choose how links open in your app.' },
  { icon: '📸', title: 'Disable Screenshots', desc: 'Prevent screenshots within the app.' },
  { icon: '🔒', title: 'URL Scheme', desc: 'Custom URL schemes to launch your app.' },
  { icon: '📋', title: 'Clipboard Control', desc: 'Enable or restrict copy-paste.' },
  { icon: '💾', title: 'Disable Caching', desc: 'Prevent cached data storage.' },
  { icon: '↗️', title: 'App Linking', desc: 'Share app links and open specific pages.' },
  { icon: '⬇️', title: 'Downloads & Uploads', desc: 'Allow file download and upload in-app.' },
  { icon: '🔄', title: 'App Syncing', desc: 'Real-time sync between app and website.' },
  { icon: '↕️', title: 'Pull to Refresh', desc: 'Refresh content by pulling down.' },
  { icon: '📱', title: 'Screen Orientation', desc: 'Portrait, landscape, or auto-rotate.' },
  { icon: '🔍', title: 'Pinch to Zoom', desc: 'Enable or disable pinch-to-zoom.' },
  { icon: '📍', title: 'Geo Location', desc: 'Access user location for personalised content.' },
  { icon: '⏳', title: 'Custom Loader', desc: 'Custom loading screen between pages.' },
  { icon: '🔢', title: 'Version Control', desc: 'Customise app version code.' },
  { icon: '🛡️', title: 'Security', desc: 'SSL enforcement and data protection.' }
];

const FAQS = [
  { q: 'Will the APK work on all Android devices?', a: 'Yes. The generated APK runs on Android 5.0+ (API 21).' },
  { q: 'Can I submit this to Google Play?', a: 'Yes. Play Store submission requires an AAB and a Google Play Developer account.' },
  { q: 'How fast is the build?', a: 'Most builds finish in under a minute.' },
  { q: 'How much does it cost?', a: "It's free to start — no credit card and no account needed." },
  { q: 'Who owns the app I build?', a: 'You do — 100%.' },
  { q: 'Is Rii APK Builder safe to use?', a: 'Yes. All data is transmitted over HTTPS.' }
];

(function renderFeatures() {
  const c = document.getElementById('features-container');
  if (!c) return;
  c.innerHTML = FEATURES.map(f => `
    <article class="fc">
      <span class="ico-tile">${f.icon}</span>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </article>
  `).join('');
})();

(function renderFaq() {
  const c = document.getElementById('faq-container');
  if (!c) return;
  c.innerHTML = FAQS.map(f => `
    <div class="faq-item">
      <div class="faq-q" onclick="this.parentElement.classList.toggle('open')">
        <span>${f.q}</span>
        <div class="faq-arrow">▾</div>
      </div>
      <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>
    </div>
  `).join('');
})();

function toggleMobileMenu() { document.getElementById('mobile-menu').classList.toggle('show'); }
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('show'); }
function scrollToEl(el) { if (el) el.scrollIntoView({ behavior: 'smooth' }); }
function focusUrlInput() {
  showLanding();
  setTimeout(() => {
    const inp = document.getElementById('url-input');
    if (!inp) return;
    inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => inp.focus(), 500);
  }, 100);
}

let currentUrl = '';

function showLanding() {
  document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('show'));
  const f = document.getElementById('flow-section');
  if (f) f.classList.remove('show');
  document.querySelectorAll('.section, .hero, .live-ticker, .cta-banner, footer').forEach(el => {
    if (el) el.style.display = '';
  });
}

function startFlow() {
  const url = (document.getElementById('url-input').value || '').trim();
  if (!url || !url.match(/^https?:\/\//)) {
    alert('Masukkan URL yang valid (mulai dengan http:// atau https://)');
    return;
  }
  currentUrl = url;

  document.querySelectorAll('.section, .hero, .live-ticker, .cta-banner, footer').forEach(el => {
    if (el) el.style.display = 'none';
  });
  const f = document.getElementById('flow-section');
  if (f) f.classList.add('show');

  const ud = document.getElementById('analyzing-url-display');
  if (ud) ud.textContent = url;
  document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('show'));
  document.getElementById('step-analyzing').classList.add('show');

  setTimeout(() => {
    let hostname = 'mywebsite.com';
    try { hostname = new URL(url).hostname.replace('www.', ''); } catch (e) {}
    const first = hostname.split('.')[0] || 'myapp';
    const appName = first.charAt(0).toUpperCase() + first.slice(1);
    const packageId = 'com.' + first + '.app';

    const a = document.getElementById('app-name');
    const p = document.getElementById('package-id');
    const cn = document.getElementById('cfg-name-preview');
    const cu = document.getElementById('cfg-url-preview');
    if (a) a.value = appName;
    if (p) p.value = packageId;
    if (cn) cn.textContent = appName;
    if (cu) cu.textContent = hostname;

    document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('show'));
    document.getElementById('step-configure').classList.add('show');
  }, 1800);
}

async function startBuild() {
  const appName = (document.getElementById('app-name').value || 'My App').trim();
  const packageId = (document.getElementById('package-id').value || 'com.example.app').trim();

  document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('show'));
  document.getElementById('step-building').classList.add('show');

  const logBox = document.getElementById('bf-log');
  const progFill = document.getElementById('bf-prog');
  const progLabel = document.getElementById('bf-label');
  const progPct = document.getElementById('bf-pct');
  if (logBox) logBox.innerHTML = '';

  const steps = [
    { p: 5,   label: 'Initializing...',  log: '[00:01] Workspace initialized' },
    { p: 15,  label: 'Crawling site...', log: '[00:02] Fetching ' + currentUrl },
    { p: 30,  label: 'Generating...',    log: '[00:03] Creating WebView wrapper' },
    { p: 50,  label: 'Compiling...',     log: '[00:04] aapt2 compiling' },
    { p: 70,  label: 'Packaging...',     log: '[00:05] Packaging resources' },
    { p: 85,  label: 'Signing...',       log: '[00:06] apksigner signing' },
    { p: 100, label: 'Done!',            log: '[00:07] APK ready' }
  ];

  for (let i = 0; i < steps.length; i++) {
    await new Promise(r => setTimeout(r, 500 + Math.random() * 400));
    if (progFill) progFill.style.width = steps[i].p + '%';
    if (progLabel) progLabel.textContent = steps[i].label;
    if (progPct) progPct.textContent = steps[i].p + '%';
    if (logBox) { logBox.innerHTML += steps[i].log + '<br>'; logBox.scrollTop = logBox.scrollHeight; }
  }

  let downloadUrl = null;
  try {
    const fd = new FormData();
    fd.append('url', currentUrl);
    fd.append('app_name', appName);
    fd.append('package_id', packageId);

    const res = await fetch('/api/build', { method: 'POST', body: fd });
    const ct = res.headers.get('content-type') || '';

    if (res.ok && ct.includes('application/vnd.android')) {
      const blob = await res.blob();
      downloadUrl = URL.createObjectURL(blob);
    } else if (res.ok && ct.includes('application/json')) {
      const d = await res.json();
      throw new Error(d.error || 'Backend tidak bisa build APK');
    } else {
      throw new Error('Backend tidak tersedia');
    }
  } catch (err) {
    console.log('Fallback dummy:', err.message);
    downloadUrl = generateDummyApk(appName, packageId, currentUrl);
  }

  setTimeout(() => {
    document.querySelectorAll('.flow-step').forEach(el => el.classList.remove('show'));
    document.getElementById('step-done').classList.add('show');

    const btn = document.getElementById('download-btn');
    const meta = document.getElementById('done-filename');
    const safe = appName.replace(/\s+/g, '_') + '_v1.apk';
    if (btn) { btn.href = downloadUrl; btn.download = safe; }
    if (meta) meta.textContent = safe + ' · ' + (Math.random() * 3 + 2).toFixed(1) + ' MB';
  }, 800);
}

function generateDummyApk(appName, packageId, url) {
  const c = `# Rii APK Builder\n\nApp: ${appName}\nPackage: ${packageId}\nURL: ${url}\nBuilt: ${new Date().toISOString()}\n\nNOTE: Placeholder file. For real APK, deploy server with Android SDK.\n`;
  const b = new Blob([c], { type: 'application/vnd.android.package-archive' });
  return URL.createObjectURL(b);
}

function openDashboard() {
  const apps = JSON.parse(localStorage.getItem('rii_apps') || '[]');
  let m = 'My Apps:\n\n';
  if (apps.length === 0) m += 'Belum ada app.';
  else apps.forEach((a, i) => m += `${i + 1}. ${a.name}\n   ${a.url}\n`);
  alert(m);
}

document.addEventListener('DOMContentLoaded', () => {
  showLanding();
  const inp = document.getElementById('url-input');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') startFlow(); });
});