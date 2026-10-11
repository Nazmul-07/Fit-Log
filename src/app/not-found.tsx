import Link from "next/link";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return (
    <section className="not-found-screen">
      <span className="eyebrow">Page not found</span>
      <h1 className="display-heading">
        404<span>.</span>
      </h1>
      <p>This page missed its mark. Let&apos;s get you back to the lifts.</p>
      <Link className="button button-primary" href="/">
        Go to workouts <Icon name="arrow-right" size={14} />
      </Link>
    </section>
  );
}
