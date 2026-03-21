/* ============================================================
   SoCal Bradley Electric — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── MOBILE NAV ── */
  const ham     = document.getElementById('ham');
  const mobMenu = document.getElementById('mobMenu');

  function toggleMenu() {
    const open = mobMenu.classList.toggle('open');
    ham.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
  }
  function closeMenu() {
    mobMenu.classList.remove('open');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
  }

  ham.addEventListener('click', toggleMenu);
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMenu));

  /* close on outside click */
  document.addEventListener('click', e => {
    if (!ham.contains(e.target) && !mobMenu.contains(e.target)) closeMenu();
  });

  /* ── NAV ACTIVE HIGHLIGHT ON SCROLL ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  /* ── PANEL BREAKERS ── */
  const services = [
    {
      title: "Ceiling Fan Installation",
      desc: "New installs, replacements, and full wiring for any ceiling fan — with or without an existing fixture. We handle standard and vaulted ceilings and can add wall switches or remote controls as part of the same job. No mess, no guesswork.",
      hint: "Circuit 01 · 20A · Single Pole"
    },
    {
      title: "Smart Dimmers & Remote Controllers",
      desc: "Upgrade old switches to smart dimmers, remote wall controllers, or voice-compatible switches. We work with Lutron, Leviton, and all major smart home platforms including Google Home, Apple HomeKit, and Amazon Alexa.",
      hint: "Circuit 02 · 15A · Single Pole"
    },
    {
      title: "Smoke & Carbon Monoxide Detectors",
      desc: "California law requires hardwired, interconnected smoke and CO detectors in all homes. We install, replace, and bring your home to current CA residential code quickly — keeping your family protected and your home insurable.",
      hint: "Circuit 05 · 15A · Single Pole"
    },
    {
      title: "ElectroChoice — SDG&E Incentive Program",
      desc: "SDG&E's ElectroChoice program helps SoCal homeowners switch from gas to electric appliances with rebates and reduced utility rates. We handle all qualifying installs and coordinate directly with SDG&E paperwork on your behalf.",
      hint: "Circuit 06 · 20A · Single Pole"
    },
    {
      title: "LED Lighting & Retrofit",
      desc: "Recessed can retrofits, under-cabinet strips, outdoor security and landscape lighting, and full LED conversions for homes and businesses. Cut your energy bill and transform the feel of every room — all in one visit.",
      hint: "Circuit 09 · 15A · Single Pole"
    },
    {
      title: "EV Charger Installation",
      desc: "Level 2 home EV charger installs (240V) for Tesla, Ford, GM, Rivian, and all electric vehicles. We pull all permits, handle SDG&E interconnection, and help you maximize state and federal rebate eligibility.",
      hint: "Circuit 10 · 50A · Double Pole"
    },
    {
      title: "RV & Trailer Electrical Service",
      desc: "Dedicated 30A and 50A hookup installs for RVs, travel trailers, fifth wheels, and boat trailers at your home or property. We run the dedicated circuit, install the correct NEMA receptacle, and permit everything to NEC code.",
      hint: "Circuit 13 · 30–50A · NEMA 14-50 / TT-30"
    },
    {
      title: "General Electrical — Outlets, Wiring & Repairs",
      desc: "Adding outlets, GFCI upgrades, troubleshooting tripping breakers, rewiring, and everyday electrical repairs. We handle the full range of residential and commercial electrical needs across San Diego County.",
      hint: "Circuit 14 · 20A · Single Pole"
    },
    {
      title: "Electrical Panel Upgrades",
      desc: "100A to 200A upgrades, subpanel installs, and full panel replacements. Essential for EV chargers, solar, home additions, and most older San Diego homes. We pull all permits, coordinate with SDG&E, and manage the full inspection process — start to finish, no stress for you.",
      hint: "Circuit 15–16 · 200A · Double Pole · Main Service"
    }
  ];

  let activeBreaker = null;

  function selectBreaker(el, idx) {
    if (activeBreaker === el) {
      el.classList.remove('active');
      activeBreaker = null;
      resetReadout();
      return;
    }
    if (activeBreaker) activeBreaker.classList.remove('active');
    el.classList.add('active');
    activeBreaker = el;

    const s = services[idx];
    document.getElementById('roTitle').textContent = s.title;
    document.getElementById('roTitle').className = 'ro-title on';
    document.getElementById('roDesc').textContent  = s.desc;
    document.getElementById('roDesc').className  = 'ro-desc on';
    document.getElementById('roHint').innerHTML  = `<span class="ro-led on"></span>${s.hint}`;
    document.getElementById('roHint').className  = 'ro-hint on';
    document.getElementById('roBar').className   = 'ro-bar on';
    document.getElementById('roCta').style.display = 'block';

    /* scroll readout into view on mobile */
    if (window.innerWidth < 768) {
      document.getElementById('readout').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function resetReadout() {
    document.getElementById('roTitle').textContent = 'Select a circuit';
    document.getElementById('roTitle').className   = 'ro-title';
    document.getElementById('roDesc').textContent  = 'Tap any breaker above to learn about that service.';
    document.getElementById('roDesc').className    = 'ro-desc';
    document.getElementById('roHint').innerHTML    = '<span class="ro-led"></span>Ready';
    document.getElementById('roHint').className    = 'ro-hint';
    document.getElementById('roBar').className     = 'ro-bar';
    document.getElementById('roCta').style.display = 'none';
  }

  document.querySelectorAll('.breaker').forEach(el => {
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.addEventListener('click', () => selectBreaker(el, +el.dataset.idx));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectBreaker(el, +el.dataset.idx); }
    });
  });

  const dbl = document.getElementById('doubleBreaker');
  if (dbl) {
    dbl.setAttribute('tabindex', '0');
    dbl.setAttribute('role', 'button');
    dbl.addEventListener('click', () => selectBreaker(dbl, 8));
    dbl.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectBreaker(dbl, 8); }
    });
  }

  document.getElementById('roCta').addEventListener('click', () => {
    window.location.href = 'tel:619-333-6470';
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          btn.textContent = '✓ Message Sent!';
          btn.style.background = '#27ae60';
          form.reset();
          setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 4000);
        } else {
          throw new Error('Server error');
        }
      } catch {
        btn.textContent = 'Error — please call us';
        btn.style.background = '#c0392b';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 4000);
      }
    });
  }

});
