export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

const WORKOUTS_API_URL = "https://openapi.programming-hero.com/api/fitlog";

function isWorkout(value: unknown): value is Workout {
  if (typeof value !== "object" || value === null) return false;

  const workout = value as Record<string, unknown>;

  return (
    typeof workout.id === "number" &&
    typeof workout.name === "string" &&
    typeof workout.image === "string" &&
    Array.isArray(workout.muscleGroups) &&
    workout.muscleGroups.every((group) => typeof group === "string") &&
    typeof workout.equipment === "string" &&
    typeof workout.difficulty === "string" &&
    typeof workout.duration === "number" &&
    typeof workout.caloriesBurned === "number" &&
    typeof workout.sets === "number" &&
    typeof workout.reps === "string" &&
    typeof workout.rating === "number" &&
    typeof workout.description === "string" &&
    Array.isArray(workout.instructions) &&
    workout.instructions.every((instruction) => typeof instruction === "string")
  );
}

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(WORKOUTS_API_URL, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(`Workout API request failed with status ${response.status}.`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || !data.every(isWorkout)) {
    throw new Error("Workout API returned data in an unexpected format.");
  }

  return data;
}

export async function getWorkoutById(id: number): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  return workouts.find((workout) => workout.id === id);
}
