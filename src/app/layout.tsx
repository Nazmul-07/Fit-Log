import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FitLog — Train with intent",
    template: "%s — FitLog",
  },
  description:
    "Pick a lift, lock it into today's plan, and watch the week's work add up with FitLog's focused workout library.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
