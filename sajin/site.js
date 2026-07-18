/* SAJIN landing v4 — shared behavior (index / fitur / tentang) */

// URL checkout — GANTI SATU BARIS INI saat link Lynk.id/Mayar sudah ada.
var BUY_URL = 'mailto:meriaworks.id@gmail.com?subject=Beli%20SAJIN%20(Rp%2049.000)&body=Halo%2C%20saya%20mau%20beli%20SAJIN.%0ANama%20usaha%3A%20';
document.querySelectorAll('[data-buy]').forEach(function (a) {
  if (a.getAttribute('href') === '#') a.setAttribute('href', BUY_URL);
});

var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
var nav = document.getElementById('nav');
var progress = document.getElementById('progress');
var glow = document.getElementById('glow');

addEventListener('scroll', function () {
  if (nav) nav.classList.toggle('scrolled', scrollY > 12);
  if (progress) {
    var h = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
  }
}, { passive: true });

// glow mengikuti kursor (halus, desktop)
if (glow && !reduced) {
  addEventListener('pointermove', function (e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// tilt halus pada elemen .tilt (desktop, non-touch)
if (!reduced && matchMedia('(hover:hover) and (min-width:900px)').matches) {
  document.querySelectorAll('.tilt').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = 'perspective(1000px) rotateY(' + (x * 5) + 'deg) rotateX(' + (-y * 5) + 'deg)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  });
}

// Count-up rupiah untuk [data-count]
function fmtRp(n) { return 'Rp ' + Math.round(n).toLocaleString('id-ID'); }
function countUp(el) {
  var target = parseInt(el.getAttribute('data-count'), 10);
  if (reduced) { el.textContent = fmtRp(target); return; }
  var t0 = performance.now(), dur = 1400;
  (function tick(t) {
    var p = Math.min(1, (t - t0) / dur);
    el.textContent = fmtRp(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}

// Reveal on scroll
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

/* ---------- Kalkulator untung 10 detik (signature interaction) ---------- */
var calc = document.getElementById('calc');
if (calc) {
  var inHarga = document.getElementById('c-harga');
  var inModal = document.getElementById('c-modal');
  var inPorsi = document.getElementById('c-porsi');
  var inKomisi = document.getElementById('c-komisi');
  var result = document.getElementById('c-result');
  var rNum = document.getElementById('c-num');
  var rMsg = document.getElementById('c-msg');
  var lastShown = 0;

  function paintRange(el) {
    var p = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty('--p', p + '%');
  }

  function recalc(animate) {
    var harga = +inHarga.value, modal = +inModal.value, porsi = +inPorsi.value, komisi = +inKomisi.value;
    document.getElementById('c-harga-v').textContent = fmtRp(harga);
    document.getElementById('c-modal-v').textContent = fmtRp(modal);
    document.getElementById('c-porsi-v').textContent = porsi + ' porsi/hari';
    document.getElementById('c-komisi-v').textContent = komisi + '%';
    [inHarga, inModal, inPorsi, inKomisi].forEach(paintRange);

    var perPorsi = harga * (1 - komisi / 100) - modal;
    var perBulan = perPorsi * porsi * 30;
    result.classList.toggle('neg', perPorsi < 0);
    if (perPorsi < 0) {
      rMsg.textContent = 'Rugi ' + fmtRp(-perPorsi) + ' tiap porsi — dan tanpa dihitung, ini baru ketahuan berbulan-bulan kemudian. SAJIN menunjukkannya sebelum kejadian.';
    } else {
      rMsg.textContent = 'Sisa ' + fmtRp(perPorsi) + ' per porsi — sebelum sewa, gas, listrik & biaya lain. Yang menghitung sisanya sampai jadi untung bersih: SAJIN.';
    }

    if (reduced || !animate) { rNum.textContent = fmtRp(perBulan); lastShown = perBulan; return; }
    var from = lastShown, t0 = performance.now(), dur = 500;
    lastShown = perBulan;
    (function tick(t) {
      var p = Math.min(1, (t - t0) / dur);
      rNum.textContent = fmtRp(from + (perBulan - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  [inHarga, inModal, inPorsi, inKomisi].forEach(function (el) {
    el.addEventListener('input', function () { recalc(true); });
  });
  recalc(false);
}
