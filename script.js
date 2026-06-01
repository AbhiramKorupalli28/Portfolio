// ============================================
// ABHIRAM KORUPALLI — PORTFOLIO JS
// ============================================

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ── Hamburger Menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    mobileMenu.classList.add('open');
    hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    hamburger.children[1].style.opacity = '0';
    hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    mobileMenu.classList.remove('open');
    hamburger.children[0].style.transform = '';
    hamburger.children[1].style.opacity = '';
    hamburger.children[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuOpen = false;
    hamburger.children[0].style.transform = '';
    hamburger.children[1].style.opacity = '';
    hamburger.children[2].style.transform = '';
  });
});

/* ── Active Nav Link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerNav = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observerNav.observe(section));

/* ── Typing Effect ── */
const typedEl = document.getElementById('typed-text');
const phrases = [
  'feel right.',
  'inspire.',
  'delight users.',
  'tell stories.',
  'matter.',
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingPaused = false;

function typeEffect() {
  const current = phrases[phraseIdx];
  
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      typingPaused = true;
      setTimeout(() => { typingPaused = false; isDeleting = true; typeEffect(); }, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  
  const speed = isDeleting ? 60 : 90;
  setTimeout(typeEffect, speed);
}

setTimeout(typeEffect, 800);

/* ── Scroll Reveal ── */
const revealElements = document.querySelectorAll(
  '.about-text, .about-cards, .skill-card, .info-card, ' +
  '.featured-project, .project-card, .process-step, .contact-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animation for sibling groups
      const siblings = Array.from(entry.target.parentElement.children);
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

/* ── Skill Bar Animation ── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.getAttribute('data-width');
      entry.target.style.width = target + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

/* ── Cursor glow effect ── */
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.5);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
  mix-blend-mode: screen;
  opacity: 0;
`;
document.body.appendChild(cursor);

const cursorOuter = document.createElement('div');
cursorOuter.style.cssText = `
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(168, 85, 247, 0.3);
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: left 0.15s ease, top 0.15s ease, width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
  opacity: 0;
`;
document.body.appendChild(cursorOuter);

let cursorX = 0, cursorY = 0;
let cursorOuterX = 0, cursorOuterY = 0;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursor.style.opacity = '1';
  cursorOuter.style.opacity = '1';
  
  setTimeout(() => {
    cursorOuter.style.left = cursorX + 'px';
    cursorOuter.style.top = cursorY + 'px';
  }, 80);
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorOuter.style.opacity = '0';
});

// Cursor grow on hover
document.querySelectorAll('a, button, .skill-card, .project-card, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '30px';
    cursor.style.height = '30px';
    cursorOuter.style.width = '60px';
    cursorOuter.style.height = '60px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorOuter.style.width = '40px';
    cursorOuter.style.height = '40px';
  });
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Hero parallax effect ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroVisual = document.getElementById('hero-visual');
  const heroContent = document.querySelector('.hero-content');
  if (heroVisual && scrollY < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrollY * 0.08}px)`;
    heroContent.style.transform = `translateY(${scrollY * 0.04}px)`;
  }
});

/* ── Counter animation for stats ── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        el.dataset.suffix = suffix;
        animateCounter(el, num);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.getElementById('hero-stats');
if (heroStats) statsObserver.observe(heroStats);

console.log('%cAbhiram Korupalli Portfolio', 'color: #a855f7; font-size: 18px; font-weight: bold;');
console.log('%cUI/UX Designer | abhiramkorupalli@gmail.com', 'color: #3b82f6; font-size: 14px;');
