import Link from "next/link";
import { Icon } from "@/components/icon";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" href="/" aria-label="FitLog home">
          <span className="brand-mark">
            <Icon name="dumbbell" size={18} />
          </span>
          <span>
            FIT<span>LOG</span>
          </span>
        </Link>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
