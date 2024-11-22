import { Exercise, WorkoutSeries } from "@/types";

const EXERCISES_KEY = "workout-exercises";
const SERIES_KEY = "workout-series";

export const saveExercises = (exercises: Exercise[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
  }
};

export const getExercises = (): Exercise[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(EXERCISES_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const saveSeries = (series: WorkoutSeries[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(SERIES_KEY, JSON.stringify(series));
  }
};

export const getSeries = (): WorkoutSeries[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(SERIES_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};