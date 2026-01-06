# Spare Parts eCommerce Frontend

A Next.js-based customer-facing eCommerce website for automotive spare parts.

## Features

- 🛒 Full eCommerce functionality (cart, checkout)
- 🏪 Multi-tenant support (subdomain-based)
- 🚗 Brand/category browsing
- 🔍 Product search
- 💳 Multiple payment methods (COD, Bank Transfer, Credit)
- 👤 Customer accounts with order history
- 📱 Responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_TENANT=demo
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **Carousel**: Embla Carousel

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── page.tsx           # Homepage
│   ├── products/          # Product listing & detail
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── auth/              # Login/Register
│   ├── account/           # Customer dashboard
│   ├── about/             # About page
│   ├── services/          # Services page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # TopBar, Header, Navigation, Footer
│   ├── home/              # Homepage components
│   └── product/           # Product components
└── lib/
    ├── tenant-context.tsx # Multi-tenant support
    └── cart-store.ts      # Cart state management
```

## Connecting to Backend

This frontend connects to the SLICT ERP backend. Ensure the ERP is running and update `NEXT_PUBLIC_API_URL` accordingly.

## Deployment

Deploy on Vercel or Cloudflare Pages. For multi-tenant support:
1. Configure wildcard domain: `*.spareparts.slict.lk`
2. Set up wildcard SSL certificate
