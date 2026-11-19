// ===== Header scroll effect =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== Mobile menu =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== Scroll reveal with Intersection Observer =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after reveal for performance
      // revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth active state for nav (optional enhancement) =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Booking form =====
const form = document.getElementById('bookingForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Simple validation already handled by HTML required
  // In real project — send to backend / Telegram / CRM

  // Success feedback
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Заявка отправлена ✓';
  btn.style.background = '#2ecc71';
  btn.disabled = true;

  // Reset after delay
  setTimeout(() => {
    form.reset();
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 2800);

  console.log('Booking request:', data);
});

// ===== Phone mask (simple) =====
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 0) {
    if (value[0] === '8') value = '7' + value.slice(1);
    if (value[0] !== '7') value = '7' + value;
  }

  let formatted = '+7';
  if (value.length > 1) formatted += ' (' + value.slice(1, 4);
  if (value.length >= 4) formatted += ') ' + value.slice(4, 7);
  if (value.length >= 7) formatted += '-' + value.slice(7, 9);
  if (value.length >= 9) formatted += '-' + value.slice(9, 11);

  e.target.value = formatted;
});

// Set min date for booking to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);
