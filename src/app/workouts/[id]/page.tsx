
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/app/types/workout.data";
import WorkoutActions from "@/components/WorkoutActions";

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

const WorkoutDetailsPage = async ({
  params,
}: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const data = await res.json();
  const workouts: Workout[] = data;

  const workout = workouts.find((item) => String(item.id) === id);

  if (!workout) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-3xl font-bold">Workout Not Found</h1>

        <p className="text-gray-500">
          Sorry, we couldn&apos;t find this workout.
        </p>

        <Link
          href="/"
          className="rounded-lg bg-lime-400 px-5 py-3 font-semibold text-black transition hover:bg-lime-300"
        >
          Back to Workouts
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-gray-400 transition hover:text-lime-400"
        >
          <ArrowLeft size={18} />
          Back to Workouts
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Workout Image */}
          <div className="relative min-h-75 overflow-hidden rounded-2xl bg-[#171717] sm:min-h-112.5">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Workout Information */}
          <div className="flex flex-col">
            <span className="mb-3 w-fit rounded-full bg-lime-400/10 px-4 py-2 text-sm font-medium text-lime-400">
              {workout.difficulty}
            </span>

            <h1 className="text-3xl font-bold sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-4 leading-7 text-gray-400">
              {workout.description}
            </p>

            {/* Workout Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-[#171717] p-4">
                <Clock className="mb-2 text-lime-400" size={22} />
                <p className="text-sm text-gray-400">Duration</p>
                <p className="mt-1 font-semibold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl bg-[#171717] p-4">
                <Flame className="mb-2 text-lime-400" size={22} />
                <p className="text-sm text-gray-400">Calories</p>
                <p className="mt-1 font-semibold">
                  {workout.caloriesBurned} kcal
                </p>
              </div>

              <div className="rounded-xl bg-[#171717] p-4">
                <Star className="mb-2 text-lime-400" size={22} />
                <p className="text-sm text-gray-400">Rating</p>
                <p className="mt-1 font-semibold">
                  {workout.rating}/5
                </p>
              </div>
            </div>

            {/* Workout Details */}
            <div className="mt-8 space-y-5">
              <div>
                <h2 className="mb-2 text-lg font-semibold">
                  Muscle Groups
                </h2>

                <div className="flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#202020] px-3 py-2 text-sm text-gray-300"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-2 text-lg font-semibold">Equipment</h2>
                <p className="text-gray-400">{workout.equipment}</p>
              </div>

              <div>
                <h2 className="mb-2 text-lg font-semibold">
                  Sets & Reps
                </h2>
                <p className="text-gray-400">
                  {workout.sets} sets × {workout.reps} reps
                </p>
              </div>

              <div>
                <h2 className="mb-3 text-lg font-semibold">
                  Instructions
                </h2>

                <ol className="space-y-3">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 leading-6 text-gray-400"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime-400/10 text-sm font-semibold text-lime-400">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Client-side Actions */}
            <div className="mt-8">
              <WorkoutActions workout={workout} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WorkoutDetailsPage;
