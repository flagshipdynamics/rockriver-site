// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  var closeBtn = document.querySelector('.nav-close');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.add('active');
    document.body.classList.add('mobile-nav-open');
  });

  function closeNav() {
    nav.classList.remove('active');
    document.body.classList.remove('mobile-nav-open');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeNav);
  }

  nav.querySelectorAll('a:not(.dropdown-toggle):not(.logo)').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
      var openDropdown = document.querySelector('.has-dropdown.open');
      if (openDropdown) openDropdown.classList.remove('open');
    }
  });
})();

// Mobile dropdown toggles — tap to expand/collapse on touch devices
(function () {
  if (window.innerWidth > 768) return;
  var toggles = document.querySelectorAll('.dropdown-toggle');
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = toggle.parentElement;
      var menu = parent.querySelector('.dropdown-menu');
      if (!menu) return;
      var isOpen = menu.style.display === 'block';
      menu.style.display = isOpen ? 'none' : 'block';
    });
  });
})();

// Header background on scroll
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// Scroll reveal animations
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { observer.observe(el); });
})();
