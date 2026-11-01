// Cloudflare Worker: creates a Stripe Checkout session for the booking page.
// Secrets/vars (set in Cloudflare, never in the website code):
//   STRIPE_SECRET_KEY  (secret)  sk_live_... or sk_test_...
//   SITE_URL           (var)     e.g. https://yourname.github.io/lutch-website   (no trailing slash)
//   ALLOWED_ORIGIN     (var)     e.g. https://yourname.github.io                 (the site's origin)
const MAX_PENCE = 5_000_000; // £50,000 sanity cap

export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    const reply = (obj, status = 200) =>
      new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return reply({ error: "POST only" }, 405);

    let b;
    try {
      b = await req.json();
    } catch {
      return reply({ error: "Bad JSON" }, 400);
    }
    const amount = Math.round(Number(b.amount));
    if (!Number.isFinite(amount) || amount < 100 || amount > MAX_PENCE) return reply({ error: "Bad amount" }, 400);
    if (!/^\S+@\S+\.\S+$/.test(b.email || "")) return reply({ error: "Bad email" }, 400);

    const p = new URLSearchParams({
      mode: "payment",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "gbp",
      "line_items[0][price_data][unit_amount]": String(amount),
      "line_items[0][price_data][product_data][name]": b.deposit ? "Lutch Media shoot: 50% deposit" : "Lutch Media shoot",
      "line_items[0][price_data][product_data][description]": String(b.summary || "").slice(0, 500),
      customer_email: b.email,
      "metadata[name]": String(b.name || "").slice(0, 200),
      "metadata[project]": String(b.project || "").slice(0, 200),
      "metadata[date]": String(b.date || "").slice(0, 50),
      "metadata[notes]": String(b.notes || "").slice(0, 450),
      success_url: `${env.SITE_URL}/book.html?paid=1`,
      cancel_url: `${env.SITE_URL}/book.html?cancelled=1#book`,
    });
    // Card + wallets (Apple Pay / Google Pay appear automatically on supported devices once your domain is verified in Stripe).

    const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
      body: p,
    });
    const s = await r.json();
    if (!r.ok) return reply({ error: s.error?.message || "Stripe error" }, 502);
    return reply({ url: s.url });
  },
};
