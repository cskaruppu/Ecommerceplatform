import { NextResponse } from "next/server";
import { getProduct, updateProduct, deleteProduct } from "@/lib/products";

export async function GET(request, { params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const product = await updateProduct(id, body);
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const ok = await deleteProduct(id);
  if (!ok) return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({ deleted: id });
}
