import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const id = `seed_admin_${Date.now()}`;

  await sql`INSERT INTO "User" (id, username, password, "createdAt") 
    VALUES (${id}, 'admin', ${hashedPassword}, NOW()) 
    ON CONFLICT (username) DO NOTHING`;

  console.log("Seeded admin user (username: admin, password: admin123)");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
