import { auth } from "@/auth";
import { db } from "@/db/db";
import { monitor } from "@/db/schema";
import { z } from "zod";
import { createMonitorSchema } from "@/lib/monitor";
import { withErrorHandling } from "@/lib/withErrorHandling";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = withErrorHandling(async (req: NextRequest, {params}: {params: Promise<{id: string}>}) =>{

  const session = await auth();

  if(!session?.user.id) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401})
  }

  const {id: monitorId} = await params;

  const body = await req.json();
  console.log(body);

  const parsed = createMonitorSchema.safeParse(body);

  if(!parsed.success) {
    return NextResponse.json({fieldErrors: z.flattenError(parsed.error)}, {status: 400});
  };

  const updated = await db
    .update(monitor)
    .set({
      ...parsed.data,
      updatedAt: new Date(),
    })
    .where(and(eq(monitor.id, monitorId), eq(monitor.userId, session.user.id)))
    .returning();

  const [updatedMonitor] = updated;

  if(updated.length === 0) {
    return NextResponse.json({error: 'Monitor not found'}, {status: 404});
  }

  return NextResponse.json({
    message: `Monitor ${monitorId} updated successfully`,
    data: updatedMonitor
  })
})