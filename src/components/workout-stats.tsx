import { Icon } from "@/components/icon";

export function WorkoutStats({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <ul className="workout-stats" aria-label="Workout statistics">
      <li>
        <Icon name="clock" size={13} /> {duration} min
      </li>
      <li>
        <Icon name="flame" size={13} /> {calories} kcal
      </li>
      <li>
        <Icon name="star" size={13} /> {rating.toFixed(1)}
      </li>
    </ul>
  );
}
