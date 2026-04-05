// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  var closeBtn = document.querySelector('.mobile-nav-close');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    mobileNav.classList.add('active');
    document.body.classList.add('mobile-nav-open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      mobileNav.classList.remove('active');
      document.body.classList.remove('mobile-nav-open');
    });
  }
})();
