import { cookies } from "next/headers";

// Server-side: read the visitor's language choice (set by the header toggle).
export async function getLang() {
  const store = await cookies();
  return store.get("lang")?.value === "ta" ? "ta" : "en";
}
