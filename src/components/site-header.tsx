"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { Icon } from "@/components/icon";
import { usePlan } from "@/components/plan-provider";

function PrimaryNavigation() {
  const pathname = usePathname();
  const workoutActive = pathname === "/" || pathname.startsWith("/workouts/");

  return (
    <nav className="primary-nav" aria-label="Main navigation">
      <Link
        aria-current={workoutActive ? "page" : undefined}
        className={workoutActive ? "nav-link is-active" : "nav-link"}
        href="/#library"
      >
        Workout
      </Link>
      <Link
        aria-current={pathname === "/my-plan" ? "page" : undefined}
        className={pathname === "/my-plan" ? "nav-link is-active" : "nav-link"}
        href="/my-plan"
      >
        My Plan
      </Link>
    </nav>
  );
}

function NavigationFallback() {
  return (
    <nav className="primary-nav" aria-label="Main navigation">
      <Link className="nav-link" href="/#library">
        Workout
      </Link>
      <Link className="nav-link" href="/my-plan">
        My Plan
      </Link>
    </nav>
  );
}

export function SiteHeader() {
  const { plan, saved } = usePlan();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="FitLog home">
          <span className="brand-mark">
            <Icon name="dumbbell" size={18} />
          </span>
          <span>
            FIT<span>LOG</span>
          </span>
        </Link>

        <Suspense fallback={<NavigationFallback />}>
          <PrimaryNavigation />
        </Suspense>

        <nav className="header-badges" aria-label="Plan and saved lift counts">
          <Link className="count-badge count-badge-plan" href="/my-plan">
            Plan <span>{plan.length}</span>
          </Link>
          <Link className="count-badge count-badge-saved" href="/my-plan">
            Saved <span>{saved.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
