import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { authAuthOption } from "./api/auth/[...nextauth]/route";
import { useId } from "react";

export default async function Home() {
  useId;
  const session = await getServerSession(authAuthOption);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!session ? <Link href="/api/auth/signin">Sign in</Link> : null}
      {!!session && (
        <div className="flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={session.user?.image!}
            alt={session.user?.name!}
            className="h-8 w-8 rounded-full"
          />
          <h2 className="text-lg font-bold">{session.user?.name}</h2>
          <p>{session.user?.email}</p>
        </div>
      )}
    </main>
  );
}
