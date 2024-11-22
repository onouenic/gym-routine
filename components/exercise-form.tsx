"use client";

import { Exercise } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, "id">) => void;
  initialData?: Exercise;
}

export function ExerciseForm({ onSubmit, initialData }: ExerciseFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    videoUrl: initialData?.videoUrl || "",
    defaultReps: initialData?.defaultReps || 12,
    defaultSets: initialData?.defaultSets || 3,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{initialData ? "Editar Exercício" : "Novo Exercício"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Exercício</Label>
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
            <Label htmlFor="videoUrl">URL do Vídeo</Label>
            <Input
              id="videoUrl"
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultReps">Repetições Padrão</Label>
              <Input
                id="defaultReps"
                type="number"
                min="1"
                value={formData.defaultReps}
                onChange={(e) => setFormData({ ...formData, defaultReps: parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultSets">Séries Padrão</Label>
              <Input
                id="defaultSets"
                type="number"
                min="1"
                value={formData.defaultSets}
                onChange={(e) => setFormData({ ...formData, defaultSets: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            {initialData ? "Atualizar" : "Criar"} Exercício
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}