"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { usePlan } from "@/components/plan-provider";
import { WorkoutStats } from "@/components/workout-stats";
import type { Workout } from "@/lib/workouts";

type PlanTab = "plan" | "saved";
type SortField = "duration" | "caloriesBurned" | "rating";

const sortLabels: Record<SortField, string> = {
  duration: "Duration",
  caloriesBurned: "Calories",
  rating: "Rating",
};

export function MyPlanPage({ workouts }: { workouts: Workout[] }) {
  const [activeTab, setActiveTab] = useState<PlanTab>("plan");
  const [sortBy, setSortBy] = useState<SortField>("duration");
  const [query, setQuery] = useState("");
  const {
    plan,
    saved,
    completed,
    hydrated,
    addToPlan,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const workoutsById = useMemo(
    () => new Map(workouts.map((workout) => [workout.id, workout])),
    [workouts],
  );
  const plannedWorkouts = plan
    .map((id) => workoutsById.get(id))
    .filter((workout): workout is Workout => workout !== undefined);
  const totals = plannedWorkouts.reduce(
    (result, workout) => ({
      exercises: result.exercises + 1,
      minutes: result.minutes + workout.duration,
      calories: result.calories + workout.caloriesBurned,
    }),
    { exercises: 0, minutes: 0, calories: 0 },
  );

  const entries = useMemo(() => {
    const ids = activeTab === "plan" ? plan : saved;
    const normalizedQuery = query.trim().toLowerCase();
    return ids
      .map((id) => workoutsById.get(id))
      .filter((workout): workout is Workout => workout !== undefined)
      .filter((workout) =>
        `${workout.name} ${workout.muscleGroups.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .sort((first, second) => first[sortBy] - second[sortBy]);
  }, [activeTab, plan, saved, workoutsById, query, sortBy]);

  const activePlanCount = plan.filter((id) => !completed.includes(id)).length;

  return (
    <section className="plan-section">
      <div className="container">
        <div className="plan-heading">
          <div>
            <span className="eyebrow">Your training log</span>
            <h1 className="section-heading">My plan</h1>
            <p className="section-copy">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>
          <div className="plan-cap">
            <span>ACTIVE LIFTS</span>
            <strong>
              {String(activePlanCount).padStart(2, "0")}
              <i> / 05</i>
            </strong>
          </div>
        </div>

        <section className="metrics-grid" aria-label="Today's plan summary">
          <article className="metric-card">
            <span className="metric-icon">
              <Icon name="dumbbell" size={17} />
            </span>
            <span className="metric-label">Exercises</span>
            <strong>
              {totals.exercises}
              <small>{totals.exercises === 1 ? " lift" : " lifts"}</small>
            </strong>
          </article>
          <article className="metric-card">
            <span className="metric-icon">
              <Icon name="clock" size={17} />
            </span>
            <span className="metric-label">Minutes</span>
            <strong>
              {totals.minutes}
              <small> min</small>
            </strong>
          </article>
          <article className="metric-card">
            <span className="metric-icon">
              <Icon name="flame" size={17} />
            </span>
            <span className="metric-label">Calories</span>
            <strong>
              {totals.calories}
              <small> kcal</small>
            </strong>
          </article>
        </section>

        <div className="plan-toolbar">
          <div
            className="plan-tabs"
            role="tablist"
            aria-label="Workout collections"
          >
            <button
              id="tab-plan"
              className={
                activeTab === "plan" ? "plan-tab is-active" : "plan-tab"
              }
              type="button"
              role="tab"
              aria-selected={activeTab === "plan"}
              aria-controls="plan-list"
              onClick={() => setActiveTab("plan")}
            >
              Today&apos;s Plan <span>{plan.length}</span>
            </button>
            <button
              id="tab-saved"
              className={
                activeTab === "saved" ? "plan-tab is-active" : "plan-tab"
              }
              type="button"
              role="tab"
              aria-selected={activeTab === "saved"}
              aria-controls="plan-list"
              onClick={() => setActiveTab("saved")}
            >
              Saved <span>{saved.length}</span>
            </button>
          </div>
          <div className="plan-filters">
            <label className="plan-search">
              <span className="visually-hidden">
                Search workouts in this tab
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
              />
            </label>
            <label className="sort-control plan-sort">
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortField)}
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option value={value} key={value}>
                    {label}
                  </option>
                ))}
              </select>
              <span className="sort-chevron" aria-hidden="true">
                ⌄
              </span>
            </label>
          </div>
        </div>

        {!hydrated ? (
          <output className="plan-loading">
            <span className="loading-spinner" />
            <span>Loading workouts…</span>
          </output>
        ) : entries.length > 0 ? (
          <div
            className="plan-list"
            id="plan-list"
            role="tabpanel"
            aria-labelledby={activeTab === "plan" ? "tab-plan" : "tab-saved"}
          >
            {entries.map((workout) => {
              const isCompleted = completed.includes(workout.id);
              const isPlanned = plan.includes(workout.id);
              const isPlanFull = activePlanCount >= 5;

              return (
                <article
                  className={`plan-card ${activeTab === "plan" && isCompleted ? "is-completed" : ""}`}
                  key={workout.id}
                >
                  <Link
                    className="plan-card-image"
                    href={`/workouts/${workout.id}`}
                    aria-label={`View ${workout.name}`}
                  >
                    <Image
                      src={workout.image}
                      alt=""
                      fill
                      sizes="96px"
                      unoptimized
                    />
                  </Link>
                  <div className="plan-card-content">
                    <div className="plan-card-title-row">
                      <div>
                        <div className="tag-list plan-card-tags">
                          {workout.muscleGroups.map((group) => (
                            <span className="tag" key={group}>
                              {group}
                            </span>
                          ))}
                        </div>
                        <h2>{workout.name}</h2>
                      </div>
                      {activeTab === "plan" && isCompleted && (
                        <span className="done-label">
                          <Icon name="check" size={12} /> Done
                        </span>
                      )}
                    </div>
                    <p className="card-equipment">
                      <Icon name="dumbbell" size={13} /> {workout.equipment}
                    </p>
                    <WorkoutStats
                      duration={workout.duration}
                      calories={workout.caloriesBurned}
                      rating={workout.rating}
                    />
                  </div>
                  <div className="plan-card-actions">
                    <Link
                      className="plan-detail-link"
                      href={`/workouts/${workout.id}`}
                    >
                      View details <Icon name="arrow-right" size={13} />
                    </Link>
                    {activeTab === "plan" ? (
                      <button
                        className={`button plan-done-button ${isCompleted ? "is-done" : "button-secondary"}`}
                        type="button"
                        onClick={() => markAsDone(workout.id)}
                        disabled={isCompleted}
                      >
                        <Icon name="check" size={14} />
                        {isCompleted ? "Done" : "Mark as done"}
                      </button>
                    ) : (
                      <button
                        className="button button-secondary plan-done-button"
                        type="button"
                        onClick={() => addToPlan(workout.id)}
                        disabled={isPlanned || isPlanFull}
                      >
                        <Icon name={isPlanned ? "check" : "plus"} size={14} />
                        {isPlanned ? "In today's plan" : "Add to plan"}
                      </button>
                    )}
                    <button
                      className="remove-button"
                      type="button"
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      aria-label={`Remove ${workout.name} from ${activeTab === "plan" ? "today's plan" : "saved"}`}
                    >
                      <Icon name="x" size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className="plan-empty"
            id="plan-list"
            role="tabpanel"
            aria-labelledby={activeTab === "plan" ? "tab-plan" : "tab-saved"}
          >
            <span className="empty-symbol">
              <Icon
                name={activeTab === "plan" ? "dumbbell" : "bookmark"}
                size={21}
              />
            </span>
            <span className="eyebrow">Nothing here yet</span>
            <h2>{query ? "NO MATCHES FOUND" : "NOTHING HERE YET"}</h2>
            <p>
              {query
                ? "Try a different lift or muscle group."
                : activeTab === "plan"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save a lift from the library and it will be waiting here."}
            </p>
            {!query && (
              <Link className="button button-primary" href="/#library">
                Go to workouts <Icon name="arrow-right" size={14} />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
