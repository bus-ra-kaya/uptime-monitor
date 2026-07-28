import { NextResponse } from "next/server";


export function withErrorHandling<Args extends unknown[]>(handler: (...args: Args) => Promise<NextResponse>) {
  return async (...args: Args) => {
    try {
      return await handler (...args);
    } catch (err) {
      console.warn(err);
      return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
  };
}