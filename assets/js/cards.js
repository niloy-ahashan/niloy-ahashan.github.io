/* Card pages (Education, Publications): reveal cards as they scroll into
   view, and copy a publication's citation when its Cite button is clicked. */
(function () {
  var root = document.querySelector('.edu');
  if (!root) return;

  Array.prototype.forEach.call(root.querySelectorAll('[data-cite]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-cite');
      var done = function () {
        btn.classList.add('is-copied');
        window.setTimeout(function () { btn.classList.remove('is-copied'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { window.prompt('Copy citation:', text); });
      } else {
        window.prompt('Copy citation:', text);
      }
    });
  });

  /* Publications: open/close a paper's abstract inside its card */
  Array.prototype.forEach.call(root.querySelectorAll('[data-abstract-toggle]'), function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.edu-card');
      var open = !card.classList.contains('is-open');
      card.classList.toggle('is-open', open);
      Array.prototype.forEach.call(card.querySelectorAll('[data-abstract-toggle]'), function (t) {
        t.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  });

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    var svg = root.querySelector('.edu-hero__svg');
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
    return;
  }
  if (!('IntersectionObserver' in window)) return;

  var cards = root.querySelectorAll('.edu-reveal');
  root.classList.add('edu--animate');

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (!target) return;
    var start = Date.now();
    var step = function () {
      var t = Math.min((Date.now() - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) window.setTimeout(step, 30);
    };
    el.textContent = '0' + suffix;
    window.setTimeout(step, 30);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      Array.prototype.forEach.call(entry.target.querySelectorAll('[data-count]'), countUp);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  Array.prototype.forEach.call(cards, function (card, i) {
    card.style.transitionDelay = (i * 0.12) + 's';
    card.addEventListener('transitionend', function clear(e) {
      if (e.propertyName !== 'opacity') return;
      card.style.transitionDelay = '';
      card.removeEventListener('transitionend', clear);
    });
    observer.observe(card);
  });
})();
