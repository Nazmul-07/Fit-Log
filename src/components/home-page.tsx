"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { WorkoutCard } from "@/components/workout-card";
import type { Workout } from "@/lib/workouts";

type SortField = "duration" | "caloriesBurned" | "rating";

const sortOptions: { value: SortField; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export function HomePage({ workouts }: { workouts: Workout[] }) {
  const [sortBy, setSortBy] = useState<SortField>("duration");
  const [query, setQuery] = useState("");

  const visibleWorkouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...workouts]
      .filter((workout) =>
        `${workout.name} ${workout.muscleGroups.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .sort((first, second) => first[sortBy] - second[sortBy]);
  }, [workouts, sortBy, query]);

  const featured = workouts[0];

  return (
    <>
      <section className="hero-section">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">Workout library</span>
            <h1 className="display-heading">
              Train with
              <br /> intent. Log
              <br /> every <span>set.</span>
            </h1>
            <p>
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>
            <a className="button button-primary hero-button" href="#library">
              Browse workouts <Icon name="arrow-right" size={15} />
            </a>
            <div className="hero-proof">
              <span className="hero-proof-line" />
              <span>12 ESSENTIAL LIFTS</span>
              <span className="hero-proof-dot">/</span>
              <span>ZERO GUESSWORK</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <Image
                src={featured.image}
                alt={`${featured.name} workout`}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 52vw"
                unoptimized
              />
              <div className="hero-image-shade" />
              <span className="hero-vertical-label">
                STRENGTH / FOCUS / REPEAT
              </span>
              <div className="hero-featured-card">
                <span className="hero-featured-label">START HERE · 01</span>
                <strong>{featured.name}</strong>
                <span>{featured.muscleGroups.join(" / ")}</span>
              </div>
              <span className="hero-image-index">FITLOG / 2026</span>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>BUILT</span>
              <Icon name="dumbbell" size={22} />
              <span>BY WORK</span>
            </div>
          </div>
        </div>
      </section>

      <section className="library-section" id="library">
        <div className="container">
          <div className="library-heading">
            <div>
              <span className="eyebrow">Find your next set</span>
              <h2 className="section-heading">The library</h2>
              <p className="section-copy">
                Twelve lifts covering every major muscle group.
              </p>
            </div>
            <span className="library-count">
              <strong>{String(visibleWorkouts.length).padStart(2, "0")}</strong>
              <span>EXERCISES</span>
            </span>
          </div>

          <div className="library-tools">
            <label className="search-field">
              <span className="visually-hidden">
                Search exercises or muscle groups
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search lifts or muscle groups..."
              />
            </label>
            <label className="sort-control">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortField)}
              >
                {sortOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="sort-chevron" aria-hidden="true">
                ⌄
              </span>
            </label>
          </div>

          <div className="workout-grid">
            {visibleWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
          {visibleWorkouts.length === 0 && (
            <div className="library-empty">
              <span className="eyebrow">No matches</span>
              <p>Try a different lift or muscle group.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
