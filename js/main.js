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
