'use client';

import { ActivityIcon, ArrowRight } from "lucide-react";
import EndpointList from "./components/EndpointList";
import RecentSummary from "./components/Summary";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {

  const {data: session, status} = useSession();

  if(status === 'loading') return ( <p>Loading...</p>);

  return (

    <>

      {session ? (
        <>
          <RecentSummary />
          <EndpointList />
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
