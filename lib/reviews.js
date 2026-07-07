import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "reviews.json");

export async function getReviews() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}
