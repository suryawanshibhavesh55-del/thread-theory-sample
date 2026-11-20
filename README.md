# THREAD THEORY by Khushboo

A luxury fashion e-commerce website for contemporary Indian clothing label **THREAD THEORY by Khushboo**, inspired by high-fashion editorial aesthetics.

## ✨ Features

- **Automatic Infinite Hero Carousel**: Smooth right-to-left transition every 3 seconds (`cubic-bezier(0.22, 1, 0.36, 1)`) with pause/play controls, touch swipe support, and responsive image pairs.
  - **Desktop**: `assets/main laptop.png` and `assets/main laptop 2.png`
  - **Mobile**: `assets/main mobile.png` and `assets/main mobile 2.png`
- **Editorial Brand Typography**: Minimal typographic logo and luxury styling with Cormorant Garamond and Montserrat.
- **Top Announcement & Utility Rows**: Auto-rotating promotional alerts, size guide trigger, and real-time multi-currency selector (`INR ₹`, `USD $`, `GBP £`, `EUR €`).
- **Product Collection Tabs**: Curated collections under **New In**, **Festive Edit**, and **The Collection**.
- **Shop by Category**: 4-column layout (**Co-ord Sets**, **Farshi**, **Kaftans**, **Summer Casuals**) with dark chocolate bottom bars and hover animations.
- **Product Detail Modal (PDP)**: High-resolution gallery, interactive thumbnails, size selection (`XS` to `XL`), atelier specifications, shipping details, and exchange policy accordions.
- **Slide-out Cart & Wishlist Drawers**: Real-time line item quantity adjustments, free shipping progress bar (₹5,000 threshold), and saved silhouettes.
- **Multi-Step Checkout Flow**: Shipping address validation, payment method selector (Instant UPI, Cards, Net Banking, COD), and order confirmation state.

## 📁 Project Structure

```
├── assets/                  # Hero covers & boutique product photography
├── js/
│   ├── products.js          # Product catalog & category data
│   └── app.js               # Application logic, cart, wishlist & carousel
├── styles/
│   └── main.css             # Luxury design system & responsive styling
├── index.html               # Main entry page
├── server.ps1               # Lightweight static file server for local testing
└── README.md
```

## 🚀 Running Locally

To run the site locally:

```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```

Then open `http://localhost:8080/` in your browser. Alternatively, double-click `index.html` to open directly.
