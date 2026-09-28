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

/* Phones/tablets: size the sidebar photo to the height of the text block
   beside it (name through the bio card). Desktop keeps its fixed size. */
(function () {
  var avatar = document.querySelector('.sidebar .author__avatar--hello');
  var content = document.querySelector('.sidebar .author__content');
  if (!avatar || !content) return;

  function fit() {
    if (window.innerWidth >= 925) {
      avatar.style.removeProperty('--avatar-size');
      return;
    }
    var h = Math.round(content.getBoundingClientRect().height);
    var size = Math.max(64, Math.min(h, 160, Math.round(window.innerWidth * 0.3)));
    avatar.style.setProperty('--avatar-size', size + 'px');
  }

  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('sidebar:moved', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('load', fit);
})();

/* Phones/tablets: put the Links button (and its dropdown) right after
   "He/Him"; on larger screens move it back below the bio, where the
   links show as a full list. The theme's click handler is bound to the
   button element itself, so it keeps working after the move. */
(function () {
  var wrapper = document.querySelector('.sidebar .author__urls-wrapper');
  var tagrow = document.querySelector('.sidebar .author__tagrow');
  if (!wrapper || !tagrow) return;
  var home = wrapper.parentNode;
  var homeNext = wrapper.nextSibling;

  function place() {
    var small = window.innerWidth < 925;
    if (small && wrapper.parentNode !== tagrow) {
      tagrow.appendChild(wrapper);
    } else if (!small && wrapper.parentNode !== home) {
      home.insertBefore(wrapper, homeNext);
    }
    window.dispatchEvent(new Event('sidebar:moved'));
  }

  place();
  window.addEventListener('resize', place);
})();

/* Open links that leave the site, and PDFs, in a new tab. Links between
   the site's own pages stay in the same tab; mailto/tel links are left
   alone since they open an app rather than a page. */
(function () {
  var here = window.location.host;
  Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto|tel|javascript):/i.test(href)) return;
    var external = a.host && a.host !== here;
    var pdf = /\.pdf($|[?#])/i.test(a.pathname || href);
    if (!external && !pdf) return;
    a.setAttribute('target', '_blank');
    var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
    ['noopener', 'noreferrer'].forEach(function (r) { if (rel.indexOf(r) === -1) rel.push(r); });
    a.setAttribute('rel', rel.join(' '));
  });
})();
