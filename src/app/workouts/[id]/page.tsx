import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkoutDetails } from "@/components/workout-details";
import { getWorkoutById } from "@/lib/workouts";

type WorkoutPageProps = PageProps<"/workouts/[id]">;

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(Number(id));
  return workout ? { title: workout.name } : { title: "Workout not found" };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workoutId = Number(id);

  if (!Number.isSafeInteger(workoutId) || workoutId < 1) notFound();

  const workout = await getWorkoutById(workoutId);
  if (!workout) notFound();

  return <WorkoutDetails workout={workout} />;
}
