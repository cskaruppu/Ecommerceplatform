// Client-side cart stored in localStorage. Each item: { id, name, price, qty, gradient }.
const KEY = "vendora-cart";

export function getCart() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
}

function save(items) {
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product, qty = 1) {
  const items = getCart();
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      qty,
      gradient: product.gradient,
    });
  }
  save(items);
}

export function setQty(id, qty) {
  let items = getCart();
  if (qty <= 0) {
    items = items.filter((i) => i.id !== id);
  } else {
    const item = items.find((i) => i.id === id);
    if (item) item.qty = qty;
  }
  save(items);
}

export function removeFromCart(id) {
  save(getCart().filter((i) => i.id !== id));
}

export function clearCart() {
  save([]);
}

export function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

export function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.qty * i.price, 0);
}
