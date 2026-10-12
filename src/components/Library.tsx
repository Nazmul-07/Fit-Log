

import { Workout } from "@/app/types/workout.data";
import WorkoutCard from "./workoutCard";


async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/fitlog",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="bg-[#101110] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
              FIND YOUR NEXT CHALLENGE
            </p>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              THE <span className="text-[#ccff00]">LIBRARY</span>
            </h2>

            <p className="mt-3 text-sm text-gray-400 sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-500">
            {workouts.length} EXERCISES
          </p>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;
