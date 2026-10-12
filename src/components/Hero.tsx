import Image from "next/image";
import Link from "next/link";

import Banner from "@/Assets/banner (1).png";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#101110] text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#ccff00] sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
            WORKOUT LIBRARY
          </p>

          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Train With Intent.
            <span className="mt-2 block text-[#ccff00]">
              Log Every Set.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              href="/#library"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#ccff00] px-6 py-4 text-sm font-black tracking-wide text-black transition duration-300 hover:-translate-y-1 hover:bg-[#b9e600] sm:w-fit"
            >
              BROWSE WORKOUTS
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </Link>

            <div className="flex items-center gap-3 px-1 text-sm text-gray-400">
              <span className="h-2 w-2 rounded-full bg-[#ccff00]" />
              Build your plan. Track your progress.
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="absolute inset-8 rounded-full bg-[#ccff00]/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#191b18] p-2 shadow-2xl sm:rounded-3xl sm:p-3">
            <Image
              src={Banner}
              alt="Workout training illustration"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-64 w-full rounded-xl object-contain sm:h-80 lg:h-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;