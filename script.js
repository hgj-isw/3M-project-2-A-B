/* ── Mobiel menu ── */
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (nav) nav.classList.toggle("show");
}
document.addEventListener("click", function (e) {
  const nav = document.getElementById("navLinks");
  const btn = document.querySelector(".hamburger");
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove("show");
  }
});
window.addEventListener("resize", function () {
  const nav = document.getElementById("navLinks");
  if (nav && window.innerWidth > 700) nav.classList.remove("show");
});

/* ── Dark mode ── */
(function () {
  const btn = document.getElementById("dmToggle");
  const saved = localStorage.getItem("darkMode");
  if (saved === "1") {
    document.body.classList.add("dark");
    if (btn) btn.textContent = "☀️";
  }
  if (btn) {
    btn.addEventListener("click", function () {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("darkMode", isDark ? "1" : "0");
      btn.textContent = isDark ? "☀️" : "🌙";
    });
  }
})();

/* ── Weeknummer (planning pagina) ── */
function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

const weekTekst = document.getElementById("weekTekst");
if (weekTekst) {
  const huidig = getISOWeek(new Date());
  weekTekst.innerHTML = `Nu is het <strong>week ${huidig}</strong> — bekijk hieronder wat er deze week op het programma staat.`;

  // Markeer het dichtstbijzijnde tijdlijn-item
  const items = document.querySelectorAll(".tl-item[data-week]");
  let best = null, bestDiff = Infinity;
  items.forEach(function (item) {
    const w = parseInt(item.getAttribute("data-week"), 10);
    const diff = Math.abs(w - huidig);
    if (diff < bestDiff) { bestDiff = diff; best = item; }
  });
  if (best) {
    best.querySelector(".tl-box").style.cssText +=
      ";border:2px solid #f39200;background:#fffdf2;";
    best.querySelector(".tl-date").style.color = "#f39200";
    const label = document.createElement("span");
    label.textContent = " ← je bent hier";
    label.style.cssText = "font-size:.78rem;color:#f39200;font-weight:700;";
    best.querySelector(".tl-date").appendChild(label);
  }
}

/* ── YouTube inline inladen ── */
function loadYT(btn) {
  const wrap = btn.closest(".yt-wrap");
  const id = wrap.getAttribute("data-ytid");
  if (!id) return;
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
  iframe.allow = "autoplay; encrypted-media; picture-in-picture";
  iframe.allowFullscreen = true;
  iframe.style.cssText = "width:100%;height:170px;border:none;display:block;border-radius:0;";
  wrap.innerHTML = "";
  wrap.appendChild(iframe);
}
