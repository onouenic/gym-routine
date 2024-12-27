'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  exerciseName?: string; // Nome do exercício opcional para personalizar a mensagem
}

export function DeleteConfirmationModal({ onConfirm, onCancel, isOpen, exerciseName }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Confirmação de Exclusão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Tem certeza de que deseja excluir <strong>{exerciseName || 'este exercício'}</strong>? Esta ação não pode
            ser desfeita.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="ghost" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Excluir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
