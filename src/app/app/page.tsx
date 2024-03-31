"use client";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  return <pre>{JSON.stringify(session?.user, null, 1)}</pre>;
};

export default page;
