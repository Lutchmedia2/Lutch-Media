// Shared photo viewer: click-to-open, prev/next buttons, arrow keys and swipe.
// Usage: PhotoViewer.open(indices, position, lang, returnFocusEl) — `indices` are positions in PHOTOS.
const PhotoViewer = (() => {
  const CLOSE = ["Close", "Ferm"],
    PREV = ["Previous", "Avan"],
    NEXT = ["Next", "Apre"];
  let pv, img, cap, list = [], pos = 0, k = 0, back = null, swiped = false;
  const pad = (n) => String(n + 1).padStart(2, "0");

  function build() {
    pv = document.createElement("div");
    pv.className = "pv";
    pv.setAttribute("role", "dialog");
    pv.setAttribute("aria-modal", "true");
    pv.innerHTML =
      '<button class="x" type="button">×</button><button class="p" type="button">←</button><button class="n" type="button">→</button><figure><img class="img" alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(pv);
    img = pv.querySelector("img");
    cap = pv.querySelector("figcaption");
    pv.querySelector(".x").onclick = close;
    pv.querySelector(".p").onclick = () => step(-1);
    pv.querySelector(".n").onclick = () => step(1);
    pv.addEventListener("click", (e) => {
      if (swiped) return (swiped = false);
      if (e.target === pv) close();
    });
    let x0 = 0, y0 = 0, down = false;
    pv.addEventListener("pointerdown", (e) => {
      down = true;
      swiped = false;
      x0 = e.clientX;
      y0 = e.clientY;
    });
    pv.addEventListener("pointerup", (e) => {
      if (!down) return;
      down = false;
      const dx = e.clientX - x0,
        dy = e.clientY - y0;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        swiped = true;
        step(dx < 0 ? 1 : -1);
      }
    });
    pv.addEventListener("pointercancel", () => (down = false));
    document.addEventListener("keydown", (e) => {
      if (!pv.classList.contains("on")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function show() {
    const p = PHOTOS[list[pos]];
    img.src = p.src;
    img.alt = p.t[k];
    pv.style.setProperty("--ar", PHOTO_AR);
    cap.innerHTML = `${p.t[k]}<small>${pad(list[pos])} · ${p.brand}</small>`;
    pv.querySelector(".x").setAttribute("aria-label", CLOSE[k]);
    pv.querySelector(".p").setAttribute("aria-label", PREV[k]);
    pv.querySelector(".n").setAttribute("aria-label", NEXT[k]);
    [-1, 1].forEach((d) => {
      new Image().src = PHOTOS[list[(pos + d + list.length) % list.length]].src;
    });
  }

  function step(d) {
    pos = (pos + d + list.length) % list.length;
    show();
  }

  function close() {
    pv.classList.remove("on");
    document.body.style.overflow = "";
    back && back.focus && back.focus();
  }

  return {
    open(indices, position, lang, returnTo) {
      if (!pv) build();
      list = indices;
      pos = Math.max(0, position);
      k = lang === "en" ? 0 : 1;
      back = returnTo || null;
      show();
      pv.classList.add("on");
      document.body.style.overflow = "hidden";
      pv.querySelector(".x").focus();
    },
    // Re-render the open viewer after a language change.
    relang(lang) {
      k = lang === "en" ? 0 : 1;
      if (pv && pv.classList.contains("on")) show();
    },
  };
})();
