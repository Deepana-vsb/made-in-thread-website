# Made in Thread — Handcrafted Chettinad Saree Storefront

An elegant, modern Indian clothing boutique website built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. It showcases **14 real Chettinad cotton sarees** with high-resolution product photography and enables direct customer enquiries and ordering via **WhatsApp**, **Google Pay**, and **Instagram**.

---

## 1. Store & Contact Details (Configured)

- **WhatsApp Enquiry Number**: `+91 87547 20307` (`wa.me/918754720307`)
- **VIP WhatsApp Group Link**: [`https://chat.whatsapp.com/G7q1k6iE241GPkcnTdOPEW`](https://chat.whatsapp.com/G7q1k6iE241GPkcnTdOPEW)
- **Instagram Page**: [`https://www.instagram.com/made_inthread`](https://www.instagram.com/made_inthread?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw==) (`@made_inthread`)
- **Payment via Google Pay (GPay) / UPI**: `+91 87547 20307`

All contact and payment details are centralized in [`app/data/siteConfig.ts`](file:///app/data/siteConfig.ts).

---

## 2. Quick Start: How to Run the Website

### Option A: From the main project folder
Open your terminal in `made-in-thread-website` and run:

```bash
npm run dev
```

### Option B: Directly inside the Next.js directory
If your terminal is inside `made-in-thread-website/made-in-thread-website`:

```bash
npm run dev
```

Once running, open your web browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

To build and test production mode:
```bash
npm run build
npm run start
```

---

## 3. How Customers Order & Pay (3 Simple Steps)

1. **Select Sarees**: Customers browse the 14 Chettinad sarees on the website and add their favourites to the order bag.
2. **Pay via Google Pay**: Customers send payment directly via Google Pay (GPay), PhonePe, or Paytm UPI to **+91 87547 20307**.
3. **Confirm on WhatsApp**: Clicking the WhatsApp checkout button sends the complete order summary and payment notice directly to **+91 87547 20307** so you can confirm stock and dispatch!

---

## 4. Beginner's Guide: Managing Your Products & Contact Info

All your store information and product inventory are cleanly separated into easy-to-edit files under `app/data/`. You **never** need to touch complex React code to update your catalogue!

### A. How to Update Selling Prices
1. Open [`app/data/products.ts`](file:///app/data/products.ts).
2. Find the product you want to change (e.g. `Teal Chettinad Cotton Saree`).
3. Change the `price: 1499` number to your real selling price:
   ```ts
   price: 1850, // Change 1499 to your desired price in Rupees
   ```
4. Save the file. The website updates automatically!

### B. How to Update WhatsApp Number, Group Link, or Instagram
1. Open [`app/data/siteConfig.ts`](file:///app/data/siteConfig.ts).
2. Modify any of the fields:
   ```ts
   whatsappNumber: "918754720307",
   whatsappNumberFormatted: "+91 87547 20307",
   whatsappGroupLink: "https://chat.whatsapp.com/G7q1k6iE241GPkcnTdOPEW",
   instagramUrl: "https://www.instagram.com/made_inthread?...",
   googlePayNumber: "+91 87547 20307",
   ```
3. Save the file.

### C. How to Add a New Saree Photo
1. Copy your new image file (e.g. `yellow-saree.jpeg`) into the folder:
   `public/products/yellow-saree.jpeg`
2. Open [`app/data/products.ts`](file:///app/data/products.ts).
3. Scroll to the bottom of the `products` list and add a new entry:
   ```ts
   {
     id: 15,
     name: "Haldi Yellow Chettinad Saree",
     category: "Festive Weaves",
     price: 1650,
     image: "/products/yellow-saree.jpeg",
     description: "Bright festive yellow cotton weave with traditional border motifs.",
     fabric: "100% Pure Chettinad Cotton",
     inStock: true,
     tag: "NEW",
   },
   ```
4. Save the file.

---

## 5. Deployment Guide (Vercel + GitHub)

1. **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Made in Thread website with Google Pay & WhatsApp community"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/made-in-thread-website.git
   git push -u origin main
   ```
2. **Vercel**:
   - Go to [Vercel.com](https://vercel.com), click **Import**, select this repo, set root to `made-in-thread-website`, and click **Deploy**.
3. **Custom Domain (`madeinthread.in`)**:
   - Add your domain in Vercel settings and update DNS A/CNAME records with your registrar.
