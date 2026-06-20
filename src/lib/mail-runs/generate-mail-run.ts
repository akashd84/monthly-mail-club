import { prisma } from "@/lib/db/prisma";
import { calculateRequiredItems, PlanSnapshot } from "./calculate-required-items";
import { logEvent } from "@/lib/audit/log-event";
export async function generateMailRun(input:{artistAccountId:string; clubId:string; name:string; month:string; actorUserId?:string}){
  const club = await prisma.club.findFirstOrThrow({ where:{id:input.clubId, artistAccountId:input.artistAccountId} });
  const subscribers = await prisma.subscriber.findMany({ where:{clubId:club.id,status:"ACTIVE"}, include:{ subscriptions:{where:{status:"ACTIVE"}, include:{clubPlan:{include:{planItems:{include:{clubItem:true}}}}}}, addresses:{orderBy:{updatedAt:"desc"},take:1} } });
  const snapshots:{subscriberId:string; subscriptionId:string; clubPlanId:string; planSnapshot:PlanSnapshot}[]=[];
  for(const subscriber of subscribers){for(const sub of subscriber.subscriptions){snapshots.push({subscriberId:subscriber.id,subscriptionId:sub.id,clubPlanId:sub.clubPlanId,planSnapshot:{planId:sub.clubPlan.id,planName:sub.clubPlan.name,items:sub.clubPlan.planItems.map(pi=>({itemId:pi.clubItem.id,name:pi.clubItem.name,quantity:pi.quantity}))}});}}
  const requiredItemCounts = calculateRequiredItems(snapshots.map(s=>s.planSnapshot));
  const mailRun = await prisma.mailRun.create({data:{clubId:club.id,name:input.name,month:input.month,status:"GENERATED",generatedAt:new Date(),requiredItemCounts,items:{create:snapshots.map(s=>({subscriberId:s.subscriberId,subscriptionId:s.subscriptionId,clubPlanId:s.clubPlanId,planSnapshot:s.planSnapshot}))}},include:{items:true}});
  await logEvent({artistAccountId:input.artistAccountId,actorUserId:input.actorUserId,action:"mail_run.generated",objectType:"mail_run",objectId:mailRun.id,metadata:{clubId:club.id,totalSubscribers:snapshots.length,requiredItemCounts}});
  return mailRun;
}
