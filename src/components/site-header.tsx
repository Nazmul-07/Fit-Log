"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { usePlan } from "@/components/plan-provider";

export function SiteHeader() {
  const pathname = usePathname();
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

        <nav className="primary-nav" aria-label="Main navigation">
          <Link
            aria-current={pathname === "/" ? "page" : undefined}
            className={pathname === "/" ? "nav-link is-active" : "nav-link"}
            href="/#library"
          >
            Workout
          </Link>
          <Link
            aria-current={pathname === "/my-plan" ? "page" : undefined}
            className={
              pathname === "/my-plan" ? "nav-link is-active" : "nav-link"
            }
            href="/my-plan"
          >
            My Plan
          </Link>
        </nav>

        <nav className="header-badges" aria-label="Plan and saved lift counts">
          <Link className="count-badge count-badge-plan" href="/my-plan">
            Plan <span>{plan.length}</span>
          </Link>
          <Link
            className="count-badge count-badge-saved"
            href="/my-plan?tab=saved"
          >
            Saved <span>{saved.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
