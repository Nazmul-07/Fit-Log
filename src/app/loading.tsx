export default function Loading() {
  return (
    <output
      className="flex min-h-[65vh] flex-col items-center justify-center gap-4 text-center"
      aria-live="polite"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-lime-300" />
      <span className="text-xs font-bold uppercase tracking-widest text-lime-300">
        FitLog / Workout library
      </span>
      <p className="text-sm text-stone-400">Loading workouts…</p>
    </output>
  );
}
