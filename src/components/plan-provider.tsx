"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface PlanState {
  plan: number[];
  saved: number[];
  completed: number[];
}

interface PlanContextValue extends PlanState {
  hydrated: boolean;
  toast: string;
  addToPlan: (id: number) => void;
  saveForLater: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  notify: (message: string) => void;
}

const STORAGE_KEY = "fitlog-workout-state";
const initialState: PlanState = { plan: [], saved: [], completed: [] };
const PlanContext = createContext<PlanContextValue | null>(null);

function isIdList(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every((id) => Number.isInteger(id) && id > 0)
  );
}

function readStoredState(value: string | null): PlanState {
  if (!value) return initialState;

  const parsed: unknown = JSON.parse(value);
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Saved workout data is invalid.");
  }

  const state = parsed as Record<string, unknown>;
  const plan = state.plan;
  const saved = state.saved;
  const completed = state.completed;
  if (
    !isIdList(plan) ||
    !isIdList(saved) ||
    !isIdList(completed) ||
    plan.filter((id) => !completed.includes(id)).length > 5
  ) {
    throw new Error("Saved workout data is invalid.");
  }

  return {
    plan: [...new Set(plan)],
    saved: [...new Set(saved)],
    completed: [...new Set(completed)].filter((id) => plan.includes(id)),
  };
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      setState(readStoredState(window.localStorage.getItem(STORAGE_KEY)));
    } catch (error) {
      console.error("Unable to restore the FitLog workout plan.", error);
      setToast("Saved workouts couldn't be loaded.");
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Unable to save the FitLog workout plan.", error);
      setToast("Your changes couldn't be saved on this device.");
    }
  }, [hydrated, state]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const addToPlan = useCallback((id: number) => {
    setState((current) => {
      if (current.plan.includes(id)) {
        setToast("This lift is already in today's plan.");
        return current;
      }
      if (
        current.plan.filter((item) => !current.completed.includes(item))
          .length >= 5
      ) {
        setToast("Your plan is full. Finish or remove a lift first.");
        return current;
      }
      setToast("Added to today's plan.");
      return { ...current, plan: [...current.plan, id] };
    });
  }, []);

  const saveForLater = useCallback((id: number) => {
    setState((current) => {
      if (current.saved.includes(id)) {
        setToast("This lift is already saved.");
        return current;
      }
      setToast("Saved for later.");
      return { ...current, saved: [...current.saved, id] };
    });
  }, []);

  const removeFromPlan = useCallback((id: number) => {
    setState((current) => ({
      ...current,
      plan: current.plan.filter((item) => item !== id),
      completed: current.completed.filter((item) => item !== id),
    }));
    setToast("Lift removed from today's plan.");
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setState((current) => ({
      ...current,
      saved: current.saved.filter((item) => item !== id),
    }));
    setToast("Lift removed from saved.");
  }, []);

  const markAsDone = useCallback((id: number) => {
    setState((current) => ({
      ...current,
      completed: current.completed.includes(id)
        ? current.completed
        : [...current.completed, id],
    }));
    setToast("Lift marked as done. Nice work.");
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      toast,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
      notify,
    }),
    [
      state,
      hydrated,
      toast,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
      notify,
    ],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within a PlanProvider.");
  return context;
}
