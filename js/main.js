// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav-close');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
})();
