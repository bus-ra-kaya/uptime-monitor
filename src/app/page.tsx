
import { ActivityIcon, ArrowRight} from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import RecentSummary from "./components/Summary";
import MonitorsList from "./components/MonitorsList";
import ManageMonitors from "./components/ManageMonitors";

export default async function Home() {

  const session = await auth();

  return (
    <>
      {session ? (
        <>
        <RecentSummary />
        <ManageMonitors />
        <MonitorsList />
        </>
      ): (
        <div className="flex p-2">
           <ActivityIcon size='100' color='green' />
          <div className="flex flex-col items-center">
            <h2 className="text-4xl mb-2">Know the second something goes down</h2>
            <p className="text-lg mb-8 max-w-140">Uptime monitor checks your endpoints every minute and alerts you before your customers notice.</p>

            <button className="btn btn-primary">
              <Link href='/signin'>Start monitoring </Link>
              <ArrowRight />
            </button>
          </div>
        </div>
      )} 
    </>
  );
}
