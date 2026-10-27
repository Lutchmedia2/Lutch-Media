/* ---- CONFIG ---- */
const RATE = { film: 150, photo: 120 },
  VAT = 0.2;
/* To take real payments: point this at a small server endpoint that creates a Stripe Checkout session
   (card + Apple Pay) and redirects. The page sends: amount (pence), method, name, email, summary. */
const CHECKOUT_URL = "";

const TYPE = {
  k: "type",
  s: ["Project", "Proze"],
  q: ["What are we making?", "Ki nou pe fer?"],
  o: [
    {
      id: "film",
      p: 0,
      t: ["Film", "Film"],
      d: [
        "Moving pictures. Campaigns, brand films, music videos, social.",
        "Imaz anime. Kanpayn, film brand, klip, rezo sosyal.",
      ],
    },
    {
      id: "photo",
      p: 0,
      t: ["Photography", "Fotografi"],
      d: [
        "Stills that stop the scroll. Campaigns, portraits, lookbooks, product.",
        "Foto ki arete skrol. Kanpayn, portre, lookbook, prodwi.",
      ],
    },
  ],
};
const FILM = [
  {
    k: "fmt",
    s: ["Format", "Format"],
    q: ["Landscape, vertical, or both?", "Orizontal, vertikal, ouswa de?"],
    o: [
      {
        id: "land",
        p: 0,
        t: ["Landscape", "Orizontal"],
        d: ["16:9. Cinema, YouTube, the big screen.", "16:9. Sinema, YouTube, gran ekran."],
      },
      {
        id: "vert",
        p: 0,
        t: ["Vertical", "Vertikal"],
        d: ["9:16. Reels, TikTok, Shorts. Thumb-friendly.", "9:16. Reels, TikTok, Shorts. Fer pou pous."],
      },
      {
        id: "both",
        p: 300,
        t: ["Both", "De"],
        d: ["Shot once, framed twice. Everyone’s happy.", "Filme enn fwa, frame de fwa. Tou dimounn kontan."],
      },
    ],
  },
  {
    k: "light",
    s: ["Lighting", "Lalimier"],
    q: ["Natural light or proper lighting?", "Lalimier natirel ouswa vre lalimier?"],
    o: [
      {
        id: "no",
        p: 0,
        t: ["Natural", "Natirel"],
        d: ["Free, moody and weather-dependent.", "Gratis, moody ek depann lamete."],
      },
      {
        id: "yes",
        ph: 90,
        t: ["Lighting package", "Pake lalimier"],
        d: ["A gaffer and a kit. Shadows, but on purpose.", "Enn gaffer ek enn kit. Lonbraz, me ek lentansyon."],
      },
    ],
  },
  { k: "hrs" },
  {
    k: "edit",
    s: ["Editing", "Montaz"],
    q: ["Who’s cutting it?", "Kikenn pou kup li?"],
    o: [
      { id: "none", p: 0, t: ["No editing", "Pena montaz"], d: ["Raw footage. Brave.", "Footage brit. Kouraz."] },
      {
        id: "ess",
        p: 350,
        t: ["Essential cut", "Montaz esansyel"],
        d: ["Clean edit, music and titles.", "Montaz prop, mizik ek tit."],
      },
      {
        id: "full",
        p: 750,
        t: ["Full edit", "Montaz konple"],
        d: ["Pacing, sound design, captions, motion. The works.", "Ritm, son, sou-tit, motion. Tou."],
      },
    ],
  },
  {
    k: "grade",
    s: ["Grading", "Kouler"],
    q: ["What about colour?", "Ki pou kouler?"],
    o: [
      {
        id: "none",
        p: 0,
        t: ["No grade", "Pena grade"],
        d: ["Straight out of the camera.", "Direk sorti dan kamera."],
      },
      {
        id: "ess",
        p: 200,
        t: ["Essential grade", "Grade esansyel"],
        d: ["Matched, balanced, clean.", "Ekilibre, ranje, prop."],
      },
      {
        id: "cine",
        p: 450,
        t: ["Cinematic grade", "Grade sinematik"],
        d: ["Full colourist treatment. Looks expensive.", "Trete par enn koloris. Sanble ser."],
      },
    ],
  },
  {
    k: "drone",
    s: ["Drone", "Dron"],
    q: ["Eyes in the sky?", "Lizie dan lesiel?"],
    o: [
      { id: "no", p: 0, t: ["No drone", "Pena dron"], d: ["Feet on the ground.", "Lipie lor later."] },
      {
        id: "yes",
        p: 350,
        t: ["Drone", "Dron"],
        d: ["Licensed pilot. Everything looks better from above.", "Pilot lisansye. Tou kitsoz zoli ar anler."],
      },
    ],
  },
];
const PHOTO = [
  {
    k: "orient",
    s: ["Orientation", "Oryantasyon"],
    q: ["Landscape, portrait, or both?", "Orizontal, portre, ouswa de?"],
    o: [
      {
        id: "land",
        p: 0,
        t: ["Landscape", "Orizontal"],
        d: ["Wide frames. Websites, billboards, covers.", "Gran frame. Sit, billboard, kouvertir."],
      },
      {
        id: "port",
        p: 0,
        t: ["Portrait", "Portre"],
        d: ["Tall frames. Stories, feeds, magazines.", "Frame vertikal. Stories, feed, magazin."],
      },
      {
        id: "both",
        p: 100,
        t: ["Both", "De"],
        d: ["Every shot framed both ways. Nobody gets cropped.", "Tou foto frame dan de fason. Personn pa ganny kup."],
      },
    ],
  },
  {
    k: "plight",
    s: ["Lighting", "Lalimier"],
    q: ["Natural light or studio lighting?", "Lalimier natirel ouswa lalimier studio?"],
    o: [
      {
        id: "no",
        p: 0,
        t: ["Natural", "Natirel"],
        d: ["Window light, golden hour, good vibes.", "Lalimier lafnet, gol aour, bon vibe."],
      },
      {
        id: "yes",
        ph: 70,
        t: ["Studio lighting", "Lalimier studio"],
        d: ["Strobes, modifiers and a gaffer. Controlled drama.", "Strobe, modifier ek enn gaffer. Drama kontrole."],
      },
    ],
  },
  { k: "hrs" },
  {
    k: "retouch",
    s: ["Retouching", "Retouch"],
    q: ["How much retouching?", "Konbien retouch?"],
    o: [
      {
        id: "none",
        p: 0,
        t: ["None", "Okenn"],
        d: ["Straight from the camera. Brave.", "Direk sorti dan kamera. Kouraz."],
      },
      {
        id: "ess",
        p: 250,
        t: ["Essential", "Esansyel"],
        d: ["Colour, cleanup and skin. Up to 10 images.", "Kouler, netwayaz ek lapo. Ziska 10 foto."],
      },
      {
        id: "high",
        p: 600,
        t: ["High-end", "Ot-gam"],
        d: [
          "Full beauty and composite work. Up to 10 images. Looks expensive.",
          "Beauty konple ek konpozit. Ziska 10 foto. Sanble ser.",
        ],
      },
    ],
  },
  {
    k: "usage",
    s: ["Usage rights", "Drwa itilizasyon"],
    q: ["Where will the photos live?", "Kot foto la pou viv?"],
    o: [
      {
        id: "web",
        p: 0,
        t: ["Social & web", "Rezo ek sit"],
        d: ["Organic social and your own website.", "Rezo sosyal organik ek ou prop sit."],
      },
      {
        id: "ads",
        p: 400,
        t: ["Ads & print", "Piblisite ek print"],
        d: ["Paid digital, print and in-store.", "Digital peye, print ek dan magazin."],
      },
      {
        id: "all",
        p: 900,
        t: ["All media", "Tou medya"],
        d: ["Everywhere, billboards and TV included.", "Partou, ek billboard ek televizyon."],
      },
    ],
  },
  {
    k: "term",
    s: ["Licence", "Lisans"],
    q: ["How long do you need the licence?", "Konbien letan ou bizin lisans la?"],
    o: [
      {
        id: "12",
        p: 0,
        t: ["12 months", "12 mwa"],
        d: ["A year of usage. Renewable.", "Enn lane itilizasyon. Renouvelab."],
      },
      {
        id: "24",
        p: 200,
        t: ["24 months", "24 mwa"],
        d: ["Two years. Fewer calendar reminders.", "De lane. Mwin rappel dan kalandriye."],
      },
      {
        id: "perp",
        p: 600,
        t: ["Perpetual", "Pou touzour"],
        d: ["Yours forever. No renewals, no awkward emails.", "Pou ou touzour. Okenn renouvelman, okenn email gen."],
      },
    ],
  },
];
const steps = () => [TYPE, ...(st.type === "photo" ? PHOTO : FILM)];
const T = {
  en: {
    home: "Home",
    work: "Our work",
    n_serv: "Our services",
    n_work: "Work",
    n_con: "Contact",
    n_book: "Book now",
    tag: "Production calculator",
    h1: "Build your shoot. <em>See the damage.</em>",
    sub: "Pick what you need and watch the number move. No awkward “so what’s your budget?” call.",
    book: "Book it ↓",
    tot: "Total",
    hq: "How long are we shooting?",
    hr: "hrs",
    hn: "Coffee breaks are free. Oat milk debates are not timed.",
    hs: "Shoot time",
    inc: "Included",
    hrly: "/hr",
    yq: "Your quote",
    sub1: "Subtotal",
    vat: "VAT (20%)",
    total: "Total",
    bk: "Book it",
    bj: "Yes, it’s a form. It’s the only one. Don’t tell anyone.",
    n: "Name",
    e: "Email",
    p: "Project name",
    d: "Preferred shoot date",
    x: "Anything else? (optional)",
    full: "Pay in full",
    dep: "50% deposit now",
    depn: "Rest on delivery",
    card: "Pay by card",
    apple: "Apple Pay",
    today: "Due today",
    er: "Add your name and a valid email first.",
    nt: "Payments aren’t switched on yet, so no money has moved. Email us this quote and we’ll send a payment link.",
    em: "Email us this quote",
    fine: "All prices in GBP. Your date is confirmed by email after booking.",
    lic: "Photo licences cover the usage and term you choose above.",
  },
  mfe: {
    home: "Lakaz",
    work: "Nou travay",
    n_serv: "Nou servis",
    n_work: "Travay",
    n_con: "Kontak",
    n_book: "Rezerv asterer",
    tag: "Kalkilater prodiksion",
    h1: "Konstri ou shoot. <em>Get sa ki pou kout.</em>",
    sub: "Swazir seki ou bizin ek get nimero la bouze. Okenn apel jennan “ki ou budze?”.",
    book: "Rezerv ↓",
    tot: "Total",
    hq: "Konbien letan nou pou filme?",
    hr: "er",
    hn: "Pose kafe gratis. Debat lalet avwan pa ganny konte.",
    hs: "Letan shoot",
    inc: "Inkli",
    hrly: "/er",
    yq: "Ou kotasyon",
    sub1: "Soutotal",
    vat: "TVA (20%)",
    total: "Total",
    bk: "Rezerv",
    bj: "Wi, se enn form. Se sel ki ena. Pa dir personn.",
    n: "Nom",
    e: "Email",
    p: "Nom proze",
    d: "Dat shoot ou prefer",
    x: "Ankor kitsoz? (opsyonel)",
    full: "Peye tou",
    dep: "50% depo azordi",
    depn: "Rest kan nou livre",
    card: "Peye ar kart",
    apple: "Apple Pay",
    today: "Pou peye azordi",
    er: "Met ou nom ek enn email valid dabor.",
    nt: "Peyman pa ankor aktive, donk pena kas ki finn bouze. Ekrir nou sa kotasyon la ek nou pou voye enn lien peyman.",
    em: "Ekrir nou sa kotasyon la",
    fine: "Tou pri an GBP. Nou konfirm ou dat par email apre rezervasyon.",
    lic: "Lisans foto kouver itilizasyon ek dire ou swazir pli anler.",
  },
};
let lang = "en",
  st = {
    type: "film",
    fmt: "land",
    light: "no",
    hrs: 4,
    edit: "none",
    grade: "none",
    drone: "no",
    orient: "land",
    plight: "no",
    retouch: "none",
    usage: "web",
    term: "12",
    pay: "full",
  };
const L = () => (lang === "en" ? 0 : 1),
  GBP = (n) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
const opt = (g, id) => g.o.find((o) => o.id === id),
  price = (o) => (o.ph ? o.ph * st.hrs : o.p || 0);
function calc() {
  const t = T[lang],
    k = L(),
    rows = [{ l: `${t.hs} · ${st.hrs} ${t.hr}`, v: st.hrs * RATE[st.type] }];
  steps()
    .filter((g) => g.o && g.k !== "type")
    .forEach((g) => {
      const o = opt(g, st[g.k]);
      rows.push({ l: `${g.s[k]}: ${o.t[k]}${o.ph ? ` · ${st.hrs} ${t.hr}` : ""}`, v: price(o) });
    });
  const sub = rows.reduce((a, r) => a + r.v, 0),
    vat = Math.round(sub * VAT),
    total = sub + vat;
  return { rows, sub, vat, total, due: st.pay === "dep" ? Math.round(total / 2) : total };
}
function sumHTML(c) {
  const t = T[lang];
  return (
    `<span class="tiny">${opt(TYPE, st.type).t[L()]}</span><h3>${t.yq}</h3>` +
    c.rows
      .map(
        (r) => `<div class="row${r.v ? "" : " inc"}"><span>${r.l}</span><span>${r.v ? GBP(r.v) : t.inc}</span></div>`,
      )
      .join("") +
    `<div class="row sub"><span>${t.sub1}</span><span>${GBP(c.sub)}</span></div><div class="row sub"><span>${t.vat}</span><span>${GBP(c.vat)}</span></div>
  <div class="tot"><span>${t.total}</span><b class="tv">${GBP(c.total)}</b></div>`
  );
}
let last = 0;
function update() {
  const c = calc();
  document.getElementById("sum").innerHTML = sumHTML(c);
  const rc = document.getElementById("recap");
  if (rc) {
    rc.innerHTML = sumHTML(c).replace(/^<span class="tiny">.*?<\/span><h3>.*?<\/h3>/, "");
    document.getElementById("due").textContent = GBP(c.due);
  }
  document.getElementById("mtot").textContent = GBP(c.total);
  if (c.total !== last) {
    document.querySelectorAll(".tv,#mtot").forEach((e) => {
      e.classList.remove("bump");
      void e.offsetWidth;
      e.classList.add("bump");
    });
    last = c.total;
  }
}
function build() {
  const t = T[lang],
    k = L(),
    el = document.getElementById("steps");
  let n = 0;
  el.innerHTML =
    steps()
      .map((g) => {
        n++;
        const num = String(n).padStart(2, "0");
        if (g.k === "hrs")
          return `<section class="step"><span class="tiny">${num}</span><h2>${t.hq}</h2><div class="hours"><b id="hv">${st.hrs}</b><span>${t.hr}</span></div><input type="range" id="hr" min="1" max="12" value="${st.hrs}" aria-label="${t.hq}"><div class="ticks"><span>1</span><span>3</span><span>6</span><span>9</span><span>12</span></div><p class="note">${t.hn}</p></section>`;
        return (
          `<section class="step"><span class="tiny">${num}</span><h2>${g.q[k]}</h2><div class="opts" role="radiogroup" aria-label="${g.q[k]}">` +
          g.o
            .map(
              (o) =>
                `<button type="button" class="opt" role="radio" data-k="${g.k}" data-id="${o.id}" aria-checked="${st[g.k] === o.id}"><b>${o.t[k]}<i>${g.k === "type" ? "" : o.ph ? GBP(o.ph) + t.hrly : o.p ? "+" + GBP(o.p) : t.inc}</i></b><span>${o.d[k]}</span></button>`,
            )
            .join("") +
          `</div></section>`
        );
      })
      .join("") +
    `<section class="step" id="book"><span class="tiny">${String(n + 1).padStart(2, "0")}</span><h2>${t.bk}</h2><p class="note" style="margin:-8px 0 22px">${t.bj}</p>
  <div class="form"><label>${t.n}<input id="fn" autocomplete="name"></label><label>${t.e}<input id="fe" type="email" autocomplete="email"></label><label>${t.p}<input id="fp"></label><label>${t.d}<input id="fd" type="date"></label><label class="full">${t.x}<textarea id="fx" rows="3"></textarea></label></div>
  <div class="opts" role="radiogroup" aria-label="Payment" style="margin-bottom:22px"><button type="button" class="opt" role="radio" data-k="pay" data-id="full" aria-checked="${st.pay === "full"}"><b>${t.full}</b></button><button type="button" class="opt" role="radio" data-k="pay" data-id="dep" aria-checked="${st.pay === "dep"}"><b>${t.dep}</b><span>${t.depn}</span></button></div>
  <div class="recap"><div id="recap"></div><div class="tot"><span>${t.today}</span><b id="due"></b></div></div>
  <div class="pays"><button class="btn" id="pc">${t.card}</button><button class="btn apay" id="pa"> ${t.apple}</button></div>
  <div class="err" id="err" role="alert"></div><div class="notice" id="notice"><span>${t.nt}</span><br><a class="btn ghost" id="mail" href="#">${t.em}</a></div><p class="fine">${t.fine}${st.type === "photo" ? " " + t.lic : ""}</p></section>`;
  el.querySelectorAll(".opt").forEach(
    (b) =>
      (b.onclick = () => {
        st[b.dataset.k] = b.dataset.id;
        el.querySelectorAll(`[data-k="${b.dataset.k}"]`).forEach((x) => x.setAttribute("aria-checked", x === b));
        if (b.dataset.k === "type") {
          rebuild();
          document.querySelector('[data-k="type"][aria-checked="true"]').focus();
        } else update();
      }),
  );
  const r = document.getElementById("hr");
  r.oninput = () => {
    st.hrs = +r.value;
    document.getElementById("hv").textContent = st.hrs;
    update();
  };
  document.getElementById("pc").onclick = () => pay("card");
  document.getElementById("pa").onclick = () => pay("apple");
}
function rebuild() {
  const ids = ["fn", "fe", "fp", "fd", "fx"],
    keep = ids.map((i) => {
      const e = document.getElementById(i);
      return e ? e.value : "";
    });
  build();
  ids.forEach((i, j) => (document.getElementById(i).value = keep[j]));
  update();
}
function pay(method) {
  const t = T[lang],
    n = document.getElementById("fn").value.trim(),
    e = document.getElementById("fe").value.trim(),
    err = document.getElementById("err"),
    nt = document.getElementById("notice");
  nt.classList.remove("on");
  if (!n || !/^\S+@\S+\.\S+$/.test(e)) {
    err.textContent = t.er;
    document.getElementById(n ? "fe" : "fn").focus();
    return;
  }
  err.textContent = "";
  const c = calc(),
    k = L(),
    sum =
      `Project: ${opt(TYPE, st.type).t[0]}\n` +
      c.rows.map((r) => `${r.l}: ${r.v ? GBP(r.v) : "Included"}`).join("\n") +
      `\nSubtotal: ${GBP(c.sub)}\nVAT: ${GBP(c.vat)}\nTotal: ${GBP(c.total)}\nDue today: ${GBP(c.due)} (${st.pay === "dep" ? "50% deposit" : "full"})`;
  if (CHECKOUT_URL) {
    location.href =
      CHECKOUT_URL + "?" + new URLSearchParams({ amount: c.due * 100, method, name: n, email: e, summary: sum });
    return;
  }
  const body = `Hi Lutch,\n\nName: ${n}\nEmail: ${e}\nProject: ${document.getElementById("fp").value}\nPreferred date: ${document.getElementById("fd").value}\nNotes: ${document.getElementById("fx").value}\nPreferred payment: ${method}\n\n${sum}`;
  document.getElementById("mail").href =
    "mailto:hello@lutchmedia.com?subject=" +
    encodeURIComponent("Shoot booking: " + n) +
    "&body=" +
    encodeURIComponent(body);
  nt.classList.add("on");
  nt.scrollIntoView({ block: "center", behavior: "smooth" });
}
const nodes = document.querySelectorAll("[data-i]"),
  btns = document.querySelectorAll(".lang button");
function setLang(l) {
  const keep = ["fn", "fe", "fp", "fd", "fx"].map((i) => {
    const e = document.getElementById(i);
    return e ? e.value : "";
  });
  lang = l;
  nodes.forEach((n) => {
    if (T[l][n.dataset.i] !== undefined) n.innerHTML = T[l][n.dataset.i];
  });
  document.documentElement.lang = l;
  btns.forEach((b) => b.setAttribute("aria-pressed", b.dataset.l === l));
  build();
  ["fn", "fe", "fp", "fd", "fx"].forEach((i, j) => (document.getElementById(i).value = keep[j]));
  update();
  try {
    localStorage.setItem("lutch-lang", l);
  } catch (e) {}
}
btns.forEach((b) => (b.onclick = () => setLang(b.dataset.l)));
let s0 = "en";
try {
  s0 = localStorage.getItem("lutch-lang") || "en";
} catch (e) {}
setLang(T[s0] ? s0 : "en");
