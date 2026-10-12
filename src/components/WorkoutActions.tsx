
"use client";

import { useContext } from "react";
import { Bookmark, CheckCircle2 } from "lucide-react";
import { FitLogContext } from "@/context/Fit-LogContext";
import type { Workout } from "@/app/types/workout.data";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("WorkoutActions must be used inside FitLogProvider");
  }

  const {
    planCount,
    savedCount,
    setPlanCount,
    setSavedCount,
  } = context;

  const isPlanned = planCount.some(
    (item) => String(item.id) === String(workout.id)
  );

  const isSaved = savedCount.some(
    (item) => String(item.id) === String(workout.id)
  );

  const handlePlanBtn = () => {
    if (isPlanned) return;

    setPlanCount([...planCount, workout]);
  };

  const handleSaveBtn = () => {
    if (isSaved) {
      setSavedCount(
        savedCount.filter(
          (item) => String(item.id) !== String(workout.id)
        )
      );
      return;
    }

    setSavedCount([...savedCount, workout]);
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        disabled={isPlanned}
        onClick={handlePlanBtn}
        className="flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CheckCircle2 size={19} />
        {isPlanned ? "Added to Plan" : "Add to Plan"}
      </button>

      <button
        type="button"
        onClick={handleSaveBtn}
        className="flex items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:border-lime-400 hover:text-lime-400"
      >
        <Bookmark
          size={19}
          fill={isSaved ? "currentColor" : "none"}
        />
        {isSaved ? "Saved (Remove)" : "Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
