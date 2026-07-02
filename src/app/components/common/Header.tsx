'use client';

import {Circle, UserRound} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

export default function Header (){

  const {data: session} = useSession();

  return (
    <nav className="flex items-center justify-between mt-8 w-full pb-2 border-b border-b-border-color ">
      <h1 className="text-3xl bold text-primary cursor-pointer hover:text-secondary flex items-center gap-2">
        <Link href='/' className="flex items-center gap-1">
          <Circle size='16' color="green" fill="green"/>
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