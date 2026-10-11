export default function Loading() {
  return (
    <output className="loading-screen" aria-live="polite">
      <span className="loading-spinner" />
      <span className="eyebrow">FitLog / Workout library</span>
      <p>Loading workouts…</p>
    </output>
  );
}
