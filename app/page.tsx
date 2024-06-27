"use client";

import { useGetAllUserQuery } from "@/redux/features/auth/authApi";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useGetAllUserQuery({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 my-28">
      <h1>hii</h1>
    </main>
  );
}
