const T = {
  en: {
    home: "Home",
    n_serv: "Our services",
    n_work: "Work",
    n_con: "Contact",
    n_book: "Book now",
    pt: "Photography portfolio",
    ph2: "Stills, because not everything has to move.",
    pall: "See all photography",
    tag: "Vertical content",
    h1: "Vertical, but make it <em>iconic.</em>",
    sub: "Reels, TikToks, Shorts and Stories, shot like cinema and cut for the scroll. Thumbs will stop.",
    g1t: "Shot for the thumb",
    g1p: "9:16 from the first frame. Not a landscape video squished into a phone.",
    g2t: "Hook in 1.5 seconds",
    g2p: "If it doesn’t grab you before your thumb moves, we go again.",
    g3t: "Made to be sent",
    g3p: "Built for the group chat, the repost and the “omg look” text.",
    g4t: "Every format",
    g4p: "Reels, TikToks, Shorts, Stories, paid. Same energy, different shape.",
    c_h: "Got a brand that needs to stop thumbs?",
    c_p: "No briefs in Comic Sans, no forms. Just email us and let’s make scene.",
    c_b: "Let’s make scene",
  },
  mfe: {
    home: "Lakaz",
    n_serv: "Nou servis",
    n_work: "Travay",
    n_con: "Kontak",
    n_book: "Rezerv asterer",
    pt: "Portfolio fotografi",
    ph2: "Foto, parski pa tou kitsoz bizin bouze.",
    pall: "Get tou foto",
    tag: "Kontenu vertikal",
    h1: "Vertikal, me fer li <em>iconik.</em>",
    sub: "Reels, TikTok, Shorts ek Stories, filme kouma sinema, ek kouple pou skrol. Bann pous pou arete.",
    g1t: "Filme pou ou pous",
    g1p: "9:16 depi premie frame. Pa enn video orizontal ki finn ganny kraze dan enn telefonn.",
    g2t: "Kapte ou an 1,5 segonn",
    g2p: "Si li pa kapte ou avan ou pous bouze, nou rekomans.",
    g3t: "Fer pou ganny voye",
    g3p: "Fer pou group chat, repost ek mesaz “get sa mo frer”.",
    g4t: "Tou format",
    g4p: "Reels, TikTok, Shorts, Stories, piblisite. Menm lenerzi, form diferan.",
    c_h: "Ena enn brand ki bizin arete bann pous?",
    c_p: "Okenn brief an Comic Sans, okenn form. Zis ekrir nou ek annou fer sen.",
    c_b: "Annou fer sen",
  },
};
const C = [
  {
    b: "Amiri",
    k: "Campaign reel",
    c: { en: "Wow!", mfe: "Ala!" },
    g: "radial-gradient(ellipse 30% 22% at 38% 42%,#d8c0a0,transparent 70%),radial-gradient(ellipse 40% 40% at 40% 85%,#3a2c20,transparent 75%),linear-gradient(#2b4a6a,#14202e)",
  },
  {
    b: "Def Jam",
    k: "Artist drop",
    c: { en: "Run it back", mfe: "Remet li ankor" },
    g: "radial-gradient(ellipse 22% 18% at 52% 40%,#eee,transparent 70%),radial-gradient(ellipse 45% 40% at 50% 88%,#222,transparent 75%),linear-gradient(#9a948a,#2a2926)",
  },
  {
    b: "Nike",
    k: "Street cut",
    c: { en: "Too clean", mfe: "Tro prop" },
    g: "radial-gradient(ellipse 24% 20% at 60% 36%,#cdb9a0,transparent 70%),radial-gradient(ellipse 50% 40% at 50% 82%,#1b2634,transparent 75%),linear-gradient(#7d8a64,#2d3a2a)",
  },
  {
    b: "Saint Laurent",
    k: "Teaser",
    c: { en: "Say less", mfe: "Pa bizin dir plis" },
    g: "radial-gradient(ellipse 90% 12% at 50% 6%,#e8dfc0,transparent 70%),radial-gradient(ellipse 20% 22% at 55% 55%,#7a8aa8,transparent 70%),linear-gradient(#0f1826,#05080e)",
  },
  {
    b: "Your brand",
    k: "Product drop",
    c: { en: "Hi, it’s you", mfe: "Se ou sa!" },
    g: "radial-gradient(ellipse 36% 26% at 50% 45%,#e0b080,transparent 70%),linear-gradient(#5a2c1c,#1a0d09)",
  },
  {
    b: "Your brand",
    k: "Behind the scenes",
    c: { en: "No notes", mfe: "Okenn remark" },
    g: "radial-gradient(ellipse 30% 25% at 42% 50%,#9ab0a0,transparent 70%),linear-gradient(#3b5a52,#121f1c)",
  },
  {
    b: "Your brand",
    k: "Launch film",
    c: { en: "Main character", mfe: "Personaz prinsipal" },
    g: "radial-gradient(ellipse 28% 20% at 55% 38%,#f2d9c0,transparent 70%),linear-gradient(#a0657a,#2a1520)",
  },
];
const st = document.getElementById("stage"),
  dots = document.getElementById("dots"),
  cnt = document.getElementById("count");
let lang = "en",
  a = 3;
const els = C.map((c, i) => {
  const e = document.createElement("button");
  e.className = "card";
  e.style.setProperty("--g", c.g);
  e.setAttribute("aria-label", c.b + " — " + c.k);
  e.innerHTML = `<span class="no">0${i + 1}</span><span class="cap"></span><span class="lb">${c.b} — ${c.k}</span>`;
  e.addEventListener("click", () => go(i));
  st.appendChild(e);
  const d = document.createElement("button");
  d.setAttribute("aria-label", "Go to " + (i + 1));
  d.addEventListener("click", () => go(i));
  dots.appendChild(d);
  return e;
});
function layout() {
  els.forEach((e, i) => {
    const o = i - a,
      ao = Math.abs(o),
      w = e.offsetWidth;
    e.style.transform = `translate(-50%,-50%) translate(${o * w * 0.78}px,${ao * ao * w * 0.035}px) rotate(${o * 7}deg) scale(${1 - Math.min(ao, 3) * 0.05})`;
    e.style.zIndex = 10 - ao;
    e.style.opacity = ao > 3 ? 0 : 1;
    e.style.pointerEvents = ao > 3 ? "none" : "auto";
    e.style.filter = ao ? `brightness(${0.62 - Math.min(ao, 3) * 0.06})` : "none";
    e.classList.toggle("on", !ao);
  });
  [...dots.children].forEach((d, i) => d.setAttribute("aria-current", i === a));
  cnt.textContent = String(a + 1).padStart(2, "0") + " / " + String(C.length).padStart(2, "0");
}
function go(i) {
  a = (i + C.length) % C.length;
  layout();
}
document.getElementById("prev").onclick = () => go(a - 1);
document.getElementById("next").onclick = () => go(a + 1);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") go(a - 1);
  if (e.key === "ArrowRight") go(a + 1);
});
let x0 = null;
st.addEventListener("pointerdown", (e) => {
  x0 = e.clientX;
});
st.addEventListener("pointerup", (e) => {
  if (x0 !== null && Math.abs(e.clientX - x0) > 50) go(a + (e.clientX < x0 ? 1 : -1));
  x0 = null;
});
addEventListener("resize", layout);
const pg = document.getElementById("pgrid");
function renderPhotos(l) {
  pg.innerHTML = PHOTOS.map((p) => {
    const t = p.t[l === "en" ? 0 : 1];
    return `<a class="pt" href="photography.html" style="--ar:${p.ar}"><img src="${p.src}" alt="${t}" style="object-position:${p.pos}" loading="lazy" decoding="async"><span>${t}</span></a>`;
  }).join("");
}
const nodes = document.querySelectorAll("[data-i]"),
  btns = document.querySelectorAll(".lang button");
function setLang(l) {
  lang = l;
  nodes.forEach((n) => (n.innerHTML = T[l][n.dataset.i]));
  els.forEach((e, i) => (e.querySelector(".cap").textContent = C[i].c[l]));
  renderPhotos(l);
  document.documentElement.lang = l;
  btns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.l === l));
  try {
    localStorage.setItem("lutch-lang", l);
  } catch (e) {}
}
btns.forEach((b) => b.addEventListener("click", () => setLang(b.dataset.l)));
let s = "en";
try {
  s = localStorage.getItem("lutch-lang") || "en";
} catch (e) {}
setLang(T[s] ? s : "en");
layout();
