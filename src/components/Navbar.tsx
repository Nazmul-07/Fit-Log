"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useContext, useState } from "react";

import logo from "@/Assets/logo.png";
import { FitLogContext } from "@/context/Fit-LogContext";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(FitLogContext);

  if(!context){
    return null;
  }

  const {planCount, savedCount} = context;

  const links = [
    { name: "Workouts", href: "/" },
    { name: "My Plan", href: "/my-plan" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#101110]/95 text-white backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl">
            <Image
              src={logo}
              alt="FitLog logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>

          <span className="text-xl font-black tracking-tight sm:text-2xl">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Status Badges */}
        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#ccff00] px-3 py-2 text-sm font-bold text-black transition hover:bg-[#b9e600] sm:px-4"
          >
            <Dumbbell size={16} />
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/10 px-1 text-xs">
              {planCount.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-[#ccff00] sm:px-4"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1 text-xs">
              {savedCount.length}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 transition hover:bg-white/10 sm:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#101110] px-4 py-4 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "bg-[#ccff00] text-black"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-3 py-3 text-sm font-bold text-black"
              >
                Plan <span>({planCount.length})</span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-3 py-3 text-sm font-semibold"
              >
                Saved <span>({savedCount.length})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
