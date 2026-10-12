"use client";

import Link from "next/link";
import { Home, Dumbbell, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#121212] px-6 py-16 text-white">
      <div className="w-full max-w-xl text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10">
            <Dumbbell size={38} className="text-lime-400" />
          </div>
        </div>

        <h1 className="text-7xl font-black tracking-tight text-lime-400 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
          Workout Not Found!
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
          Oops! The page you are looking for does not exist or may have been
          moved. Let's get you back on track!
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-3 font-semibold text-black transition hover:bg-lime-300"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="//#library"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold transition hover:border-lime-400 hover:text-lime-400"
          >
            <ArrowLeft size={18} />
            Explore Workouts
          </Link>
        </div>

        <p className="mt-10 text-xs tracking-widest text-gray-600">
          FITLOG — KEEP MOVING, KEEP IMPROVING
        </p>
      </div>
    </div>
  );
};

export default NotFound;