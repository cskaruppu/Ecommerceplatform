"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { initials, money } from "@/components/ProductCard";

const CATEGORIES = [
  "Rice & Grains",
  "Dals & Pulses",
  "Oils",
  "Spices & Masala",
  "Snacks & Beverages",
  "Household",
];

const EMPTY_FORM = {
  name: "",
  tamilName: "",
  price: "",
  stock: "",
  unit: "",
  sku: "",
  category: CATEGORIES[0],
  description: "",
};

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function set(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      tamilName: p.tamilName ?? "",
      price: String(p.price),
      stock: String(p.stock),
      unit: p.unit ?? "",
      sku: p.sku,
      category: p.category,
      description: p.description ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function save(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast("Give the item a name first");
      return;
    }
    setSaving(true);
    try {
      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        showToast(err.error ?? "Something went wrong — try again");
        return;
      }
      showToast(editingId ? "Item updated" : "Item added");
      cancelEdit();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(p) {
    if (!window.confirm(`Remove “${p.name}” from the catalog? This can't be undone.`)) return;
    const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      showToast(`Removed “${p.name}”`);
      if (editingId === p.id) cancelEdit();
      await load();
    } else {
      showToast("Delete failed — try again");
    }
  }

  async function toggleStock(p) {
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: p.stock > 0 ? 0 : 10 }),
    });
    if (res.ok) {
      showToast(p.stock > 0 ? `“${p.name}” marked out of stock` : `“${p.name}” back in stock`);
      await load();
    }
  }

  const activeCount = products.filter((p) => p.stock > 0).length;

  return (
    <div className="admin-page container">
      <div className="page-head">
        <h1>Manage items</h1>
        <span className="pill in-stock">{activeCount} in stock</span>
        <span className="pill out-of-stock">{products.length - activeCount} out of stock</span>
      </div>

      <div className="admin-grid">
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="pcell">
                      <div
                        className="thumb"
                        style={{
                          background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                        }}
                      >
                        {initials(p.name)}
                      </div>
                      <div>
                        <div className="pname">
                          <Link href={`/products/${p.id}`}>{p.name}</Link>
                        </div>
                        <div className="psku">{p.tamilName || p.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td className="num">
                    {money(p.price)}
                    <span className="psku"> / {p.unit}</span>
                  </td>
                  <td className="num">
                    {p.stock > 0 ? (
                      p.stock <= 10 ? (
                        <span className="pill low-stock">{p.stock} low</span>
                      ) : (
                        p.stock
                      )
                    ) : (
                      <span className="pill out-of-stock">0</span>
                    )}
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="link-btn" onClick={() => toggleStock(p)}>
                        {p.stock > 0 ? "Mark out" : "Back in"}
                      </button>
                      <button className="link-btn" onClick={() => startEdit(p)}>
                        Edit
                      </button>
                      <button className="link-btn danger" onClick={() => remove(p)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="empty-note">
                    No items yet — add your first one on the right.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <form className="panel" onSubmit={save}>
          <h2>{editingId ? "Edit item" : "Add an item"}</h2>
          <div className="field">
            <label htmlFor="f-name">Item name</label>
            <input id="f-name" value={form.name} onChange={set("name")} placeholder="e.g. Ragi Flour" />
          </div>
          <div className="field">
            <label htmlFor="f-tamil">Tamil name (optional)</label>
            <input id="f-tamil" value={form.tamilName} onChange={set("tamilName")} placeholder="e.g. கேழ்வரகு மாவு" />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="f-price">Price (₹)</label>
              <input id="f-price" type="number" min="0" step="0.5" value={form.price} onChange={set("price")} placeholder="45" />
            </div>
            <div className="field">
              <label htmlFor="f-unit">Per unit</label>
              <input id="f-unit" value={form.unit} onChange={set("unit")} placeholder="1 kg / 500 g / 1 packet" />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="f-stock">Stock count</label>
              <input id="f-stock" type="number" min="0" step="1" value={form.stock} onChange={set("stock")} placeholder="20" />
            </div>
            <div className="field">
              <label htmlFor="f-cat">Category</label>
              <select id="f-cat" value={form.category} onChange={set("category")}>
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-desc">Description (optional)</label>
            <textarea id="f-desc" value={form.description} onChange={set("description")} placeholder="Quality, source, what it's used for…" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add item"}
            </button>
            {editingId ? (
              <button type="button" className="btn" onClick={cancelEdit}>
                Cancel
              </button>
            ) : null}
          </div>
          <p className="form-note">
            Changes show on the customer page immediately. Items with 0 stock display as out of
            stock — use “Mark out / Back in” for quick daily updates.
          </p>
        </form>
      </div>

      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </div>
  );
}
