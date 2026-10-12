import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FitLogProvider from "@/context/Fit-LogContext";
import Hero from "@/components/Hero";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

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
      <body className="min-h-screen bg-[#11120f] text-[#f4f3ed] antialiased">

        <FitLogProvider>
      <ToastContainer />
        <Navbar/>
        <main>{children}</main>
        <Footer></Footer>
        </FitLogProvider>
      </body>
    </html>
  );
}
