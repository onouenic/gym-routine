"use client";

import { Exercise, WorkoutSeries, WorkoutExercise } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GripVertical, Plus, Trash2 } from "lucide-react";

interface SeriesFormProps {
  onSubmit: (series: Omit<WorkoutSeries, "id" | "createdAt" | "updatedAt">) => void;
  initialData?: WorkoutSeries;
  exercises: Exercise[];
}

export function SeriesForm({ onSubmit, initialData, exercises }: SeriesFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    exercises: initialData?.exercises || [],
    restTimeInSeconds: initialData?.restTimeInSeconds || 60,
  });

  const handleAddExercise = () => {
    if (exercises.length === 0) return;

    const firstExercise = exercises[0];
    const newExercise: WorkoutExercise = {
      exerciseId: firstExercise.id,
      sets: firstExercise.defaultSets,
      reps: firstExercise.defaultReps,
      order: formData.exercises.length,
    };

    setFormData({
      ...formData,
      exercises: [...formData.exercises, newExercise],
    });
  };

  const handleRemoveExercise = (index: number) => {
    const updatedExercises = formData.exercises.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      exercises: updatedExercises.map((ex, i) => ({ ...ex, order: i })),
    });
  };

  const handleExerciseChange = (index: number, field: keyof WorkoutExercise, value: any) => {
    const updatedExercises = formData.exercises.map((ex, i) =>
      i === index ? { ...ex, [field]: value } : ex
    );
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{initialData ? "Editar Série" : "Nova Série"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Série</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="restTime">Tempo de Descanso (segundos)</Label>
            <Input
              id="restTime"
              type="number"
              min="0"
              value={formData.restTimeInSeconds}
              onChange={(e) =>
                setFormData({ ...formData, restTimeInSeconds: parseInt(e.target.value) })
              }
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Exercícios</Label>
              <Button type="button" onClick={handleAddExercise} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Exercício
              </Button>
            </div>

            <div className="space-y-4">
              {formData.exercises.map((exercise, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <div>
                          <Label>Exercício</Label>
                          <select
                            className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                            value={exercise.exerciseId}
                            onChange={(e) =>
                              handleExerciseChange(index, "exerciseId", e.target.value)
                            }
                          >
                            {exercises.map((ex) => (
                              <option key={ex.id} value={ex.id}>
                                {ex.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <Label>Séries</Label>
                          <Input
                            type="number"
                            min="1"
                            value={exercise.sets}
                            onChange={(e) =>
                              handleExerciseChange(index, "sets", parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div>
                          <Label>Repetições</Label>
                          <Input
                            type="number"
                            min="1"
                            value={exercise.reps}
                            onChange={(e) =>
                              handleExerciseChange(index, "reps", parseInt(e.target.value))
                            }
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveExercise(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            {initialData ? "Atualizar" : "Criar"} Série
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}