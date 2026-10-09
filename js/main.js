/**
 * National Service Center (NSC) - Hyderabad
 * Interactive Frontend JavaScript
 */

(function () {
  'use strict';

  // Comprehensive Service Data for Modals matching Reference website structure
  const SERVICES_DATA = {
    'washing-machine': {
      title: 'Washing Machine Repair',
      locality: 'Doorstep Repair in Hyderabad & Secunderabad',
      image: 'assets/images/appliances/washing-machine.jpg',
      lead: 'Front-load, top-load and semi-automatic washing machines serviced for spin, drainage, noise, and PCB errors.',
      problems: [
        'Not spinning / drain jam',
        'Abnormal heavy vibration',
        'Water leakage from bottom',
        'Motor & bearing issue',
        'Motherboard / PCB error codes',
        'Door lock stuck / not opening'
      ],
      checks: [
        'Motor, drive belt and drum bearing integrity',
        'Drain pump filter, inlet valve & water level sensor',
        'Main PCB electronic circuit board & error code diagnostics',
        'Door latch safety microswitch & rubber gasket seal',
        'Electrical wiring, capacitor & grounding safety'
      ]
    },
    'refrigerator': {
      title: 'Refrigerator Repair',
      locality: 'Doorstep Repair in Hyderabad & Secunderabad',
      image: 'assets/images/appliances/refrigerator.jpg',
      lead: 'Single-door, double-door and side-by-side refrigerators serviced for cooling, cycling and noise issues.',
      problems: [
        'Not cooling / low cooling',
        'Excessive ice buildup',
        'Water leakage on floor',
        'Compressor clicking / humming',
        'Gas leak / low pressure',
        'Unusual loud buzzing noise'
      ],
      checks: [
        'Thermostat and electronic temperature sensor control',
        'Inverter compressor & cooling sealed cycle',
        'Defrost timer, bimetal sensor and heating element',
        'Door magnetic gasket seal airtightness',
        'Eco refrigerant copper lines for micro-leaks'
      ]
    },
    'ac': {
      title: 'Air Conditioner (AC) Service',
      locality: 'Doorstep Repair in Hyderabad & Secunderabad',
      image: 'assets/images/appliances/ac.jpg',
      lead: 'Split, inverter and window ACs serviced for cooling loss, water leakage, power jet wash and gas refilling.',
      problems: [
        'AC blowing normal / warm air',
        'Water dripping from indoor unit',
        'Gas leakage / ice on coils',
        'Blower fan motor noise',
        'Inverter PCB light blinking',
        'Jet-pump deep foam wash required'
      ],
      checks: [
        'Indoor cooling copper coil & outdoor condenser unit',
        'R32 / R410A / R22 refrigerant operating pressure',
        'Dual run capacitor, blower fan motor & compressor relay',
        'Drain pipe line de-clogging & condensate tray slope',
        'Inverter logic controller circuit board test'
      ]
    },
    'microwave': {
      title: 'Microwave Oven Repair',
      locality: 'Doorstep Repair in Hyderabad & Secunderabad',
      image: 'assets/images/appliances/microwave.jpg',
      lead: 'Solo, grill and convection microwaves repaired for heating failure, sparking, touch panel and turntable issues.',
      problems: [
        'Plate spinning but not heating',
        'Internal sparking / arcing sound',
        'Touch membrane keys dead',
        'Turntable glass not rotating',
        'Blowing household MCB fuse',
        'Door switch safety failure'
      ],
      checks: [
        'High-voltage magnetron heating tube output',
        'High voltage diode, capacitor & transformer',
        'Touch panel membrane switch & digital display board',
        'Turntable synchronous motor & roller ring guide',
        'Door interlock safety microswitch alignment'
      ]
    },
    'dishwasher': {
      title: 'Dishwasher Repair & Descaling',
      locality: 'Doorstep Repair in Hyderabad & Secunderabad',
      image: 'assets/images/appliances/dishwasher.jpg',
      lead: 'Freestanding and built-in dishwashers serviced for drainage blocks, white residue, water leaks and heating issues.',
      problems: [
        'Dishes coming out dirty / greasy',
        'Water not draining (E24 / E25)',
        'Water inlet valve error code',
        'Bottom door seal leaking',
        'Water not heating during cycle',
        'Wash pump motor humming'
      ],
      checks: [
        'Drainage impeller pump & triple mesh filter system',
        'Circulation wash motor pressure & spray arm nozzles',
        'Internal flow-through heating element & thermostat',
        'Door perimeter seal & water inlet solenoid valve',
        'Electronic control unit & optical turbidity sensor'
      ]
    }
  };

  // DOM Elements
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const backdrop = document.getElementById('siteBackdrop');
  const quickBookModal = document.getElementById('quickBookModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  // Sticky Header with Scroll Shadow
  function handleScroll() {
    if (window.scrollY > 40) {
      if (header) header.classList.add('is-scrolled');
    } else {
      if (header) header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Navigation Drawer
  function toggleMobileMenu(forceClose) {
    if (!navMenu || !navToggle) return;
    const isOpen = forceClose ? false : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (backdrop) backdrop.classList.toggle('is-active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  }

  if (navToggle) navToggle.addEventListener('click', () => toggleMobileMenu());
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', () => toggleMobileMenu(true));

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        closeModal();
        toggleMobileMenu(true);
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

    // Modal Open / Close Logic Matching Exact Fixora Style
  function openModal(serviceKey) {
    if (!quickBookModal) return;
    const data = SERVICES_DATA[serviceKey] || SERVICES_DATA['washing-machine'];

    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalCoverImg = document.getElementById('modalCoverImg');
    const modalCategoryDesc = document.getElementById('modalCategoryDesc');
    const modalProblemsGrid = document.getElementById('modalProblemsGrid');
    const modalChecksList = document.getElementById('modalChecksList');
    const modalBookDirectBtn = document.getElementById('modalBookDirectBtn');

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.locality;
    if (modalCoverImg) modalCoverImg.src = data.image;
    if (modalCategoryDesc) modalCategoryDesc.textContent = data.lead;

    // Populate 2-Column Checked Problems Grid (Exact Reference Style)
    if (modalProblemsGrid) {
      modalProblemsGrid.innerHTML = '';
      data.problems.forEach(prob => {
        const item = document.createElement('div');
        item.className = 'fixora-prob-item';
        item.innerHTML = `<svg class="fixora-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><polyline points="9 12 11 14 15 10"></polyline></svg><span>${prob}</span>`;
        modalProblemsGrid.appendChild(item);
      });
    }

    // Populate Technician Checks List
    if (modalChecksList) {
      modalChecksList.innerHTML = '';
      data.checks.forEach(chk => {
        const li = document.createElement('li');
        li.textContent = chk;
        modalChecksList.appendChild(li);
      });
    }

    // Connect Book Button to form auto-fill
    if (modalBookDirectBtn) {
      modalBookDirectBtn.onclick = function() {
        closeModal();
        const appInput = document.getElementById('bookingAppliance');
        if (appInput) {
          const appNames = {
            'washing-machine': 'Washing Machine',
            'refrigerator': 'Refrigerator',
            'ac': 'Air Conditioner (AC)',
            'microwave': 'Microwave Oven',
            'dishwasher': 'Dishwasher'
          };
          appInput.value = appNames[serviceKey] || 'Washing Machine';
        }
      };
    }

    quickBookModal.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeModal() {
    if (quickBookModal) quickBookModal.classList.remove('active');
    if (navMenu && !navMenu.classList.contains('is-open')) {
      document.body.classList.remove('no-scroll');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (quickBookModal) {
    quickBookModal.addEventListener('click', function(e) {
      if (e.target === quickBookModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      toggleMobileMenu(true);
    }
  });

  // Attach Service Card Detail Triggers
  document.querySelectorAll('[data-open-modal]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const serviceKey = button.getAttribute('data-service') || 'washing-machine';
      openModal(serviceKey);
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function() {
        const isOpen = item.classList.contains('is-active');
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('is-active');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });
        item.classList.toggle('is-active', !isOpen);
        questionBtn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      });
    }
  });

  // Location Coverage Search Filter
  const localitySearch = document.getElementById('localitySearch');
  const localityChips = document.querySelectorAll('.locality-chip');
  if (localitySearch) {
    localitySearch.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      let matchCount = 0;
      localityChips.forEach(chip => {
        const text = chip.textContent.toLowerCase();
        if (text.includes(q)) {
          chip.style.display = 'inline-flex';
          matchCount++;
        } else {
          chip.style.display = 'none';
        }
      });
      const noResults = document.getElementById('localityNoResults');
      if (noResults) {
        noResults.style.display = matchCount === 0 ? 'block' : 'none';
      }
    });
  }

  // Locality Chip Click -> Auto Fill into Booking Form
  localityChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const area = chip.getAttribute('data-area') || chip.textContent.trim();
      const locInput = document.getElementById('bookingLocation');
      if (locInput) {
        locInput.value = area;
        locInput.focus();
      }
      const bookSec = document.getElementById('booking');
      if (bookSec) {
        bookSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // WhatsApp Sender
  function sendToWhatsApp(data) {
    const phone = '919392487129';
    let text = 'Hello National Service Center Hyderabad,\n\nI want to book an appliance service:\n';
    if (data.name) text += '• Name: ' + data.name + '\n';
    if (data.phone) text += '• Phone: ' + data.phone + '\n';
    if (data.appliance) text += '• Appliance: ' + data.appliance + '\n';
    if (data.brand) text += '• Brand: ' + data.brand + '\n';
    if (data.locality) text += '• Locality / Area: ' + data.locality + ', Hyderabad\n';
    if (data.issue) text += '• Issue / Problem: ' + data.issue + '\n';
    if (data.timeSlot) text += '• Preferred Time: ' + data.timeSlot + '\n';
    text += '\nPlease confirm technician arrival time. Thank you!';

    const encoded = encodeURIComponent(text);
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=' + phone + '&text=' + encoded;
    window.open(whatsappUrl, '_blank');
  }

  // Booking Form Submit
  const bookingForm = document.getElementById('mainBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('bookingName')?.value.trim() || '';
      const phone = document.getElementById('bookingPhone')?.value.trim() || '';
      const appliance = document.getElementById('bookingAppliance')?.value || '';
      const brand = document.getElementById('bookingBrand')?.value.trim() || '';
      const locality = document.getElementById('bookingLocation')?.value.trim() || '';
      const issue = document.getElementById('bookingIssue')?.value.trim() || '';
      const timeSlot = document.getElementById('bookingTimeSlot')?.value || 'Earliest Available (Within 90 Mins)';

      if (!name || !phone || !appliance || !locality) {
        alert('Please fill all required fields: Name, Phone Number, Appliance Type, and Hyderabad Locality.');
        return;
      }

      if (!/^[6-9]\d{9}$/.test(phone.replace(/\s+/g, ''))) {
        alert('Please enter a valid 10-digit Indian mobile number.');
        return;
      }

      const alertBox = document.getElementById('bookingSuccessAlert');
      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      sendToWhatsApp({ name, phone, appliance, brand, locality, issue, timeSlot });
      bookingForm.reset();
    });
  }

  // Animated Counters
  let countersAnimated = false;
  const counterElements = document.querySelectorAll('.counter-val');

  function animateCounters() {
    if (countersAnimated) return;
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1800;
      const start = 0;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        el.textContent = current.toLocaleString('en-IN');

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.textContent = target.toLocaleString('en-IN');
        }
      }
      requestAnimationFrame(updateNumber);
    });
    countersAnimated = true;
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  // Hero Quick Tabs -> Open Modal
  const heroTabButtons = document.querySelectorAll('#heroTabs .tab-pill');
  heroTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      heroTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetService = btn.getAttribute('data-target');
      openModal(targetService);
    });
  });

  // Repair Cost Estimator Calculator
  const APPLIANCE_ISSUES = {
    'washing-machine': [
      { name: 'Inspection & Comprehensive Diagnostics', price: 199 },
      { name: 'Drainage Jam / Coin Trap Cleaning', price: 499 },
      { name: 'Drum Rotation / Motor Belt Fix', price: 850 },
      { name: 'Electronic PCB Board Repair', price: 1200 },
      { name: 'Drum Bearing Replacement Overhaul', price: 1650 }
    ],
    'refrigerator': [
      { name: 'Inspection & Cooling Diagnosis', price: 199 },
      { name: 'Defrost Sensor / Thermostat Renewal', price: 550 },
      { name: 'Eco Refrigerant Gas Refill & Leak Fix', price: 1400 },
      { name: 'Inverter Compressor Starter Kit', price: 950 },
      { name: 'Main Power PCB Repair', price: 1350 }
    ],
    'ac': [
      { name: 'Standard Inspection & Diagnostic Check', price: 249 },
      { name: 'Power Jet Foam Deep Cleaning (Indoor + Outdoor)', price: 599 },
      { name: 'R32 / R410A Copper Gas Leak Test & Top-up', price: 1600 },
      { name: 'Dual Capacitor & Blower Motor Repair', price: 850 },
      { name: 'Inverter Logic PCB Module Repair', price: 1500 }
    ],
    'microwave': [
      { name: 'Inspection & High-Voltage Diagnosis', price: 199 },
      { name: 'Turntable Motor & Roller Ring Replacement', price: 450 },
      { name: 'Touch Membrane Keypad Repair', price: 650 },
      { name: 'Magnetron Heating Tube Renewal', price: 1100 },
      { name: 'High Voltage Diode & Capacitor Fix', price: 750 }
    ],
    'dishwasher': [
      { name: 'Inspection & System Diagnostics', price: 249 },
      { name: 'Drainage Filter & Impeller De-clog', price: 550 },
      { name: 'Spray Arm Alignment & Descaling Cycle', price: 450 },
      { name: 'Heating Element & Thermostat Swap', price: 1250 },
      { name: 'Circulation Wash Motor Overhaul', price: 1750 }
    ]
  };

  let currentApp = 'washing-machine';
  const calcAppButtons = document.querySelectorAll('#calcApplianceGrid .calc-app-btn');
  const calcSelect = document.getElementById('calcIssueSelect');
  const calcTotalEl = document.getElementById('calcTotal');
  const calcBaseEl = document.getElementById('calcBase');
  const calcFixNameEl = document.getElementById('calcFixName');
  const calcBookBtn = document.getElementById('calcBookBtn');

  function updateCalculatorIssues(appKey) {
    if (!calcSelect || !APPLIANCE_ISSUES[appKey]) return;
    calcSelect.innerHTML = '';
    const issues = APPLIANCE_ISSUES[appKey];
    issues.forEach((item, index) => {
      const opt = document.createElement('option');
      opt.value = item.price;
      opt.setAttribute('data-name', item.name);
      opt.textContent = item.name + ' (₹' + item.price.toLocaleString('en-IN') + ')';
      if (index === 0) opt.selected = true;
      calcSelect.appendChild(opt);
    });
    calculateEstimate();
  }

  function calculateEstimate() {
    if (!calcSelect || !calcTotalEl) return;
    const selectedOption = calcSelect.options[calcSelect.selectedIndex];
    if (!selectedOption) return;

    const price = parseInt(selectedOption.value, 10) || 199;
    const name = selectedOption.getAttribute('data-name') || 'Selected Service';

    calcTotalEl.textContent = price.toLocaleString('en-IN');
    if (calcFixNameEl) calcFixNameEl.textContent = name;
    if (calcBaseEl) calcBaseEl.textContent = '₹' + (currentApp === 'ac' || currentApp === 'dishwasher' ? '249' : '199');

    if (calcBookBtn) {
      calcBookBtn.onclick = function() {
        const appInput = document.getElementById('bookingAppliance');
        const issueInput = document.getElementById('bookingIssue');
        if (appInput) {
          const appNames = {
            'washing-machine': 'Washing Machine',
            'refrigerator': 'Refrigerator',
            'ac': 'Air Conditioner (AC)',
            'microwave': 'Microwave Oven',
            'dishwasher': 'Dishwasher'
          };
          appInput.value = appNames[currentApp] || 'Washing Machine';
        }
        if (issueInput) {
          issueInput.value = 'Calculated Estimate (' + name + ' - est. ₹' + price + ')';
        }
      };
    }
  }

  calcAppButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      calcAppButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentApp = btn.getAttribute('data-app') || 'washing-machine';
      updateCalculatorIssues(currentApp);
    });
  });

  if (calcSelect) {
    calcSelect.addEventListener('change', calculateEstimate);
    updateCalculatorIssues('washing-machine');
  }

  // Scroll reveal observer
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll, .stagger-children > *').forEach(el => {
    revealObserver.observe(el);
  });

  // Footer Year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

})();
