import { prisma } from "@/lib/db/prisma";
export async function getCurrentArtist() {
  const email = process.env.DEV_ARTIST_EMAIL ?? "artist@example.com";
  const user = await prisma.user.upsert({ where: { email }, update: {}, create: { email, name: "Demo Artist" } });
  return prisma.artistAccount.upsert({ where: { publicSlug: "demo-artist" }, update: {}, create: { userId: user.id, displayName: "Demo Artist", publicSlug: "demo-artist" } });
}
