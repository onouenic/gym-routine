export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  defaultReps: number;
  defaultSets: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  order: number;
}

export interface WorkoutSeries {
  id: string;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  restTimeInSeconds: number;
  createdAt: string;
  updatedAt: string;
}