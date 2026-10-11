"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icon";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("FitLog encountered a page error.", error);
  }, [error]);

  return (
    <section className="error-screen">
      <span className="eyebrow">Something went wrong</span>
      <h1 className="section-heading">Couldn&apos;t load this page.</h1>
      <p>Check your connection and try again.</p>
      <button className="button button-primary" type="button" onClick={reset}>
        Try again <Icon name="arrow-right" size={14} />
      </button>
    </section>
  );
}
