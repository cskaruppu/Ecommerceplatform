"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { initials, money } from "@/components/ProductCard";

const EMPTY_FORM = {
  name: "",
  price: "",
  stock: "",
  sku: "",
  category: "Kitchen",
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
      price: String(p.price),
      stock: String(p.stock),
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
      showToast("Give the product a name first");
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
      showToast(editingId ? "Product updated" : "Product created");
      cancelEdit();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function remove(p) {
    if (!window.confirm(`Delete “${p.name}”? This can't be undone.`)) return;
    const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
    if (res.ok) {
      showToast(`Deleted “${p.name}”`);
      if (editingId === p.id) cancelEdit();
      await load();
    } else {
      showToast("Delete failed — try again");
    }
  }

  const activeCount = products.filter((p) => p.stock > 0).length;

  return (
    <div className="admin-page container">
      <div className="page-head">
        <h1>Products</h1>
        <span className="pill in-stock">{activeCount} in stock</span>
        <span className="pill out-of-stock">{products.length - activeCount} sold out</span>
      </div>

      <div className="admin-grid">
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
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
                        <div className="psku mono">{p.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td className="num">{money(p.price)}</td>
                  <td className="num">
                    {p.stock > 0 ? (
                      p.stock <= 15 ? (
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
                    No products yet — add your first one on the right.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <form className="panel" onSubmit={save}>
          <h2>{editingId ? "Edit product" : "Add a product"}</h2>
          <div className="field">
            <label htmlFor="f-name">Product name</label>
            <input id="f-name" value={form.name} onChange={set("name")} placeholder="e.g. Oak Serving Board" />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="f-price">Price (USD)</label>
              <input id="f-price" type="number" min="0" step="0.01" value={form.price} onChange={set("price")} placeholder="49.00" />
            </div>
            <div className="field">
              <label htmlFor="f-stock">Stock on hand</label>
              <input id="f-stock" type="number" min="0" step="1" value={form.stock} onChange={set("stock")} placeholder="25" />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="f-sku">SKU</label>
              <input id="f-sku" className="mono" value={form.sku} onChange={set("sku")} placeholder="auto if blank" />
            </div>
            <div className="field">
              <label htmlFor="f-cat">Category</label>
              <select id="f-cat" value={form.category} onChange={set("category")}>
                <option>Kitchen</option>
                <option>Living</option>
                <option>Workspace</option>
                <option>Lighting</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-desc">Description</label>
            <textarea id="f-desc" value={form.description} onChange={set("description")} placeholder="What makes this product worth owning?" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add product"}
            </button>
            {editingId ? (
              <button type="button" className="btn" onClick={cancelEdit}>
                Cancel
              </button>
            ) : null}
          </div>
          <p className="form-note">
            Changes go live on the storefront immediately — products with 0 stock show as sold out.
          </p>
        </form>
      </div>

      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </div>
  );
}
