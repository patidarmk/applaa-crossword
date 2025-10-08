import React from "react";
import { Header } from "./Header";
import { MadeWithApplaa } from "./made-with-applaa";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <MadeWithApplaa />
    </div>
  );
}