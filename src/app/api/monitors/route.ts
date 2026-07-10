import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
  const session =  await getServerSession(authOptions);

  if(!session?.user?.id){
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }
}