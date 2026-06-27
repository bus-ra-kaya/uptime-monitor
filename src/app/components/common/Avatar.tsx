'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import LogoutButton from "./LogOutBtn";

export default function Avatar(){

  const {data: session, status} = useSession();

  if (status === "loading") {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />;
  }

  if(!session){
    return null;
  }

  const userImage = session.user?.image;
  const userName = session.user?.name || 'User';

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 cursor-pointer">
        {userImage ? (
          <Image
            src={userImage}
            alt={`${userName}'s avatar`}
            width={60}
            height={60}
            className="rounded-full object-cover border-3 border-blue-900"
            referrerPolicy="no-referrer" 
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="absolute flex-col flex items-center gap-2 bg-slate-800 p-2 left-1/2 -translate-x-1/2  mt-2 rounded-lg min-w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <span className="text-slate-200">{userName}</span>
        <LogoutButton />
      </div>
    </div>
    
  )
}