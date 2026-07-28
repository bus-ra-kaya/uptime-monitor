import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "../../../db/db";
import { monitor } from "../../../db/schema";
import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { createMonitorSchema } from "@/lib/monitor";
import { withErrorHandling } from "@/lib/withErrorHandling";

export const POST = withErrorHandling(async(req: NextRequest) => {

  const session = await auth();

  if(!session?.user.id) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const body = await req.json();
  const parsed = createMonitorSchema.safeParse(body);

  if(!parsed.success) {
    return NextResponse.json({fieldErrors: z.flattenError(parsed.error)}, {status: 400});
  };

  const [newMonitor] = await db
    .insert(monitor)
    .values({
      ...parsed.data,
      userId: session.user.id,
    })
    .returning();

  console.log('Success!');
  return NextResponse.json(newMonitor, {status: 201});
});

export const GET = withErrorHandling(async () => {
  const session = await auth();

  if(!session?.user.id) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const monitors = await db
    .select()
    .from(monitor)
    .where(eq(monitor.userId, session.user.id))
    .orderBy(desc(monitor.createdAt));

  return NextResponse.json(monitors, {status: 200});

});