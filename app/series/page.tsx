"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { WorkoutSeries, Exercise } from "@/types";
import { SeriesForm } from "@/components/series-form";
import { SeriesList } from "@/components/series-list";
import { getSeries, saveSeries, getExercises } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SeriesPage() {
  const [series, setSeries] = useState<WorkoutSeries[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingSeries, setEditingSeries] = useState<WorkoutSeries | null>(null);

  useEffect(() => {
    setSeries(getSeries());
    setExercises(getExercises());
  }, []);

  const handleSubmit = (seriesData: Omit<WorkoutSeries, "id" | "createdAt" | "updatedAt">) => {
    let updatedSeries: WorkoutSeries[];

    if (editingSeries) {
      updatedSeries = series.map((s) =>
        s.id === editingSeries.id
          ? {
              ...seriesData,
              id: s.id,
              createdAt: s.createdAt,
              updatedAt: new Date().toISOString(),
            }
          : s
      );
    } else {
      const newSeries = {
        ...seriesData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updatedSeries = [...series, newSeries];
    }

    setSeries(updatedSeries);
    saveSeries(updatedSeries);
    setIsAdding(false);
    setEditingSeries(null);
  };

  const handleEdit = (series: WorkoutSeries) => {
    setEditingSeries(series);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    const updatedSeries = series.filter((s) => s.id !== id);
    setSeries(updatedSeries);
    saveSeries(updatedSeries);
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
            Nova Série
          </Button>
        )}
      </div>

      {isAdding ? (
        <div className="mb-8">
          <SeriesForm
            onSubmit={handleSubmit}
            initialData={editingSeries || undefined}
            exercises={exercises}
          />
          <Button
            variant="ghost"
            onClick={() => {
              setIsAdding(false);
              setEditingSeries(null);
            }}
            className="mt-4"
          >
            Cancelar
          </Button>
        </div>
      ) : (
        <SeriesList
          series={series}
          exercises={exercises}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}