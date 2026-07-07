import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

export async function getProducts() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

export async function getProduct(id) {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

async function saveProducts(products) {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2) + "\n", "utf8");
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function createProduct(input) {
  const products = await getProducts();
  const base = slugify(input.name || "product") || "product";
  let id = base;
  let n = 1;
  while (products.some((p) => p.id === id)) id = `${base}-${++n}`;

  const product = {
    id,
    name: input.name?.trim() || "Untitled product",
    tamilName: input.tamilName?.trim() || "",
    sku: input.sku?.trim() || `SKU-${1000 + products.length + 1}`,
    category: input.category?.trim() || "General",
    brand: input.brand?.trim() || "",
    unit: input.unit?.trim() || "1 piece",
    price: Number(input.price) || 0,
    stock: Math.max(0, parseInt(input.stock, 10) || 0),
    status: (parseInt(input.stock, 10) || 0) > 0 ? "active" : "out",
    tag: input.tag?.trim() || "New",
    gradient: input.gradient ?? ["#0E7C66", "#3BAF94"],
    description: input.description?.trim() || "",
    details: input.details && typeof input.details === "object" ? input.details : {},
  };
  products.unshift(product);
  await saveProducts(products);
  return product;
}

export async function updateProduct(id, input) {
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = products[idx];
  const next = {
    ...current,
    ...(input.name !== undefined && { name: String(input.name).trim() }),
    ...(input.tamilName !== undefined && { tamilName: String(input.tamilName).trim() }),
    ...(input.sku !== undefined && { sku: String(input.sku).trim() }),
    ...(input.category !== undefined && { category: String(input.category).trim() }),
    ...(input.brand !== undefined && { brand: String(input.brand).trim() }),
    ...(input.unit !== undefined && { unit: String(input.unit).trim() }),
    ...(input.price !== undefined && { price: Number(input.price) || 0 }),
    ...(input.stock !== undefined && { stock: Math.max(0, parseInt(input.stock, 10) || 0) }),
    ...(input.tag !== undefined && { tag: String(input.tag).trim() }),
    ...(input.description !== undefined && { description: String(input.description).trim() }),
    ...(input.details !== undefined && typeof input.details === "object" && { details: input.details }),
    ...(input.gradient !== undefined && Array.isArray(input.gradient) && { gradient: input.gradient }),
  };
  next.status = next.stock > 0 ? "active" : "out";
  products[idx] = next;
  await saveProducts(products);
  return next;
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  await saveProducts(products);
  return true;
}
