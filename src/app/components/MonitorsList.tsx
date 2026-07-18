import { auth } from "@/auth";
import { db } from "@/db/db";
import { monitor } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import MonitorCard from "./MonitorCard";

export default async function MonitorsList() {
  const session = await auth();

  if(!session?.user.id) {
    return (
      <div className='wrapper'>
        You need to be signed in to view monitors.
      </div>
    );
  }

  const monitors = await db
    .select()
    .from(monitor)
    .where(eq(monitor.userId, session.user.id))
    .orderBy(desc(monitor.createdAt));

  if(monitors.length === 0){
    return (
      <div className="wrapper">
        <p>No monitors yet.</p>
        <p>Add a URL above to start tracking uptime.</p>
      </div>
    )
  }

  return (
    <div>
      {monitors.map((m) => (
        <MonitorCard key={m.id} name={m.name} url={m.url}  />
      ))}
    </div>
  )

}