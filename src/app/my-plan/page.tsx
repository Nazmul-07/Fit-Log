
"use client";

import { useContext, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Flame,
  Clock,
  Dumbbell,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";
import { FitLogContext } from "@/context/Fit-LogContext";

type ActiveTab = "today" | "saved";

export default function MyPlanPage() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("MyPlanPage must be used inside FitLogProvider");
  }

  const {
    planCount,
    savedCount,
    setPlanCount,
    setSavedCount,
  } = context;

  const [activeTab, setActiveTab] = useState<ActiveTab>("today");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [completedWorkouts, setCompletedWorkouts] = useState<
    (string | number)[]
  >([]);

  const currentList = activeTab === "today" ? planCount : savedCount;

  // Sort workouts by duration
  const sortedList = useMemo(() => {
    return [...currentList].sort((a, b) =>
      sortOrder === "asc"
        ? a.duration - b.duration
        : b.duration - a.duration
    );
  }, [currentList, sortOrder]);

  // Calculate total duration
  const totalMinutes = currentList.reduce(
    (total, workout) => total + (Number(workout.duration) || 0),
    0
  );

  // Calculate total calories
  const totalCalories = currentList.reduce(
    (total, workout) =>
      total + (Number(workout.caloriesBurned) || 0),
    0
  );

  // Mark workout as done or undo completion
  const handleMarkAsDone = (id: string | number, name: string) => {
    const isCompleted = completedWorkouts.some(
      (workoutId) => String(workoutId) === String(id)
    );

    if (isCompleted) {
      setCompletedWorkouts((prev) =>
        prev.filter((workoutId) => String(workoutId) !== String(id))
      );

      toast.info(`${name} marked as incomplete.`);
    } else {
      setCompletedWorkouts((prev) => [...prev, id]);

      toast.success(`${name} completed successfully!`);
    }
  };

  // Remove workout from the current tab
  const handleRemove = (id: string | number, name: string) => {
    if (activeTab === "today") {
      setPlanCount(
        planCount.filter(
          (workout) => String(workout.id) !== String(id)
        )
      );

      setCompletedWorkouts((prev) =>
        prev.filter((workoutId) => String(workoutId) !== String(id))
      );
    } else {
      setSavedCount(
        savedCount.filter(
          (workout) => String(workout.id) !== String(id)
        )
      );
    }

    toast.success(`${name} removed successfully.`);
  };

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-6 text-white sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-black tracking-wider"
          >
            <span className="text-lime-400">⚡</span>
            FITLOG
          </Link>

          <nav className="flex items-center gap-5 text-sm sm:gap-7">
            <Link
              href="/#library"
              className="text-gray-400 transition hover:text-white"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="font-semibold text-lime-400"
            >
              My Plan
            </Link>
          </nav>
        </header>

        {/* Page Title */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-lime-400">
            YOUR FITNESS JOURNEY
          </p>

          <h1 className="text-3xl font-black tracking-wide sm:text-4xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
            Organize your workouts, track your progress, and stay consistent.
          </p>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Exercises
              </p>
              <Dumbbell className="text-lime-400" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold text-lime-400">
              {currentList.length}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {activeTab === "today" ? "Today's plan" : "Saved workouts"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Total Minutes
              </p>
              <Clock className="text-lime-400" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold">{totalMinutes}</p>

            <p className="mt-1 text-xs text-gray-500">
              Estimated workout time
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-[#1a1a1a] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Total Calories
              </p>
              <Flame className="text-lime-400" size={21} />
            </div>

            <p className="mt-3 text-3xl font-bold">{totalCalories}</p>

            <p className="mt-1 text-xs text-gray-500">
              Estimated calories burned
            </p>
          </div>
        </section>

        {/* Tabs and Sorting */}
        <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex w-fit gap-1 rounded-xl border border-white/5 bg-[#1a1a1a] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeTab === "today"
                  ? "bg-lime-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({planCount.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                activeTab === "saved"
                  ? "bg-lime-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({savedCount.length})
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              setSortOrder((previous) =>
                previous === "asc" ? "desc" : "asc"
              )
            }
            className="flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-sm text-gray-300 transition hover:border-lime-400 sm:self-auto"
          >
            <ArrowUpDown size={16} />
            Duration: {sortOrder === "asc" ? "Shortest first" : "Longest first"}
          </button>
        </section>

        {/* Workout List */}
        {sortedList.length === 0 ? (
          <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#161616] px-5 py-16 text-center sm:py-20">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lime-400/10">
              <Dumbbell size={30} className="text-lime-400" />
            </div>

            <h2 className="text-xl font-bold">
              {activeTab === "today"
                ? "NO WORKOUTS IN YOUR PLAN"
                : "NO SAVED WORKOUTS"}
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              {activeTab === "today"
                ? "Browse the workout library and add exercises to build your daily plan."
                : "Save workouts you like, and they will appear here for later."}
            </p>

            <Link
              href="/#library"
              className="mt-6 rounded-xl bg-lime-400 px-6 py-3 font-semibold text-black transition hover:bg-lime-300"
            >
              Explore Workouts
            </Link>
          </section>
        ) : (
          <section className="space-y-4">
            {sortedList.map((workout) => {
              const isCompleted = completedWorkouts.some(
                (id) => String(id) === String(workout.id)
              );

              return (
                <article
                  key={workout.id}
                  className={`flex flex-col gap-4 rounded-2xl border bg-[#181818] p-4 transition sm:flex-row sm:items-center sm:justify-between sm:p-5 ${
                    isCompleted
                      ? "border-green-500/30"
                      : "border-white/5 hover:border-lime-400/30"
                  }`}
                >
                  {/* Workout Information */}
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#252525] sm:h-24 sm:w-24">
                      {workout.image ? (
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-500">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2
                        className={`truncate text-base font-bold uppercase sm:text-lg ${
                          isCompleted ? "text-green-400" : "text-white"
                        }`}
                      >
                        {workout.name}
                      </h2>

                      <p className="mt-1 text-xs capitalize text-gray-400">
                        {workout.difficulty || "General"}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-lime-400" />
                          {workout.duration || 0} min
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Flame size={14} className="text-lime-400" />
                          {workout.caloriesBurned || 0} kcal
                        </span>
                      </div>

                      {isCompleted && (
                        <p className="mt-2 text-xs font-medium text-green-400">
                          Workout completed!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                    {activeTab === "today" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleMarkAsDone(workout.id, workout.name)
                        }
                        className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                          isCompleted
                            ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                            : "border-lime-400 bg-lime-400 text-black hover:bg-lime-300"
                        }`}
                      >
                        <CheckCircle2 size={16} />
                        {isCompleted ? "Completed" : "Mark as Done"}
                      </button>
                    )}

                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-xl border border-white/10 px-4 py-2.5 text-center text-xs font-semibold text-gray-300 transition hover:border-lime-400 hover:text-lime-400"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleRemove(workout.id, workout.name)}
                      aria-label={`Remove ${workout.name}`}
                      title="Remove workout"
                      className="flex items-center justify-center rounded-xl p-3 text-gray-400 transition hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
          Stay consistent. Every workout counts.
        </footer>
      </div>
    </main>
  );
}
