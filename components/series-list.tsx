"use client";

import { Exercise, WorkoutSeries } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer } from "@/components/timer";
import { Pencil, Play, Trash2 } from "lucide-react";
import Link from "next/link";

interface SeriesListProps {
  series: WorkoutSeries[];
  exercises: Exercise[];
  onEdit: (series: WorkoutSeries) => void;
  onDelete: (id: string) => void;
}

export function SeriesList({ series, exercises, onEdit, onDelete }: SeriesListProps) {
  const getExerciseName = (exerciseId: string) => {
    return exercises.find((ex) => ex.id === exerciseId)?.name || "Exercício não encontrado";
  };

  return (
    <div className="space-y-4">
      {series.map((series) => (
        <Card key={series.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{series.name}</CardTitle>
              <div className="space-x-2">
                <Link href={`/series/${series.id}`}>
                  <Button variant="outline" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon" onClick={() => onEdit(series)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(series.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{series.description}</p>
            <div className="space-y-4">
              {series.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{getExerciseName(exercise.exerciseId)}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} séries x {exercise.reps} repetições
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Tempo de descanso: {series.restTimeInSeconds} segundos
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}