'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Page (){

  return (
    <div className="flex-col flex gap-2">
      <button className="btn btn-primary" onClick={() => signIn('github', {callbackUrl:'/'})}>
        <div>
          <Image src='/github.svg' alt='github icon' width='25' height='25'/>
        </div> 
        Continue with Github
      </button>
      <button className="btn btn-primary">
        <div>
          <Image src='/google.svg' alt='google icon' width='25' height='25' />
        </div> 
        Continue with Google</button>
      <button className="btn btn-primary">
         <div>
           <Image src='/linkedin.svg' alt='linkedin icon' width='25' height='25'/> 
        </div>
        Continue with Linkedin
      </button>
    </div>
  )
}