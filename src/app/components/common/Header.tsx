'use client';

import {UserRound} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

export default function Header (){

  const {data: session} = useSession();

  return (
    <nav className="flex items-center justify-between mt-8 w-full pb-2 border-b border-b-slate-400 ">
      <h1 className="text-2xl bold text-blue-800 cursor-pointer hover:text-blue-900 flex items-center gap-2">
        <Link href='/'>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Uptime Monitor
        </Link>
        </h1>
      <div>
        {session ? (
          <Avatar />
        )
        : (
          <Link href='/signin' className="btn btn-primary"> 
            Sign in
            <UserRound />
          </Link>
        )}
      </div>
    </nav>
  )
}