import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/products";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.name || String(body.name).trim() === "") {
    return NextResponse.json({ error: "Product name is required" }, { status: 400 });
  }
  const product = await createProduct(body);
  return NextResponse.json(product, { status: 201 });
}
