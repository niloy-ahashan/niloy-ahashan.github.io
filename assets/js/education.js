/* Education page: reveal cards as they scroll into view. */
(function () {
  var root = document.querySelector('.edu');
  if (!root) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    var svg = root.querySelector('.edu-hero__svg');
    if (svg && svg.pauseAnimations) svg.pauseAnimations();
    return;
  }
  if (!('IntersectionObserver' in window)) return;

  var cards = root.querySelectorAll('.edu-reveal');
  root.classList.add('edu--animate');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
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
