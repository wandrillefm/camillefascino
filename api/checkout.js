const { DESIGNS, TYPES, SIZES, getProductPrice } = require('../catalogue.js');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée' });

  const { items, promoCode } = req.body;

  // Promo codes: "TRASCO=0.2,SCOUT10=0.1"
  const promoCodes = {};
  if (process.env.PROMO_CODES) {
    for (const entry of process.env.PROMO_CODES.split(',')) {
      const [code, discount] = entry.trim().split('=');
      if (code && discount) {
        promoCodes[code.toUpperCase()] = parseFloat(discount);
      }
    }
  }

  let discountPercent = 0;
  let appliedPromo = null;

  if (promoCode) {
    const code = promoCode.trim().toUpperCase();

    if (promoCodes[code] !== undefined) {
      discountPercent = promoCodes[code];
      appliedPromo = code;
    } else {
      return res.status(400).json({ error: 'Code promo invalide' });
    }
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Panier vide' });
  }

  for (const item of items) {
    const design = DESIGNS.find(d => d.id === item.design);

    if (!design)
      return res.status(400).json({ error: 'Design invalide' });

    if (!design.types.includes(item.type))
      return res.status(400).json({ error: 'Type non disponible pour ce design' });

    if (!design.colors.includes(item.color))
      return res.status(400).json({ error: 'Couleur non disponible pour ce design' });

    if (!SIZES.includes(item.size))
      return res.status(400).json({ error: 'Taille invalide' });

    const envPrice = process.env[`PRICE_${item.type.toUpperCase()}`];
    const initialPrice = envPrice
      ? parseFloat(envPrice)
      : getProductPrice(design.key, item.type);

    const expectedPrice =
      Math.round(initialPrice * (1 - discountPercent) * 10) / 10;

    if (item.price !== expectedPrice) {
      return res.status(400).json({
        error: `Prix invalide pour ${item.type} (attendu: ${expectedPrice}€)`
      });
    }
  }

  const typeLabels = Object.fromEntries(TYPES.map(t => [t.id, t.label]));
  const designLabels = Object.fromEntries(DESIGNS.map(d => [d.id, d.label]));

  // Group identical items
  const grouped = {};
  for (const item of items) {
    const key = `${item.type}-${item.size}-${item.color}-${item.design}`;

    if (!grouped[key]) {
      grouped[key] = { ...item, qty: 0 };
    }

    grouped[key].qty++;
  }

  // Shipping
  const totalCommande = items.reduce((sum, item) => sum + item.price, 0);
  const fraisLivraison = totalCommande > 125 ? 0 : items.length * 5;

  const promoLabel = appliedPromo
    ? ` [${appliedPromo} −${Math.round(discountPercent * 100)}%]`
    : "";

  const lineItemsParams = {};

  Object.values(grouped).forEach((item, i) => {
    lineItemsParams[`line_items[${i}][price_data][currency]`] = "eur";
    lineItemsParams[`line_items[${i}][price_data][product_data][name]`] =
      `${typeLabels[item.type]} — ${designLabels[item.design]}`;
    lineItemsParams[`line_items[${i}][price_data][product_data][description]`] =
      `Couleur: ${item.color} | Taille: ${item.size}${promoLabel}`;
    lineItemsParams[`line_items[${i}][price_data][unit_amount]`] =
      String(Math.round(item.price * 100));
    lineItemsParams[`line_items[${i}][quantity]`] =
      String(item.qty);
  });

  const shippingIndex = Object.keys(grouped).length;

  if (fraisLivraison > 0) {
    lineItemsParams[`line_items[${shippingIndex}][price_data][currency]`] = "eur";
    lineItemsParams[`line_items[${shippingIndex}][price_data][product_data][name]`] = "Livraison";
    lineItemsParams[`line_items[${shippingIndex}][price_data][product_data][description]`] =
      `${items.length} article(s) × 5€`;
    lineItemsParams[`line_items[${shippingIndex}][price_data][unit_amount]`] =
      String(Math.round(fraisLivraison * 100));
    lineItemsParams[`line_items[${shippingIndex}][quantity]`] = "1";
  } else {
    lineItemsParams[`line_items[${shippingIndex}][price_data][currency]`] = "eur";
    lineItemsParams[`line_items[${shippingIndex}][price_data][product_data][name]`] = "Livraison offerte";
    lineItemsParams[`line_items[${shippingIndex}][price_data][product_data][description]`] =
      "Commande ≥ 125€";
    lineItemsParams[`line_items[${shippingIndex}][price_data][unit_amount]`] = "0";
    lineItemsParams[`line_items[${shippingIndex}][quantity]`] = "1";
  }

  try {
    const stripeRes = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STRP_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...lineItemsParams,
          "payment_method_types[]": "card",
          mode: "payment",
          success_url: `${process.env.BASE_URL}/success.html`,
          cancel_url: `${process.env.BASE_URL}/`,
          "shipping_address_collection[allowed_countries][]": "FR",
          "phone_number_collection[enabled]": "true",
        }).toString(),
      }
    );

    if (!stripeRes.ok) {
      const errData = await stripeRes.json();
      console.error("Stripe error:", errData);

      return res.status(500).json({
        error: errData.error?.message || "Erreur Stripe",
      });
    }

    const session = await stripeRes.json();

    return res.status(200).json({
      url: session.url,
      promoApplied: appliedPromo
        ? { code: appliedPromo, discountPercent }
        : null,
    });

  } catch (err) {
    console.error("Stripe fetch error:", err);

    return res.status(500).json({
      error: "Erreur lors de la création du paiement",
    });
  }
}
