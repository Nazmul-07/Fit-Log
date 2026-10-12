'use client'

import Link from "next/link";
import { Code2, Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#121212] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Footer Main */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-black tracking-wider"
            >
              <span className="text-lime-400">⚡</span>
              FITLOG
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Build healthy habits, track your workouts, and stay
              consistent on your fitness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-lime-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/workouts"
                  className="transition hover:text-lime-400"
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  className="transition hover:text-lime-400"
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-semibold">Stay Connected</h3>

            <p className="mb-4 text-sm leading-6 text-gray-400">
              Keep moving, keep improving, and make every workout count.
            </p>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
            >
              <Code2 size={19} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FitLog. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs text-gray-400 transition hover:text-lime-400"
          >
            Back to top
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
