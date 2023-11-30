import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import db from "@/db";

export const authAuthOption: NextAuthOptions = {
  adapter: MongoDBAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(authAuthOption);

export { handler as GET, handler as POST };
