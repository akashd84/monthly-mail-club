"use server";
import { revalidatePath } from "next/cache";import { redirect } from "next/navigation";import { z } from "zod";import { getCurrentArtist } from "@/lib/auth/session";import { prisma } from "@/lib/db/prisma";
const schema=z.object({name:z.string().min(1),description:z.string().optional()});
export async function createClub(formData:FormData){const artist=await getCurrentArtist(); const data=schema.parse(Object.fromEntries(formData)); const club=await prisma.club.create({data:{artistAccountId:artist.id,...data}}); revalidatePath("/clubs"); redirect(`/clubs/${club.id}`);}
export async function updateClub(clubId:string,formData:FormData){const artist=await getCurrentArtist(); const data=schema.parse(Object.fromEntries(formData)); await prisma.club.updateMany({where:{id:clubId,artistAccountId:artist.id},data}); revalidatePath(`/clubs/${clubId}`);}
export async function archiveClub(clubId:string){const artist=await getCurrentArtist(); await prisma.club.updateMany({where:{id:clubId,artistAccountId:artist.id},data:{status:"ARCHIVED"}}); revalidatePath("/clubs");}
