import { auth } from "@/auth";
import { db } from "@/db/db";
import { monitor } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Summary from "../Summary";
import ManageMonitors from "../monitors/ManageMonitors";
import MonitorCardClient from "../monitors/MonitorCardClient";
import MonitorCard from "../monitors/MonitorCard";
import MonitorDetail from "../monitors/MonitorDetail";


export default async function Dashboard(){

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

  return (
    <>
      <Summary totalUp={monitors.length} />
      <ManageMonitors totalMonitors={monitors.length} />
      {monitors.length === 0 ? 
        <div className="wrapper">
          <p>No monitors yet.</p>
          <p>Add a URL above to start tracking uptime.</p>
        </div> : 
        monitors.map((m) => 
        <MonitorCardClient
          key={m.id}
          cardContent={
            <MonitorCard name={m.name} url={m.url}  />
          }
          modalContent={ <MonitorDetail monitor={m} onSaved={() => {}} /> }
        />
        )}
    </>
  )
}