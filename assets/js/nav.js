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
