"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Exercise } from "@/types";
import { ExerciseForm } from "@/components/exercise-form";
import { ExerciseList } from "@/components/exercise-list";
import { getExercises, saveExercises } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    setExercises(getExercises());
  }, []);

  const handleSubmit = (exerciseData: Omit<Exercise, "id">) => {
    let updatedExercises: Exercise[];

    if (editingExercise) {
      updatedExercises = exercises.map((ex) =>
        ex.id === editingExercise.id ? { ...exerciseData, id: ex.id } : ex
      );
    } else {
      const newExercise = {
        ...exerciseData,
        id: uuidv4(),
      };
      updatedExercises = [...exercises, newExercise];
    }

    setExercises(updatedExercises);
    saveExercises(updatedExercises);
    setIsAdding(false);
    setEditingExercise(null);
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== id);
    setExercises(updatedExercises);
    saveExercises(updatedExercises);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Exercício
          </Button>
        )}
      </div>

      {isAdding ? (
        <div className="mb-8">
          <ExerciseForm
            onSubmit={handleSubmit}
            initialData={editingExercise || undefined}
          />
          <Button
            variant="ghost"
            onClick={() => {
              setIsAdding(false);
              setEditingExercise(null);
            }}
            className="mt-4"
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <ExerciseList
          exercises={exercises}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}