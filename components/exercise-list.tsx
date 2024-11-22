"use client";

import { Exercise } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit: (exercise: Exercise) => void;
  onDelete: (id: string) => void;
}

export function ExerciseList({ exercises, onEdit, onDelete }: ExerciseListProps) {
  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <Card key={exercise.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{exercise.name}</CardTitle>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(exercise)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(exercise.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{exercise.description}</p>
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span>{exercise.defaultSets} séries</span>
              <span>{exercise.defaultReps} repetições</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}