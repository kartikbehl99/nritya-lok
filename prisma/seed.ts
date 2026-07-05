import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const id = `seed_admin_${Date.now()}`;

  await sql`INSERT INTO "User" (id, username, password, "createdAt")
    VALUES (${id}, ${adminUsername}, ${hashedPassword}, NOW())
    ON CONFLICT (username) DO NOTHING`;

  console.log(`Seeded admin user (username: ${adminUsername}, password: ${process.env.ADMIN_PASSWORD!})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
