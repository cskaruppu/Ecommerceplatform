# Amman Maligai — Store Catalog Website

A simple website for a local departmental store (maligai kadai) in Perundurai. Customers can see
what's in stock today with prices, build a shopping list, and send it to the shop on WhatsApp.
The shopkeeper manages everything from the admin page — no technical knowledge needed.

## Customer side

| Route | What it does |
| --- | --- |
| `/` | Landing page: the kadai's story, what makes it special, today's highlights, visit info |
| `/products` | All items with live search (English or Tamil), category filters, in-stock filter, and price/name sorting |
| `/products/[id]` | Item details: price per unit, Tamil name, description, availability, specifications |
| `/list` | Shopping list with an "order on WhatsApp" button and a call button |

## Shopkeeper side

| Route | What it does |
| --- | --- |
| `/admin` | Add, edit, and delete items; quick "Mark out / Back in" stock toggle |

## Store details

Edit `lib/store.js` to set your store name, address, phone, WhatsApp number, and timings —
the whole site updates from that one file.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/products` | List all items |
| `POST` | `/api/products` | Add an item |
| `GET` | `/api/products/:id` | Fetch one item |
| `PUT` | `/api/products/:id` | Update an item |
| `DELETE` | `/api/products/:id` | Delete an item |

Items are stored in `data/products.json` — easy to inspect and edit by hand. Swapping this for a
real database later only requires changing `lib/products.js`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000 for the customer page and http://localhost:3000/admin to manage items.

## Roadmap

1. **Done** — item catalog with Tamil names and ₹ prices, search & filters, detail pages, WhatsApp shopping list, admin management
2. Next — password protection for `/admin`, item photos, deploy online (e.g. Vercel)
3. Later — daily price update shortcuts, Tamil-language toggle for the whole site, delivery-area notes
