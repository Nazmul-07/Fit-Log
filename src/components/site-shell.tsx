"use client";

import { PlanProvider, usePlan } from "@/components/plan-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { toast } = usePlan();

  return (
    <>
      <SiteHeader />
      <main className="site-main">{children}</main>
      <SiteFooter />
      <output
        className={`toast ${toast ? "toast-visible" : ""}`}
        aria-live="polite"
      >
        <span className="toast-dot" />
        {toast}
      </output>
    </>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <PlanProvider>
      <ShellContent>{children}</ShellContent>
    </PlanProvider>
  );
}
