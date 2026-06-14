// ═══════════════════════════════════════════════

// FORMSPREE CONFIG

// ═══════════════════════════════════════════════

const FORMSPREE_URL = 'https://formspree.io/f/mojzppyk';



// ═══════════════════════════════════════════════

// PAGE MANAGEMENT

// ═══════════════════════════════════════════════

const pages = ['home','projekte','agentur','faq','kontakt'];



function showPage(name) {

  // Hide all pages

  pages.forEach(p => {

    const el = document.getElementById('page-' + p);

    if (el) el.classList.remove('active');

  });

  // Show target page

  const target = document.getElementById('page-' + name);

  if (target) target.classList.add('active');

  // Scroll to top instantly

  window.scrollTo(0, 0);

  setTimeout(() => {

    initReveal();

    initLivelyMotion();

  }, 30);

  // Update active nav link

  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {

    a.classList.toggle('active', a.dataset.page === name);

    // Keep kontakt button style

    if (a.dataset.page === 'kontakt') {

      a.classList.add('nav-cta');

    }

  });

  // Close mobile menu if open

  const burger = document.getElementById('burger');

  const menu = document.getElementById('mobileMenu');

  if (burger) burger.classList.remove('open');

  if (menu) menu.classList.remove('open');

  return false;

}





// ═══════════════════════════════════════════════

// NAV

// ═══════════════════════════════════════════════

window.addEventListener('scroll', () => {

  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);

  updateScrollProgress();

});



function toggleMenu() {

  const burger = document.getElementById('burger');

  const menu = document.getElementById('mobileMenu');

  burger.classList.toggle('open');

  menu.classList.toggle('open');

}



function initPointerGlow() {

  document.querySelectorAll('.service-card, .project-card').forEach(card => {

    if (card.dataset.livelyPointer === 'true') return;

    card.dataset.livelyPointer = 'true';

    card.addEventListener('pointermove', (event) => {

      const rect = card.getBoundingClientRect();

      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);

      card.style.setProperty('--my', `${event.clientY - rect.top}px`);

      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;

      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;

      card.style.setProperty('--tilt-y', `${x}deg`);

      card.style.setProperty('--tilt-x', `${y}deg`);

    });

    card.addEventListener('pointerleave', () => {

      card.style.setProperty('--tilt-x', '0deg');

      card.style.setProperty('--tilt-y', '0deg');

    });

  });

}



function initScrollProgress() {

  if (!document.querySelector('.scroll-progress')) {

    const bar = document.createElement('div');

    bar.className = 'scroll-progress';

    document.body.prepend(bar);

  }

  updateScrollProgress();

}



function updateScrollProgress() {

  const bar = document.querySelector('.scroll-progress');

  if (!bar) return;

  const max = document.documentElement.scrollHeight - window.innerHeight;

  const progress = max > 0 ? window.scrollY / max : 0;

  bar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;

}



function initMagneticButtons() {

  document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {

    if (btn.dataset.livelyMagnet === 'true') return;

    btn.dataset.livelyMagnet = 'true';

    btn.addEventListener('pointermove', (event) => {

      const rect = btn.getBoundingClientRect();

      const x = (event.clientX - rect.left - rect.width / 2) * 0.10;

      const y = (event.clientY - rect.top - rect.height / 2) * 0.14;

      btn.style.setProperty('--tx', `${x}px`);

      btn.style.setProperty('--ty', `${y}px`);

    });

    btn.addEventListener('pointerleave', () => {

      btn.style.setProperty('--tx', '0px');

      btn.style.setProperty('--ty', '0px');

    });

  });

}



function initHeroParallax() {

  const hero = document.querySelector('.hero');

  if (!hero || hero.dataset.livelyParallax === 'true') return;

  hero.dataset.livelyParallax = 'true';

  hero.addEventListener('pointermove', (event) => {

    const rect = hero.getBoundingClientRect();

    const x = (event.clientX - rect.left - rect.width / 2) / rect.width * 18;

    const y = (event.clientY - rect.top - rect.height / 2) / rect.height * 18;

    hero.style.setProperty('--hero-x', `${x}px`);

    hero.style.setProperty('--hero-y', `${y}px`);

  });

  hero.addEventListener('pointerleave', () => {

    hero.style.setProperty('--hero-x', '0px');

    hero.style.setProperty('--hero-y', '0px');

  });

}



function initLivelyMotion() {

  initScrollProgress();

  initPointerGlow();

  initMagneticButtons();

  initHeroParallax();

}



// ═══════════════════════════════════════════════

// COOKIE

// ═══════════════════════════════════════════════

// ═══════════════════════════════════════════════

// COOKIE CONSENT

// ═══════════════════════════════════════════════

const COOKIE_CONSENT_KEY = 'delvex_cookie_consent';

function getCookieConsent() {

  try {

    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);

    return raw ? JSON.parse(raw) : null;

  } catch (e) {

    return null;

  }

}

function setCookieConsent(consent) {

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));

  applyCookieConsent(consent);

}

function applyCookieConsent(consent) {

  if (consent && consent.analytics && typeof loadGoogleAnalytics === 'function') {

    loadGoogleAnalytics();

  }

}

function closeCookie() {

  document.getElementById('cookieBanner').classList.add('hidden');

}

function acceptAllCookies() {

  setCookieConsent({ necessary: true, analytics: true, timestamp: Date.now() });

  closeCookie();

}

function declineAllCookies() {

  setCookieConsent({ necessary: true, analytics: false, timestamp: Date.now() });

  closeCookie();

}

function openCookieSettings() {

  const consent = getCookieConsent();

  const toggle = document.getElementById('cookieAnalyticsToggle');

  if (toggle) toggle.checked = consent ? !!consent.analytics : false;

  document.getElementById('cookieSettingsModal').classList.add('open');

}

function closeCookieSettings() {

  document.getElementById('cookieSettingsModal').classList.remove('open');

}

function saveCookieSettings() {

  const toggle = document.getElementById('cookieAnalyticsToggle');

  const analytics = toggle ? toggle.checked : false;

  setCookieConsent({ necessary: true, analytics: analytics, timestamp: Date.now() });

  closeCookieSettings();

  closeCookie();

}

function openImpressum() {

  document.getElementById('impressumModal').classList.add('open');

}

function closeImpressum() {

  document.getElementById('impressumModal').classList.remove('open');

}

(function initCookieConsent() {

  const consent = getCookieConsent();

  if (consent) {

    document.getElementById('cookieBanner').classList.add('hidden');

    applyCookieConsent(consent);

  }

})();



// ═══════════════════════════════════════════════

// PROJECTS

// ═══════════════════════════════════════════════

const projectsData = [

  { title: 'Friseursalon Bella', desc: 'Elegante One-Pager Webseite für einen Friseursalon mit Online-Buchung und Galerie.', tag: 'One-Pager', color1: '#667eea', color2: '#764ba2' },

  { title: 'FitCoach Berlin', desc: 'Mehrseitige Website für einen Personal Trainer mit Kursangeboten und Kontaktformular.', tag: 'Multi-Page', color1: '#f093fb', color2: '#f5576c' },

  { title: 'Café Morgenrot', desc: 'Gemütliche Webpräsenz für ein lokales Café mit Speisekarte und Öffnungszeiten.', tag: 'One-Pager', color1: '#4facfe', color2: '#00f2fe' },

  { title: 'Handwerk Müller', desc: 'Professionelle Firmenwebseite für einen Handwerksbetrieb mit Leistungsübersicht.', tag: 'Multi-Page', color1: '#43e97b', color2: '#38f9d7' },

];



function renderProjects(containerId) {

  const el = document.getElementById(containerId);

  if (!el) return;

  el.innerHTML = projectsData.map((p, i) => `

    <div class="project-card reveal reveal-delay-${i%3}">

      <div class="project-preview">

        <div class="project-mockup" style="background:linear-gradient(135deg,${p.color1},${p.color2})">

          <div class="pm-bar" style="background:rgba(255,255,255,0.15)">

            <div class="pm-dot" style="background:rgba(255,255,255,0.4)"></div>

            <div class="pm-dot" style="background:rgba(255,255,255,0.4)"></div>

            <div class="pm-dot" style="background:rgba(255,255,255,0.4)"></div>

            <div class="pm-url"></div>

          </div>

          <div class="pm-body">

            <div class="pm-hero" style="background:rgba(255,255,255,0.12);padding:16px">

              <div class="pm-hero-text">

                <div class="pm-line" style="width:70%"></div>

                <div class="pm-line sm"></div>

                <div style="width:80px;height:28px;background:rgba(255,255,255,0.4);border-radius:6px;margin-top:10px"></div>

              </div>

            </div>

            <div class="pm-cards">

              <div class="pm-card"></div>

              <div class="pm-card"></div>

              <div class="pm-card"></div>

            </div>

          </div>

        </div>

      </div>

      <div class="project-info">

        <span class="project-tag">${p.tag}</span>

        <h3>${p.title}</h3>

        <p>${p.desc}</p>

        <a href="#" class="project-link" onclick="showPage('kontakt');return false;">

          Projekt anfragen

          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 14 0"/><path d="m12 5 7 7-7 7"/></svg>

        </a>

      </div>

    </div>

  `).join('');

  initReveal();

  initLivelyMotion();

}



// ═══════════════════════════════════════════════

// FOOTER

// ═══════════════════════════════════════════════

function renderFooter(containerId) {

  const el = document.getElementById(containerId);

  if (!el) return;

  el.innerHTML = `

  <footer class="footer">

    <div class="footer-inner">

      <div class="footer-grid">

        <div class="footer-brand">

          <a href="#" class="logo" onclick="showPage('home')">

            <div class="logo-mark"><img src="logo_1_1.png" alt="Delvex Logo" class="logo-img"></div>

            <span class="logo-name">Delvex</span>

          </a>

          <p>Moderne Webseiten für lokale Unternehmen. Professionell, schnell und auf den Punkt.</p>

        </div>

        <div class="footer-col">

          <h4>Navigation</h4>

          <ul>

            <li><a href="#" onclick="showPage('home');return false;">Home</a></li>

            <li><a href="#" onclick="showPage('agentur');return false;">Agentur</a></li>

            <li><a href="#" onclick="showPage('projekte');return false;">Beispiele</a></li>

            <li><a href="#" onclick="showPage('kontakt');return false;">Kontakt</a></li>

          </ul>

        </div>

        <div class="footer-col">

          <h4>Leistungen</h4>

          <ul>

            <li><a href="#">Webdesign</a></li>

            <li><a href="#">Webentwicklung</a></li>

            <li><a href="#">SEO Optimierung</a></li>

            <li><a href="#">Mobile Optimierung</a></li>

          </ul>

        </div>

        <div class="footer-col">

          <h4>Kontakt</h4>

          <ul>

            <li><a href="mailto:okedelfs@icloud.com">okedelfs@icloud.com</a></li>

            <li><a href="#">Deutschland</a></li>

          </ul>

        </div>

      </div>

      <div class="footer-bottom">

        <p>© 2026 Delvex · Oke Delfs · Alle Rechte vorbehalten</p>

        <div class="footer-bottom-links">

          <a href="#" onclick="openImpressum();return false;">Impressum</a>

          <a href="#" onclick="openImpressum();return false;">Datenschutz</a>

        </div>

      </div>

    </div>

  </footer>`;

}



// ═══════════════════════════════════════════════

// MULTI-STEP FORM

// ═══════════════════════════════════════════════

const formSteps = [

  {

    q: 'Wie soll deine Website aufgebaut sein?',

    opts: ['Einseitige Website (One-Pager)', 'Mehrseitige Website', 'Bin mir noch unsicher'],

    key: 'aufbau'

  },

  {

    q: 'Gibt es bereits eine bestehende Website?',

    opts: ['Ja', 'Nein', 'Die Website soll neu aufgebaut werden'],

    key: 'bestand'

  },

  {

    q: 'Was ist das Ziel deiner Website?',

    opts: ['Mehr Kundenanfragen erhalten', 'Professioneller auftreten', 'Online sichtbar werden', 'Informationen präsentieren', 'Marke stärken'],

    key: 'ziel'

  },

  {

    q: 'Wann möchtest du starten?',

    opts: ['So schnell wie möglich', 'Innerhalb der nächsten Wochen', 'In den nächsten Monaten', 'Ich informiere mich erstmal'],

    key: 'start'

  },

  {

    q: 'Welches Budget planst du ungefähr?',

    opts: ['200–500 €', '500–1000 €', '1000–1500 €', '1500–2000 €', 'Noch unsicher'],

    key: 'budget'

  }

];



function renderForm(containerId) {

  const el = document.getElementById(containerId);

  if (!el) return;



  el.innerHTML = `

  <div class="form-wrapper" id="fw-${containerId}">

    <div class="form-progress"><div class="form-progress-bar" id="fpb-${containerId}" style="width:0%"></div></div>

    <div class="form-inner">

      <!-- START -->

      <div class="form-start" id="fstart-${containerId}">

        <div class="form-start-icon">

          <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>

        </div>

        <h3>Bereit für deinen professionellen Webauftritt?</h3>

        <p>Beantworte ein paar kurze Fragen und lass uns über dein Projekt sprechen. Kostenlos und unverbindlich.</p>

        <button class="btn-primary" onclick="startForm('${containerId}')">Jetzt starten →</button>

      </div>



      <!-- STEPS -->

      ${formSteps.map((step, i) => `

      <div class="form-step" id="fstep-${containerId}-${i}">

        <div class="step-meta">Schritt ${i+1} von 8</div>

        <h3>${step.q}</h3>

        <p class="step-desc">Wähle die passende Option aus.</p>

        <div class="options-grid">

          ${step.opts.map(opt => `

          <button class="option-btn" onclick="selectOpt(this,'${containerId}',${i},'${opt.replace(/'/g,"\\\\\\\\'")}')">

            <span class="option-check"></span>

            ${opt}

          </button>`).join('')}

        </div>

        <div class="form-nav">

          <span class="step-count">${i+1}/8</span>

          <div class="form-btn-row">

            ${i > 0 ? `<button class="btn-back" onclick="prevStep('${containerId}',${i})">← Zurück</button>` : ''}

            <button class="btn-next" id="fnext-${containerId}-${i}" disabled onclick="nextStep('${containerId}',${i})">Weiter →</button>

          </div>

        </div>

      </div>`).join('')}



      <!-- STEP 5: Projektbeschreibung -->

      <div class="form-step" id="fstep-${containerId}-5">

        <div class="step-meta">Schritt 6 von 8</div>

        <h3>Erzähl uns kurz von deinem Projekt</h3>

        <p class="step-desc">Beschreibe kurz dein Unternehmen, deine Ideen oder Wünsche für deine neue Website.</p>

        <textarea class="form-textarea" id="fprojekt-${containerId}" rows="5" placeholder="Worum geht es bei deinem Projekt?"></textarea>


        <div class="form-nav">

          <span class="step-count">6/8</span>

          <div class="form-btn-row">

            <button class="btn-back" onclick="prevStep('${containerId}',5)">← Zurück</button>

            <button class="btn-next" onclick="nextStep('${containerId}',5)">Weiter →</button>

          </div>

        </div>

      </div>



      <!-- STEP 6: Kontaktdaten -->

      <div class="form-step" id="fstep-${containerId}-6">

        <div class="step-meta">Schritt 7 von 8</div>

        <h3>Deine Kontaktdaten</h3>

        <p class="step-desc">Wie können wir dich erreichen?</p>

        <div class="form-input-group">

          <input type="text" class="form-input" id="fname-${containerId}" placeholder="Dein vollständiger Name *">

          <input type="email" class="form-input" id="femail-${containerId}" placeholder="Deine E-Mail-Adresse *">

          <input type="tel" class="form-input" id="fphone-${containerId}" placeholder="Telefon (optional)">

        </div>

        <div class="form-nav">

          <span class="step-count">7/8</span>

          <div class="form-btn-row">

            <button class="btn-back" onclick="prevStep('${containerId}',6)">← Zurück</button>

            <button class="btn-next" onclick="nextStep('${containerId}',6)">Weiter →</button>

          </div>

        </div>

      </div>



      <!-- STEP 7: Kalender -->

      <div class="form-step" id="fstep-${containerId}-7">

        <div class="step-meta">Schritt 8 von 8</div>

        <h3>Terminvorschlag für das Gespräch</h3>

        <p class="step-desc">Wähle deinen Wunschtermin für das kostenlose Beratungsgespräch.</p>

        <div class="calendar" id="fcal-${containerId}"></div>

        <div class="time-slots" id="fslots-${containerId}" style="display:none">

          <p style="width:100%;font-size:0.85rem;color:var(--gray-600);font-weight:500;margin-bottom:4px">Verfügbare Uhrzeiten:</p>

        </div>



        <div class="selected-summary" id="fsummary-${containerId}" style="display:none;margin-top:20px">

          <h4>Deine Angaben</h4>

          <div id="fsummary-rows-${containerId}"></div>

        </div>



        <div class="form-nav" style="margin-top:16px">

          <span class="step-count">8/8</span>

          <div class="form-btn-row">

            <button class="btn-back" onclick="prevStep('${containerId}',7)">← Zurück</button>

            <button class="btn-next" id="fsubmit-${containerId}" onclick="submitForm('${containerId}')">

              Anfrage senden ✓

            </button>

          </div>

        </div>

        <p class="email-note">Mit dem Absenden stimmst du unserer Datenschutzerklärung zu. Spam-Schutz aktiv.</p>

      </div>



      <!-- SUCCESS -->

      <div class="form-success" id="fsuccess-${containerId}">

        <div class="form-success-icon">

          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>

        </div>

        <h3>Vielen Dank! 🎉</h3>

        <p>Wir haben deine Anfrage erhalten und melden uns schnellstmöglich bei dir.</p>

      </div>

    </div>

  </div>`;



  renderCalendar(containerId);

}



// ── FORM STATE ──

const formData = {};



function startForm(cid) {

  document.getElementById(`fstart-${cid}`).style.display = 'none';

  showStep(cid, 0);

  updateProgress(cid, 0);

}



function showStep(cid, idx) {

  for (let i = 0; i <= 7; i++) {

    const el = document.getElementById(`fstep-${cid}-${i}`);

    if (el) el.classList.remove('active');

  }

  const el = document.getElementById(`fstep-${cid}-${idx}`);

  if (el) el.classList.add('active');

}



function updateProgress(cid, step) {

  const pct = Math.round((step / 8) * 100);

  const bar = document.getElementById(`fpb-${cid}`);

  if (bar) bar.style.width = pct + '%';

}



function selectOpt(btn, cid, stepIdx, val) {

  const grid = btn.closest('.options-grid');

  grid.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

  btn.classList.add('selected');

  if (!formData[cid]) formData[cid] = {};

  formData[cid][formSteps[stepIdx].key] = val;

  const nxt = document.getElementById(`fnext-${cid}-${stepIdx}`);

  if (nxt) nxt.disabled = false;

}



function nextStep(cid, current) {

  // validate step 6

  if (current === 6) {

    const name = document.getElementById(`fname-${cid}`).value.trim();

    const email = document.getElementById(`femail-${cid}`).value.trim();

    if (!name || !email) { alert('Bitte Name und E-Mail eingeben.'); return; }

    if (!email.includes('@')) { alert('Bitte eine gültige E-Mail eingeben.'); return; }

    if (!formData[cid]) formData[cid] = {};

    formData[cid].name = name;

    formData[cid].email = email;

    formData[cid].phone = document.getElementById(`fphone-${cid}`).value.trim();

    // show summary

    showSummary(cid);

  }

  const next = current + 1;

  showStep(cid, next);

  updateProgress(cid, next);

}



function prevStep(cid, current) {

  const prev = current - 1;

  if (prev < 0) {

    // back to start

    document.getElementById(`fstart-${cid}`).style.display = 'block';

    showStep(cid, -1); // hide all

    updateProgress(cid, 0);

    return;

  }

  showStep(cid, prev);

  updateProgress(cid, prev);

}



function showSummary(cid) {

  const sd = document.getElementById(`fsummary-${cid}`);

  const rows = document.getElementById(`fsummary-rows-${cid}`);

  if (!sd || !rows) return;

  const d = formData[cid] || {};

  const labels = { aufbau:'Website-Aufbau', bestand:'Bestehende Website', ziel:'Ziel', start:'Starttermin', budget:'Budget', name:'Name', email:'E-Mail', phone:'Telefon' };

  let html = '';

  Object.entries(labels).forEach(([k, label]) => {

    if (d[k]) {

      html += `<div class="summary-row"><span class="sr-label">${label}</span><span class="sr-val">${d[k]}</span></div>`;

    }

  });

  rows.innerHTML = html;

  sd.style.display = 'block';

}



function showSuccess(cid) {

  const wrapper = document.getElementById(`fw-${cid}`);

  const bar = document.getElementById(`fpb-${cid}`);

  if (bar) bar.style.width = '100%';

  wrapper.querySelector('.form-inner').innerHTML = `

    <div style="text-align:center;padding:48px 16px">

      <div style="width:72px;height:72px;background:#E8F5E9;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 24px">

        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>

      </div>

      <h3 style="font-size:1.4rem;font-weight:600;color:var(--black);margin-bottom:12px;letter-spacing:-0.02em">Ihre Anfrage wurde erfolgreich gesendet.</h3>

      <p style="color:var(--gray-600);line-height:1.7;font-weight:300;font-size:1rem">Wir freuen uns auf die Zusammenarbeit.</p>

    </div>`;

}



function submitForm(cid) {

  const d = formData[cid] || {};

  const projektText = document.getElementById(`fprojekt-${cid}`)?.value.trim() || '-';



  // Validate basics

  if (!d.name || !d.email) {

    alert('Bitte fülle alle Pflichtfelder aus.');

    return;

  }



  // Show loading state on button

  const btn = document.getElementById(`fsubmit-${cid}`);

  if (btn) {

    btn.disabled = true;

    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg> Wird gesendet…`;

  }



  // Formspree payload
  const formPayload = {
    name:        d.name,
    email:       d.email,
    telefon:     d.phone      || '(nicht angegeben)',
    aufbau:      d.aufbau     || '-',
    bestand:     d.bestand    || '-',
    ziel:        d.ziel       || '-',
    start:       d.start      || '-',
    budget:      d.budget     || '-',
    beschreibung: projektText,
    termin:      d.termin     || 'Kein Termin gewählt',
    uhrzeit:     d.uhrzeit    || '-',
  };

  // Send via Formspree
  fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(formPayload),
  })
    .then(res => {
      if (res.ok) {
        showSuccess(cid);
      } else {
        return res.json().then(data => { throw new Error(data.error || 'Unbekannter Fehler'); });
      }
    })
    .catch((err) => {
      console.error('Formspree Fehler:', err);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Anfrage senden ✓';
      }
      alert('Es gab einen Fehler beim Senden. Bitte schreib uns direkt an okedelfs@icloud.com');
    });

}



// ═══════════════════════════════════════════════

// CALENDAR

// ═══════════════════════════════════════════════

function renderCalendar(cid) {

  const now = new Date();

  let viewYear = now.getFullYear();

  let viewMonth = now.getMonth();

  let selectedDay = null;



  const unavailableDays = []; // Alle Tage verfügbar

  const bookedDates = []; // e.g. ['2026-05-15']

  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

  const bookedTimes = []; // Keine Zeiten geblockt



  function dayKey(y, m, d) {

    return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

  }



  function render() {

    const el = document.getElementById(`fcal-${cid}`);

    if (!el) return;

    const viewYear = window[`calYear_${cid}`];

    const viewMonth = window[`calMonth_${cid}`];

    const monthNames = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];

    const dayLabels = ['Mo','Di','Mi','Do','Fr','Sa','So'];

    const firstDay = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun

    const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon-based

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();



    let html = `

      <div class="cal-header">

        <h4>${monthNames[viewMonth]} ${viewYear}</h4>

        <div class="cal-nav">

          <button class="cal-nav-btn" onclick="calPrev('${cid}')" aria-label="Vorheriger Monat">

            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>

          </button>

          <button class="cal-nav-btn" onclick="calNext('${cid}')" aria-label="Nächster Monat">

            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>

          </button>

        </div>

      </div>

      <div class="cal-grid">

        ${dayLabels.map(d => `<div class="cal-day-label">${d}</div>`).join('')}

        ${Array(offset).fill('<div class="cal-day empty"></div>').join('')}

        ${Array.from({length:daysInMonth},(_,i)=>{

          const day = i+1;

          const date = new Date(viewYear, viewMonth, day);

          const weekday = date.getDay();

          const key = dayKey(viewYear, viewMonth, day);

          const isUnavailable = bookedDates.includes(key); // Nur explizit geblockte Daten sperren

          const isSelected = window[`calSel_${cid}`] === key;

          const isToday = date.toDateString() === now.toDateString();

          let cls = 'cal-day ';

          if (isUnavailable) cls += 'unavailable';

          else if (isSelected) cls += 'selected';

          else if (isToday) cls += 'today available';

          else cls += 'available';

          return `<div class="${cls}" ${!isUnavailable ? `onclick="calSelectDay('${cid}','${key}')"` : ''}>${day}</div>`;

        }).join('')}

      </div>`;

    el.innerHTML = html;



    // Show times if day selected

    const slotsEl = document.getElementById(`fslots-${cid}`);

    if (slotsEl) {

      if (window[`calSel_${cid}`]) {

        slotsEl.style.display = 'flex';

        slotsEl.innerHTML = '<p style="width:100%;font-size:0.85rem;color:var(--gray-600);font-weight:500;margin-bottom:4px">Verfügbare Uhrzeiten:</p>' +

          times.map(t => {

            const isTimeSelected = window[`calTime_${cid}`] === t;

            const cls = isTimeSelected ? 'time-slot selected' : 'time-slot';

            return `<button class="${cls}" onclick="calSelectTime('${cid}','${t}')">${t}</button>`;

          }).join('');

      } else {

        slotsEl.style.display = 'none';

      }

    }

  }



  window[`calRender_${cid}`] = render;

  window[`calYear_${cid}`] = viewYear;

  window[`calMonth_${cid}`] = viewMonth;

  render();

}



window.calPrev = function(cid) {

  let m = window[`calMonth_${cid}`];

  let y = window[`calYear_${cid}`];

  m--;

  if (m < 0) { m = 11; y--; }

  window[`calMonth_${cid}`] = m;

  window[`calYear_${cid}`] = y;

  window[`calRender_${cid}`]();

};

window.calNext = function(cid) {

  let m = window[`calMonth_${cid}`];

  let y = window[`calYear_${cid}`];

  m++;

  if (m > 11) { m = 0; y++; }

  window[`calMonth_${cid}`] = m;

  window[`calYear_${cid}`] = y;

  window[`calRender_${cid}`]();

};

window.calSelectDay = function(cid, key) {

  window[`calSel_${cid}`] = key;

  window[`calTime_${cid}`] = null;

  if (!formData[cid]) formData[cid] = {};

  formData[cid].termin = key;

  delete formData[cid].uhrzeit;

  window[`calRender_${cid}`]();

};

window.calSelectTime = function(cid, t) {

  window[`calTime_${cid}`] = t;

  if (!formData[cid]) formData[cid] = {};

  formData[cid].uhrzeit = t;

  window[`calRender_${cid}`]();

  showSummary(cid);

};



// ═══════════════════════════════════════════════

// SCROLL REVEAL

// ═══════════════════════════════════════════════

function initReveal() {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(e => {

      if (e.isIntersecting) {

        e.target.classList.add('visible');

        observer.unobserve(e.target);

      }

    });

  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

}



// ═══════════════════════════════════════════════

// INIT

// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  renderProjects('projects-grid-home');

  renderProjects('projects-grid-page');

  renderFooter('footer-home');

  renderFooter('footer-projekte');

  renderFooter('footer-agentur');

  renderFooter('footer-faq');

  renderFooter('footer-kontakt');

  renderForm('multistep-form-home');

  renderForm('multistep-form-page');

  initReveal();

  initLivelyMotion();

  initHeroParticles();

  renderFaqList(FAQ_DATA);

});
// ═══════════════════════════════════════════════
// MOUSE TRAIL EFFECT (Schweif)
// ═══════════════════════════════════════════════

function initHeroParticles() {

  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width, height, dpr;
  let points = [];
  let mouse = { x: -9999, y: -9999, active: false };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function onMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
    points.push({ x: mouse.x, y: mouse.y, life: 1 });
    if (points.length > 60) points.shift();
  }

  function onLeave() {
    mouse.active = false;
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // fade out / shrink trail points
    for (let i = points.length - 1; i >= 0; i--) {
      points[i].life -= 0.035;
      if (points[i].life <= 0) points.splice(i, 1);
    }

    if (points.length > 1) {
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length;

        const hue = (200 + t * 160) % 360;
        const alpha = Math.max(0, p1.life) * t;
        const width_ = Math.max(0.5, 10 * t * p1.life);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(${hue}, 85%, 60%, ${alpha})`;
        ctx.lineWidth = width_;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMove, { passive: true });
  document.addEventListener('mouseleave', onLeave);
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }
  }, { passive: true });
  window.addEventListener('touchend', onLeave);

  resize();
  animate();
}

// ═══════════════════════════════════════════════
// FAQ SYSTEM
// ═══════════════════════════════════════════════

const FAQ_DATA = [
  {
    id: 'f1',
    q: 'Was macht Delvex genau?',
    a: 'Delvex entwickelt moderne, leistungsstarke Websites für Unternehmen und Selbstständige. Der Fokus liegt auf Design, Performance und Conversion-Optimierung, damit deine Website nicht nur gut aussieht, sondern Ergebnisse bringt.',
    keywords: ['delvex', 'agentur', 'webagentur', 'leistung', 'angebot', 'was', 'tut', 'macht', 'unternehmen', 'website']
  },
  {
    id: 'f2',
    q: 'Welche Services bietet Delvex an?',
    a: 'Wir bieten Webdesign, Webentwicklung, Landingpages, Website-Relaunches sowie auf Wunsch SEO-Optimierung und digitale Strategien an.',
    keywords: ['services', 'leistungen', 'webdesign', 'webentwicklung', 'landingpage', 'relaunch', 'seo', 'strategie', 'angebot', 'was bietet']
  },
  {
    id: 'f3',
    q: 'Wie lange dauert die Erstellung einer Website?',
    a: 'Eine Website dauert bei Delvex in der Regel ca. 1 bis 2 Wochen, abhängig vom Umfang und der Geschwindigkeit des Feedbacks.',
    keywords: ['dauer', 'zeit', 'lange', 'wochen', 'erstellung', 'wie schnell', 'tage', 'fertig', 'bauzeit']
  },
  {
    id: 'f4',
    q: 'Wie viel kostet eine Website bei Delvex?',
    a: 'Die Kosten hängen vom Projekt ab. Nach einem kurzen Gespräch erhältst du ein individuelles Angebot, das genau auf deine Anforderungen zugeschnitten ist.',
    keywords: ['preis', 'kosten', 'kostet', 'geld', 'budget', 'wie viel', 'tarif', 'angebot', 'bezahlen', 'investition']
  },
  {
    id: 'f5',
    q: 'Kann ich meine Website später selbst bearbeiten?',
    a: 'Ja. Auf Wunsch erstellen wir Websites mit einem CMS (z. B. WordPress oder Webflow), sodass du Inhalte wie Texte, Bilder oder Preise selbstständig bearbeiten kannst – ganz ohne Programmierkenntnisse.',
    keywords: ['selbst bearbeiten', 'cms', 'wordpress', 'webflow', 'andern', 'ändern', 'inhalte', 'texte', 'bilder', 'programmierkenntnisse', 'pflegen']
  },
  {
    id: 'f6',
    q: 'Unterstützt ihr Domain und Hosting?',
    a: 'Ja, wir helfen dir bei der Einrichtung von Domain und Hosting und übernehmen auf Wunsch auch die komplette technische Einrichtung deiner Website.',
    keywords: ['domain', 'hosting', 'server', 'einrichtung', 'technisch', 'unterstützung']
  },
  {
    id: 'f7',
    q: 'Bietet ihr Support nach dem Launch?',
    a: 'Ja, wir bieten optionalen Support und Wartung an, damit deine Website sicher, aktuell und performant bleibt.',
    keywords: ['support', 'wartung', 'launch', 'nach dem launch', 'hilfe', 'pflege', 'updates', 'sicherheit']
  },
  {
    id: 'f8',
    q: 'Was unterscheidet Delvex von anderen Webagenturen?',
    a: 'Der größte Unterschied ist unsere Geschwindigkeit: Wir liefern Websites in nur 1–2 Wochen, während viele Agenturen deutlich länger brauchen. Gleichzeitig legen wir großen Wert auf Qualität, modernes Design und saubere Umsetzung.',
    keywords: ['unterschied', 'warum delvex', 'andere agenturen', 'vorteil', 'besonderheit', 'wettbewerb', 'vergleich']
  }
];

let faqOpenId = null;

function renderFaqList(items) {
  const list = document.getElementById('faqList');
  const noResult = document.getElementById('faqNoResult');

  if (!list) return;

  if (!items.length) {
    list.innerHTML = '';
    if (noResult) noResult.hidden = false;
    return;
  }
  if (noResult) noResult.hidden = true;

  list.innerHTML = items.map(item => `
    <div class="faq-item${faqOpenId === item.id ? ' open' : ''}" data-id="${item.id}">
      <button class="faq-question" onclick="toggleFaqItem('${item.id}')">
        <span>${escapeFaqHtml(item.q)}</span>
        <span class="faq-question-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </span>
      </button>
      <div class="faq-answer-wrap">
        <div class="faq-answer">${escapeFaqHtml(item.a)}</div>
      </div>
    </div>
  `).join('');
}

function toggleFaqItem(id) {
  faqOpenId = (faqOpenId === id) ? null : id;
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.toggle('open', el.dataset.id === faqOpenId);
  });
}

function escapeFaqHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Simple semantic-ish search: matches query tokens against question text,
// answer text, and a curated keyword/synonym list per FAQ entry.
function filterFaq(query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    faqOpenId = null;
    renderFaqList(FAQ_DATA);
    return;
  }

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = FAQ_DATA.map(item => {
    const haystack = (item.q + ' ' + item.a + ' ' + item.keywords.join(' ')).toLowerCase();
    let score = 0;

    tokens.forEach(token => {
      if (haystack.includes(token)) score += 2;
      // partial / fuzzy match for tokens with 4+ chars
      if (token.length >= 4) {
        item.keywords.forEach(kw => {
          if (kw.includes(token) || token.includes(kw)) score += 1;
        });
      }
    });

    // direct substring match in question gets a boost
    if (item.q.toLowerCase().includes(q)) score += 3;

    return { item, score };
  }).filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.item);

  if (scored.length === 1) faqOpenId = scored[0].id;

  renderFaqList(scored);
}

// Initial render of FAQ list happens in the main INIT block below.