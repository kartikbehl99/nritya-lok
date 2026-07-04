import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const client = createClient({ url: `file:${dbPath}` });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const id = `seed_admin_${Date.now()}`;

  await client.execute({
    sql: `INSERT OR IGNORE INTO User (id, username, password, createdAt) VALUES (?, ?, ?, datetime('now'))`,
    args: [id, "admin", hashedPassword],
  });

  console.log("Seeded admin user (username: admin, password: admin123)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
