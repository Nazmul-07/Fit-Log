import { MyPlanPage } from "@/components/my-plan-page";
import { getWorkouts } from "@/lib/workouts";

export default async function PlanPage() {
  const workouts = await getWorkouts();
  return <MyPlanPage workouts={workouts} />;
}
