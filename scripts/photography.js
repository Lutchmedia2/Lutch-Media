const T = {
  en: {
    home: "Home",
    n_serv: "Our services",
    n_work: "Work",
    n_con: "Contact",
    n_book: "Book now",
    vert: "Vertical",
    tag: "Photography",
    h1: "Photo dump, but make it <em>expensive.</em>",
    sub: "Fashion, portraits, street and everything in between. Shot on film, digital and pure vibes. Zero filters (okay, one).",
    ch: "Want your face (or brand) in the pile?",
    cp: "No forms. No “circling back”. Just email us and let’s make scene.",
    cb: "Let’s make scene",
    all: "All",
    close: "Close",
  },
  mfe: {
    home: "Lakaz",
    n_serv: "Nou servis",
    n_work: "Travay",
    n_con: "Kontak",
    n_book: "Rezerv asterer",
    vert: "Vertikal",
    tag: "Fotografi",
    h1: "Foto dump, me fer li <em>ser.</em>",
    sub: "Lamod, portre, lari ek tou sa ki ant ant. Filme lor film, dizital ek pir vibe. Zero filtre (ok, enn).",
    ch: "Ou anvi ou fas (ouswa brand) dan pil la?",
    cp: "Okenn form. Okenn “nou pou revini”. Zis ekrir nou ek annou fer sen.",
    cb: "Annou fer sen",
    all: "Tou",
    close: "Ferm",
  },
};
let f = "all",
  lang = "en";
const wall = document.getElementById("wall"),
  chips = document.getElementById("chips"),
  cnt = document.getElementById("count");
const txt = (p) => p.t[lang === "en" ? 0 : 1],
  pad = (n) => String(n + 1).padStart(2, "0");
function render() {
  wall.innerHTML = "";
  PHOTOS.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "ph" + (f === "all" || f === p.brand ? "" : " hide");
    b.dataset.k = i;
    b.style.setProperty("--ar", p.ar);
    b.setAttribute("aria-label", txt(p));
    b.innerHTML = `<img class="img" src="${p.src}" alt="" style="object-position:${p.pos}" loading="lazy" decoding="async"><span class="no">${pad(i)}</span><span class="cap"><b>${txt(p)}</b><small>${p.brand}</small></span>`;
    b.onclick = () => {
      const v = vis();
      PhotoViewer.open(v, v.indexOf(i), lang, b);
    };
    wall.appendChild(b);
  });
  cnt.textContent = vis().length + " / " + PHOTOS.length;
}
function mkChips() {
  chips.innerHTML = "";
  ["all", ...new Set(PHOTOS.map((p) => p.brand))].forEach((k) => {
    const b = document.createElement("button");
    b.textContent = k === "all" ? T[lang].all : k;
    b.setAttribute("aria-pressed", k === f);
    b.onclick = () => {
      f = k;
      mkChips();
      render();
    };
    chips.appendChild(b);
  });
}
const vis = () => PHOTOS.map((_, i) => i).filter((i) => f === "all" || PHOTOS[i].brand === f);
const nodes = document.querySelectorAll("[data-i]"),
  btns = document.querySelectorAll(".lang button");
function setLang(l) {
  lang = l;
  nodes.forEach((n) => {
    if (T[l][n.dataset.i] !== undefined) n.innerHTML = T[l][n.dataset.i];
  });
  document.documentElement.lang = l;
  btns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.l === l));
  mkChips();
  render();
  PhotoViewer.relang(l);
  try {
    localStorage.setItem("lutch-lang", l);
  } catch (e) {}
}
btns.forEach((b) => (b.onclick = () => setLang(b.dataset.l)));
let s = "en";
try {
  s = localStorage.getItem("lutch-lang") || "en";
} catch (e) {}
setLang(T[s] ? s : "en");
