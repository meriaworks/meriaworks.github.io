/* SAJIN landing — shared behavior (index / fitur / tentang) */

// URL checkout — GANTI SATU BARIS INI saat link Lynk.id/Mayar sudah ada.
var BUY_URL = 'mailto:meriaworks.id@gmail.com?subject=Beli%20SAJIN%20(Rp%2049.000)&body=Halo%2C%20saya%20mau%20beli%20SAJIN.%0ANama%20usaha%3A%20';
document.querySelectorAll('[data-buy]').forEach(function (a) {
  if (a.getAttribute('href') === '#') a.setAttribute('href', BUY_URL);
});

// Nav: kaca saat discroll
var nav = document.getElementById('nav');
if (nav) addEventListener('scroll', function () { nav.classList.toggle('scrolled', scrollY > 12); }, { passive: true });

var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Count-up rupiah untuk [data-count] (jalan saat elemen masuk viewport)
function countUp(el) {
  var target = parseInt(el.getAttribute('data-count'), 10);
  var prefix = el.getAttribute('data-prefix') || '';
  var fmt = function (n) { return prefix + n.toLocaleString('id-ID'); };
  if (reduced) { el.textContent = fmt(target); return; }
  var t0 = performance.now(), dur = 1400;
  (function tick(t) {
    var p = Math.min(1, (t - t0) / dur);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

// Reveal on scroll (+ memicu draw-in ikon, grafik, bar, count-up)
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
