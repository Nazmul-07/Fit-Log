"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { usePlan } from "@/components/plan-provider";
import type { Workout } from "@/lib/workouts";

export function WorkoutDetails({ workout }: { workout: Workout }) {
  const { plan, saved, completed, addToPlan, saveForLater } = usePlan();
  const isPlanned = plan.includes(workout.id);
  const isSaved = saved.includes(workout.id);
  const isPlanFull = plan.filter((id) => !completed.includes(id)).length >= 5;

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating.toFixed(1)],
  ];

  return (
    <section className="detail-section">
      <div className="container">
        <Link className="detail-back" href="/#library">
          <Icon name="arrow-right" size={13} /> Back to the library
        </Link>
        <div className="detail-layout">
          <div className="detail-visual">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
              unoptimized
            />
            <div className="detail-image-shade" />
            <span className="detail-image-index">
              FITLOG / {String(workout.id).padStart(2, "0")}
            </span>
            <div className="detail-image-caption">
              <span>FOCUS / {workout.difficulty.toUpperCase()}</span>
              <strong>{workout.muscleGroups.join(" · ")}</strong>
            </div>
            <span className="detail-image-number">
              {String(workout.id).padStart(2, "0")}
            </span>
          </div>

          <div className="detail-content">
            <span className="eyebrow">Workout / {workout.difficulty}</span>
            <h1 className="display-heading detail-title">{workout.name}</h1>
            <p className="detail-description">{workout.description}</p>
            <div className="tag-list detail-tags">
              {workout.muscleGroups.map((group) => (
                <span className="tag" key={group}>
                  {group}
                </span>
              ))}
            </div>

            <section className="specs-section" aria-labelledby="specs-heading">
              <div className="detail-section-heading">
                <h2 id="specs-heading">Key specs</h2>
                <span>01 — 07</span>
              </div>
              <dl className="specs-grid">
                {specs.map(([label, value]) => (
                  <div className="spec-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section
              className="instructions-section"
              aria-labelledby="instructions-heading"
            >
              <div className="detail-section-heading">
                <h2 id="instructions-heading">Instructions</h2>
                <span>
                  {String(workout.instructions.length).padStart(2, "0")} STEPS
                </span>
              </div>
              <ol className="instruction-list">
                {workout.instructions.map((instruction, index) => (
                  <li key={instruction}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
            </section>

            <div className="detail-actions">
              <button
                className="button button-primary"
                onClick={() => addToPlan(workout.id)}
                disabled={isPlanned || isPlanFull}
                type="button"
              >
                <Icon name={isPlanned ? "check" : "plus"} size={15} />
                {isPlanned
                  ? "In today's plan"
                  : isPlanFull
                    ? "Today's plan is full"
                    : "Add to today's plan"}
              </button>
              <button
                className="button button-secondary"
                onClick={() => saveForLater(workout.id)}
                disabled={isSaved}
                type="button"
              >
                <Icon name="bookmark" size={15} />
                {isSaved ? "Saved for later" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
