# Vendora — Ecommerce Platform

A full-stack ecommerce starter built with Next.js (App Router). It ships two sides of one product catalog:

- **Storefront** (`/`) — customers browse products, search and filter by category, open a product detail page with full specifications, and manage a cart.
- **Admin console** (`/admin`) — anybody on the team can add, edit, and delete products. Changes appear on the storefront immediately.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Product grid with live search and category filter chips |
| `/products/[id]` | Product detail: description, price, rating, stock status, spec table (materials, dimensions, care, SKU) |
| `/cart` | Cart with quantity controls and order total (stored in the browser) |
| `/admin` | Product management: create, edit, delete |

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/products` | List all products |
| `POST` | `/api/products` | Create a product |
| `GET` | `/api/products/:id` | Fetch one product |
| `PUT` | `/api/products/:id` | Update a product |
| `DELETE` | `/api/products/:id` | Delete a product |

Products are stored in `data/products.json` — simple to inspect and edit by hand. Swapping this for PostgreSQL later only requires changing `lib/products.js`; every page and API route goes through it.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the storefront and http://localhost:3000/admin to manage products.

## Roadmap

1. **Done** — product catalog, storefront, detail pages, cart, admin CRUD
2. Next — PostgreSQL + Prisma, image uploads, Stripe checkout, admin login
3. Later — customer accounts, order history, discounts, AI-assisted product descriptions, multi-channel publishing
