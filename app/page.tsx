"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Copy,
  CreditCard,
  Heart,
  Instagram,
  Menu,
  MessageCircle,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { products, categories, Category, Product } from "./data/products";
import { siteConfig } from "./data/siteConfig";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function money(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function Home() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [bag, setBag] = useState<Product[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [copiedGPay, setCopiedGPay] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesQuery =
        !normalized ||
        `${product.name} ${product.category} ${product.description} ${product.fabric}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const bagTotal = bag.reduce((sum, item) => sum + item.price, 0);

  // WhatsApp enquiry for the entire bag with Google Pay payment instructions
  const orderText = encodeURIComponent(
    `Hi ${siteConfig.brandName}!\n\nI would like to place an order for the following Chettinad sarees from your website:\n\n` +
      bag
        .map(
          (item, index) =>
            `${index + 1}. ${item.name} — ${money(item.price)}`
        )
        .join("\n") +
      `\n\nEstimated Total: ${money(bagTotal)}` +
      `\nPayment Preference: Google Pay to ${siteConfig.googlePayNumber}` +
      `\n\nPlease confirm availability, final price, and dispatch address details. Thank you!`
  );
  const whatsappBagLink = `https://wa.me/${siteConfig.whatsappNumber}?text=${orderText}`;

  // Direct WhatsApp enquiry for a single product
  function getSingleProductWhatsAppLink(product: Product) {
    const text = encodeURIComponent(
      `Hi ${siteConfig.brandName}!\n\nI would like to order / enquire about the "${product.name}" (${money(
        product.price
      )}).\n\nI would like to pay via Google Pay to ${siteConfig.googlePayNumber}. Could you please confirm stock, blouse piece availability, and shipping timeline?`
    );
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
  }

  function addToBag(product: Product) {
    setBag((current) => [...current, product]);
    setNotice(`"${product.name}" added to your order bag.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function removeFromBag(index: number) {
    setBag((current) => current.filter((_, i) => i !== index));
  }

  function handleImageError(id: number) {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  }

  function copyGPayNumber() {
    navigator.clipboard.writeText("8754720307");
    setCopiedGPay(true);
    setNotice("Google Pay number +91 87547 20307 copied to clipboard!");
    window.setTimeout(() => {
      setCopiedGPay(false);
      setNotice("");
    }, 3000);
  }

  // UPI deep link for mobile Google Pay / UPI apps
  const upiDeepLink = `upi://pay?pa=8754720307@upi&pn=Made%20in%20Thread&am=${bagTotal || 1499}&cu=INR&tn=Made%20in%20Thread%20Saree%20Order`;

  return (
    <main>
      {/* Announcement Bar */}
      <div className="announcement">
        <span>✳</span>
        <span>
          Pure Chettinad Cotton Sarees · Enquiries &amp; Google Pay Orders:{" "}
          <strong>{siteConfig.whatsappNumberFormatted}</strong>
        </span>
        <a
          href={siteConfig.whatsappGroupLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Join our WhatsApp community group"
        >
          <Users size={12} /> Join WhatsApp VIP Group ↗
        </a>
      </div>

      {/* Header */}
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Made in Thread home">
          made in <em>thread</em>
          <span className="wordmark-dot">.</span>
        </a>

        <nav
          className={menuOpen ? "nav nav-open" : "nav"}
          aria-label="Main navigation"
        >
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            Saree Collection
          </a>
          <a href="#order-guide" onClick={() => setMenuOpen(false)}>
            How to Order &amp; Pay
          </a>
          <a href="#story" onClick={() => setMenuOpen(false)}>
            Our Heritage
          </a>
          <a
            href={siteConfig.whatsappGroupLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{ color: "#128C7E", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}
          >
            <Users size={13} /> WhatsApp Group
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact &amp; Enquiry
          </a>
        </nav>

        <div className="header-actions">
          <a
            className="icon-button"
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Follow us on Instagram @made_inthread"
            title="Instagram: @made_inthread"
          >
            <Instagram size={18} />
          </a>
          <a
            className="icon-button search-desktop"
            href="#shop"
            aria-label="Go to search"
          >
            <Search size={19} />
          </a>
          <button
            className="bag-button"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label={`Order bag with ${bag.length} items`}
          >
            <ShoppingBag size={18} />
            <span>Bag ({bag.length})</span>
          </button>
          <button
            className="icon-button mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={14} /> AUTHENTIC CHETTINAD HANDLOOMS
          </div>
          <h1>
            Wear what<br />
            feels like <em>you.</em>
          </h1>
          <p>
            Crisp, breathable Chettinad cotton drapes in timeless South Indian
            colours. Order directly via WhatsApp and pay via Google Pay to{" "}
            <strong>{siteConfig.googlePayNumber}</strong>.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <a className="button button-dark" href="#shop">
              Explore 14 Sarees <ArrowRight size={17} />
            </a>
            <a
              className="button button-wa"
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hi ${siteConfig.brandName}! I'm visiting your website and would like to enquire about your Chettinad sarees.`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp ({siteConfig.whatsappNumberFormatted})
            </a>
            <a
              className="button button-group-wa"
              href={siteConfig.whatsappGroupLink}
              target="_blank"
              rel="noreferrer"
            >
              <Users size={16} /> Join WhatsApp Group
            </a>
          </div>

          <div className="hero-note">
            <span className="tiny-star">✳</span> Google Pay Accepted:{" "}
            <strong style={{ color: "var(--ink)", marginLeft: "4px" }}>
              {siteConfig.googlePayNumber}
            </strong>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={`${basePath}/products/chettinadsaree.jpeg`}
            alt="Teal Chettinad Cotton Saree - Handcrafted collection"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85";
            }}
          />
          <div className="hero-sticker">
            <span>PURE</span>
            <strong>cotton</strong>
            <span>HANDLOOM</span>
          </div>
          <div className="hero-image-caption">
            FEATURED · TEAL CHETTINAD SAREE
          </div>
        </div>
        <div className="hero-side-label">
          HERITAGE WEAVES — AUTHENTIC CHETTINAD
        </div>
      </section>

      {/* Brand Values Ticker */}
      <section className="ticker" aria-label="Brand values">
        <span>AUTHENTIC CHETTINAD WEAVES</span>
        <i>✳</i>
        <span>GOOGLE PAY: {siteConfig.googlePayNumber}</span>
        <i>✳</i>
        <span>100% BREATHABLE COTTON</span>
        <i>✳</i>
        <span>INSTAGRAM: @made_inthread</span>
        <i>✳</i>
        <span>WHATSAPP VIP COMMUNITY</span>
      </section>

      {/* How to Order & Pay Guide Section */}
      <section className="order-guide-section" id="order-guide">
        <div className="section-heading" style={{ marginBottom: "16px" }}>
          <div>
            <div className="eyebrow">SEAMLESS ORDERING &amp; PAYMENT</div>
            <h2>
              Order in <em>3 Simple Steps.</em>
            </h2>
          </div>
          <p>
            Fast, transparent, and direct. No complicated checkout forms — pay
            securely with Google Pay and connect directly on WhatsApp.
          </p>
        </div>

        <div className="order-steps-grid">
          {/* Step 1 */}
          <div className="order-step-card">
            <div>
              <div className="step-number">1</div>
              <h3>Choose Your Saree</h3>
              <p>
                Browse our real 14 Chettinad cotton sarees below. Click{" "}
                <strong>&ldquo;Add to bag&rdquo;</strong> for multiple sarees or click{" "}
                <strong>&ldquo;Enquire on WhatsApp&rdquo;</strong> to ask about a specific piece.
              </p>
            </div>
            <div style={{ fontSize: "11px", color: "var(--muted)" }}>
              ✦ Photos taken directly from our physical inventory
            </div>
          </div>

          {/* Step 2 */}
          <div className="order-step-card">
            <div>
              <div className="step-number">2</div>
              <h3>Pay via Google Pay</h3>
              <p>
                Transfer the order amount easily using Google Pay (GPay), PhonePe, or
                any UPI app to our verified business number:
              </p>
            </div>
            <div className="gpay-badge-box">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "10px", color: "#5f6368", display: "block" }}>
                    Google Pay / UPI Number
                  </span>
                  <strong>{siteConfig.googlePayNumber}</strong>
                </div>
                <button
                  className="copy-btn"
                  onClick={copyGPayNumber}
                  type="button"
                  aria-label="Copy Google Pay Number"
                >
                  {copiedGPay ? <Check size={12} /> : <Copy size={12} />}
                  {copiedGPay ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="order-step-card">
            <div>
              <div className="step-number">3</div>
              <h3>Confirm &amp; Track on WhatsApp</h3>
              <p>
                Send your order list and GPay payment screenshot to{" "}
                <strong>{siteConfig.whatsappNumberFormatted}</strong>. We confirm
                stock, blouse pieces, and share your dispatch tracking immediately!
              </p>
            </div>
            <a
              className="button button-wa"
              style={{ fontSize: "11px", padding: "10px 14px", width: "100%", justifyContent: "center" }}
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hi ${siteConfig.brandName}! I have a question regarding ordering and Google Pay payment.`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={15} /> Message {siteConfig.whatsappNumberFormatted}
            </a>
          </div>
        </div>
      </section>

      {/* Product Collection Section */}
      <section className="shop-section section-pad" id="shop">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE CHETTINAD SAREE COLLECTION</div>
            <h2>
              Find your <em>favourite</em> drape.
            </h2>
          </div>
          <p>
            Each saree is photographed directly from our physical inventory.
            <br className="desktop-break" />
            Prices shown are editable placeholders — message us on WhatsApp for exact confirmed rates.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="shop-controls">
          <div
            className="category-tabs"
            role="group"
            aria-label="Filter products by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "category-tab active" : "category-tab"}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={17} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by colour, fabric..."
              aria-label="Search products"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </label>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {visibleProducts.map((product, index) => {
            const hasError = imageErrors[product.id];
            const inBag = bag.some((item) => item.id === product.id);

            return (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  {hasError ? (
                    <div className="image-fallback">
                      <Sparkles size={28} />
                      <span>{product.name}</span>
                    </div>
                  ) : (
                    <img
                      src={product.image.startsWith("http") ? product.image : `${basePath}${product.image}`}
                      alt={product.name}
                      loading={index < 4 ? "eager" : "lazy"}
                      onError={() => handleImageError(product.id)}
                    />
                  )}

                  {product.tag && (
                    <span className="product-tag">{product.tag}</span>
                  )}

                  <div className="card-overlay-actions">
                    <button
                      className="quick-add"
                      onClick={() => addToBag(product)}
                      aria-label={`Add ${product.name} to order bag`}
                    >
                      {inBag ? (
                        <>
                          <Check size={15} /> Added to bag ({bag.filter((i) => i.id === product.id).length})
                        </>
                      ) : (
                        <>
                          <span>＋ Add to order bag</span>
                          <ShoppingBag size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    className="direct-wa-btn"
                    href={getSingleProductWhatsAppLink(product)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Enquire about ${product.name} on WhatsApp`}
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>

                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.fabric}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong>{money(product.price)}*</strong>
                    <span className="price-tag-sub">Placeholder</span>
                  </div>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-card-footer">
                  <a
                    className="product-wa-link"
                    href={getSingleProductWhatsAppLink(product)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={14} /> Order via WhatsApp
                  </a>
                  <span style={{ fontSize: "10px", color: "var(--muted)", display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <CreditCard size={12} /> GPay: {siteConfig.googlePayNumber}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {visibleProducts.length === 0 && (
          <div className="empty-state">
            <p>No sarees found matching &ldquo;{query}&rdquo;.</p>
            <button
              className="button button-dark"
              style={{ marginTop: "12px" }}
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              View all 14 Sarees
            </button>
          </div>
        )}

        <div className="collection-footer">
          <span>
            SHOWING {visibleProducts.length} OF {products.length} REAL CHETTINAD SAREES
          </span>
          <a href="#contact">
            Need help choosing colours? <ArrowRight size={15} />
          </a>
        </div>
      </section>

      {/* Story / About Section */}
      <section className="story-section" id="story">
        <div className="story-image">
          <img
            src={`${basePath}/products/pink-saree.jpeg`}
            alt="Handcrafted Chettinad Sarees by Made in Thread"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85";
            }}
          />
          <div className="story-stamp">
            WEAVE<br />
            <span>with</span>
            <br />
            HEART ✳
          </div>
        </div>
        <div className="story-copy">
          <div className="eyebrow">OUR HERITAGE &amp; PASSION</div>
          <h2>
            Pure cotton weaves.<br />
            <em>Timeless South Indian</em> grace.
          </h2>
          <p>
            Chettinad cotton sarees are renowned for their crisp drapes, distinct
            temple borders, and rich natural hues. At <strong>Made in Thread</strong>,
            we bring these genuine handloom drapes straight from the artisans to
            your wardrobe.
          </p>
          <p>
            Whether you are dressing for a family puja, a festive celebration, or a
            relaxed day of work, our breathable weaves keep you cool, comfortable,
            and effortlessly elegant.
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "12px" }}>
            <a
              className="button button-group-wa"
              href={siteConfig.whatsappGroupLink}
              target="_blank"
              rel="noreferrer"
            >
              <Users size={16} /> Join our WhatsApp Community
            </a>
            <a
              className="social-link"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Instagram size={17} /> Follow on Instagram @made_inthread
            </a>
          </div>
          <div className="signature">
            with love, <em>Made in Thread</em>
          </div>
        </div>
      </section>

      {/* Service Strip */}
      <section className="service-strip">
        <div>
          <span className="service-icon">✳</span>
          <h3>100% Pure Cotton</h3>
          <p>Authentic, breathable Chettinad handloom weave.</p>
        </div>
        <div>
          <span className="service-icon">♡</span>
          <h3>Google Pay: {siteConfig.googlePayNumber}</h3>
          <p>Easy, fast, and transparent direct payment.</p>
        </div>
        <div>
          <span className="service-icon">↗</span>
          <h3>WhatsApp Community</h3>
          <p>Daily drops, styling ideas &amp; member discounts.</p>
        </div>
      </section>

      {/* Contact & Enquiry Section */}
      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <div className="eyebrow">DIRECT BOUTIQUE ENQUIRY &amp; ORDERS</div>
          <h2>
            Your favourite saree<br />
            is just a <em>message away.</em>
          </h2>
          <p>
            Connect with us on WhatsApp for orders, custom colors, bulk bookings,
            and blouse piece inquiries. Pay securely via Google Pay to{" "}
            <strong>{siteConfig.googlePayNumber}</strong>.
          </p>

          {/* 4 Interactive Contact & Community Channels */}
          <div className="contact-channels-grid">
            {/* Channel 1: WhatsApp Enquiry */}
            <div className="channel-card">
              <div className="channel-card-header" style={{ color: "#1e7e34" }}>
                <MessageCircle size={18} />
                <span>WhatsApp Enquiry</span>
              </div>
              <p>Direct chat for stock checks, delivery, and personal assistance.</p>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                {siteConfig.whatsappNumberFormatted}
              </span>
              <a
                className="channel-action"
                style={{ color: "#1e7e34" }}
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${siteConfig.brandName}! I would like to enquire about your Chettinad sarees.`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp <ArrowRight size={14} />
              </a>
            </div>

            {/* Channel 2: WhatsApp Group */}
            <div className="channel-card">
              <div className="channel-card-header" style={{ color: "#128C7E" }}>
                <Users size={18} />
                <span>WhatsApp Community</span>
              </div>
              <p>Exclusive group for new releases, saree videos, and festive offers.</p>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                Active Saree Enthusiasts
              </span>
              <a
                className="channel-action"
                style={{ color: "#128C7E" }}
                href={siteConfig.whatsappGroupLink}
                target="_blank"
                rel="noreferrer"
              >
                Join VIP Community Group <ArrowRight size={14} />
              </a>
            </div>

            {/* Channel 3: Google Pay Payment */}
            <div className="channel-card">
              <div className="channel-card-header" style={{ color: "#1967d2" }}>
                <Smartphone size={18} />
                <span>Pay via Google Pay</span>
              </div>
              <p>Send payments directly for orders via GPay, PhonePe, or UPI.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                  {siteConfig.googlePayNumber}
                </span>
                <button
                  className="copy-btn"
                  onClick={copyGPayNumber}
                  type="button"
                >
                  {copiedGPay ? <Check size={12} /> : <Copy size={12} />}
                  {copiedGPay ? "Copied" : "Copy"}
                </button>
              </div>
              <span style={{ fontSize: "10px", color: "var(--muted)", marginTop: "4px" }}>
                UPI ID: {siteConfig.upiIdPlaceholder}
              </span>
            </div>

            {/* Channel 4: Instagram */}
            <div className="channel-card">
              <div className="channel-card-header" style={{ color: "#C13584" }}>
                <Instagram size={18} />
                <span>Instagram Profile</span>
              </div>
              <p>Watch styling reels, customer photos, and daily updates.</p>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--ink)" }}>
                @made_inthread
              </span>
              <a
                className="channel-action"
                style={{ color: "#C13584" }}
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow on Instagram <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Enquiry & Order Bag Details */}
          {bag.length > 0 && (
            <div className="bag-summary">
              <strong>Your Order Bag ({bag.length} items)</strong>
              {bag.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bag-line">
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>{money(item.price)}*</span>
                    <button
                      onClick={() => removeFromBag(index)}
                      aria-label={`Remove ${item.name}`}
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="bag-total">
                <span>Estimated Total (Placeholder)</span>
                <strong>{money(bagTotal)}*</strong>
              </div>

              {/* GPay Box in Bag */}
              <div className="gpay-checkout-box">
                <div className="gpay-checkout-header">
                  <strong>
                    <Smartphone size={15} /> Pay via Google Pay for this Order
                  </strong>
                  <span style={{ fontSize: "11px", color: "#1967d2", fontWeight: 600 }}>
                    Fast &amp; Direct
                  </span>
                </div>
                <div className="gpay-number-row">
                  <div>
                    <span style={{ fontSize: "10px", color: "#5f6368", display: "block" }}>
                      Send payment to this mobile number:
                    </span>
                    <span>{siteConfig.googlePayNumber}</span>
                  </div>
                  <button
                    className="copy-btn"
                    onClick={copyGPayNumber}
                    type="button"
                  >
                    {copiedGPay ? <Check size={12} /> : <Copy size={12} />}
                    {copiedGPay ? "Copied" : "Copy"}
                  </button>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <a
                    className="copy-btn"
                    style={{ textDecoration: "none" }}
                    href={upiDeepLink}
                  >
                    Open Google Pay / UPI App ({money(bagTotal)})
                  </a>
                </div>
              </div>

              <p className="small-note">
                * Note: Prices shown are editable placeholders. Clicking below sends
                your complete order list and Google Pay payment notice to our official
                WhatsApp at <strong>{siteConfig.whatsappNumberFormatted}</strong> for instant confirmation!
              </p>

              <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  className="button button-wa"
                  style={{ width: "100%", justifyContent: "center" }}
                  href={whatsappBagLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={16} /> Send Order &amp; Pay via GPay ({siteConfig.whatsappNumberFormatted})
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="contact-art">
          <img
            src={`${basePath}/products/brown-saree.jpeg`}
            alt="Chettinad Saree craft detail"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85";
            }}
          />
          <div className="contact-art-note">
            Authentic weaves<br />
            <em>made with love.</em>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons for quick WhatsApp & Community access */}
      <div className="floating-widgets" aria-label="Quick contact shortcuts">
        <a
          className="floating-wa-btn"
          href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
            `Hi ${siteConfig.brandName}! I'm looking at your Chettinad saree collection on the website and have a question.`
          )}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp +91 87547 20307"
          title="Chat on WhatsApp (+91 87547 20307)"
        >
          <MessageCircle size={20} />
          <span>Chat (+91 87547 20307)</span>
        </a>
        <a
          className="floating-group-btn"
          href={siteConfig.whatsappGroupLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Join WhatsApp Community"
          title="Join WhatsApp VIP Community"
        >
          <Users size={17} />
          <span>Join VIP Group</span>
        </a>
      </div>

      {/* Footer */}
      <footer className="footer">
        <a className="wordmark footer-wordmark" href="#">
          made in <em>thread</em>
          <span className="wordmark-dot">.</span>
        </a>
        <p>Wear what feels like you. ✳</p>
        <div className="footer-links">
          <a href="#shop">Collection</a>
          <a href="#order-guide">How to Order &amp; Pay</a>
          <a href="#story">Our Heritage</a>
          <a
            href={siteConfig.whatsappGroupLink}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#128C7E", fontWeight: 600 }}
          >
            VIP WhatsApp Group
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp (+91 87547 20307)
          </a>
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
          >
            Instagram (@made_inthread)
          </a>
        </div>
        <small>
          © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          <br />
          Google Pay Payment &amp; WhatsApp Enquiries: <strong>{siteConfig.googlePayNumber}</strong> · Instagram: <strong>@made_inthread</strong>
        </small>
      </footer>

      {/* Floating Toast Notification */}
      {notice && (
        <div className="toast" role="status">
          {notice}
        </div>
      )}

      {/* Back to Top */}
      <a className="scroll-top" href="#" aria-label="Back to top">
        <ArrowDown size={16} />
      </a>
    </main>
  );
}
