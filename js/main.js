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

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      nav.classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
    });
  }
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
