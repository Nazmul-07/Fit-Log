import { HomePage } from "@/components/home-page";
import { getWorkouts } from "@/lib/workouts";

export default async function Home() {
  const workouts = await getWorkouts();
  return <HomePage workouts={workouts} />;
}
