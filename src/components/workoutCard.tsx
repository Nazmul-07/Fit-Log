import { Workout } from '@/app/types/workout.data';
import { ArrowUpRight, Clock, Flame, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface workoutProps {
    workout: Workout;
}

const workoutCard = ({workout}: workoutProps) => {
    return (
        <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#191b18] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/50 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Image */}
              <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#22251f] p-3">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  width={500}
                  height={350}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                />

                <span className="absolute right-3 top-3 rounded-lg border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                  {workout.difficulty}
                </span>

                <span className="absolute bottom-3 left-3 rounded-lg bg-[#ccff00] px-3 py-1 text-xs font-black text-black">
                  {workout.duration} MIN
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Categories */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-md border border-[#ccff00]/20 bg-[#ccff00]/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <div className="flex min-h-14 items-start justify-between gap-3">
                  <h3 className="text-lg font-extrabold uppercase leading-snug tracking-wide transition group-hover:text-[#ccff00]">
                    {workout.name}
                  </h3>

                  <ArrowUpRight
                    size={20}
                    className="mt-1 shrink-0 text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#ccff00]"
                  />
                </div>

                {/* Equipment */}
                <p className="mt-2 truncate text-sm text-gray-400">
                  Equipment: {workout.equipment}
                </p>

                {/* Divider */}
                <div className="my-4 border-t border-white/10" />

                {/* Stats */}
                <div className="flex items-center justify-between gap-2 text-xs text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-[#ccff00]" />
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Flame size={15} className="text-orange-400" />
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Star
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {workout.rating}
                  </span>
                </div>

                {/* Bottom CTA */}
                <div className="mt-5 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 transition group-hover:bg-[#ccff00]">
                  <span className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-black">
                    View Workout
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-[#ccff00] group-hover:text-black"
                  />
                </div>
              </div>
            </Link>
    );
};

export default workoutCard;