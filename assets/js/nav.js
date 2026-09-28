/* Header menu: ripple from the click point on each page link. */
(function () {
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  document.addEventListener('pointerdown', function (e) {
    var link = e.target.closest && e.target.closest('.nav-link');
    if (!link) return;
    var rect = link.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var ripple = document.createElement('span');
    ripple.className = 'nav-link__ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    link.appendChild(ripple);
    ripple.addEventListener('animationend', function () { ripple.remove(); });
  });
})();

/* Footer: from 1024px the sidebar is fixed on the left, so start the
   footer text to its right instead of underneath it. */
(function () {
  var footer = document.querySelector('.page__footer footer');
  var sidebar = document.querySelector('.sidebar');
  if (!footer || !sidebar) return;

  function place() {
    footer.style.paddingLeft = '';
    if (window.innerWidth < 1024) return;
    var gap = sidebar.getBoundingClientRect().right - footer.getBoundingClientRect().left;
    if (gap > 0) footer.style.paddingLeft = Math.ceil(gap + 24) + 'px';
  }

  place();
  window.addEventListener('resize', place);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
})();

/* Sidebar "Links" button (phones/tablets): the theme toggles the list;
   keep aria-expanded in sync for screen readers. */
(function () {
  var btn = document.querySelector('.author__links-btn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  });
})();
