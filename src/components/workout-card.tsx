import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { WorkoutStats } from "@/components/workout-stats";
import type { Workout } from "@/lib/workouts";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      className="workout-card"
      href={`/workouts/${workout.id}`}
      aria-label={`View ${workout.name} details`}
    >
      <div className="workout-card-image">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"
          unoptimized
        />
        <span className="card-index">
          {String(workout.id).padStart(2, "0")}
        </span>
        <span className="card-open" aria-hidden="true">
          <Icon name="arrow-right" />
        </span>
      </div>
      <div className="workout-card-content">
        <div className="tag-list">
          {workout.muscleGroups.map((group) => (
            <span className="tag" key={group}>
              {group}
            </span>
          ))}
        </div>
        <h3>{workout.name}</h3>
        <p className="card-equipment">
          <Icon name="dumbbell" size={13} /> {workout.equipment}
        </p>
        <WorkoutStats
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
        />
      </div>
    </Link>
  );
}
