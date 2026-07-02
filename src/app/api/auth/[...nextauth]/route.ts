import { db } from '@/db/db';
import { user as userTable} from '@/db/schema';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    })
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 5 * 60},
  events: {
    async createUser({ user: newUser }){

      try {
        await db
        .update(userTable)
        .set({role: 'user'})
        .where(eq(userTable.id, newUser.id));
      } catch (err) {
        console.error('Failed to set default role for user', newUser.id, err);
      }
    }
  }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};