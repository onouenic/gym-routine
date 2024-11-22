'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Exercise, WorkoutSeries } from '@/types';
import { getSeries, getExercises } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Timer } from '@/components/timer';
import {
  ArrowLeft,
  CheckCircle2,
  FastForward,
  Timer as TimerIcon,
} from 'lucide-react';
import Link from 'next/link';

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const [series, setSeries] = useState<WorkoutSeries | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [showTimer, setShowTimer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const allSeries = getSeries();
    const currentSeries = allSeries.find((s) => s.id === params.id);
    if (!currentSeries) {
      router.push('/series');
      return;
    }
    setSeries(currentSeries);
    setExercises(getExercises());
  }, [params.id, router]);

  if (!series || exercises.length === 0) {
    return <div>Carregando...</div>;
  }

  const currentExercise = series.exercises[currentExerciseIndex];
  const exercise = exercises.find((ex) => ex.id === currentExercise.exerciseId);

  const handleSetComplete = () => {
    console.log(currentSet);
    if (currentSet <= currentExercise.sets) {
      setShowTimer(true);
    } else {
      if (currentExerciseIndex < series.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
      } else {
        setIsCompleted(true);
      }
    }
  };

  const handleTimerComplete = () => {
    setShowTimer(false);
    setCurrentSet(currentSet + 1);
  };

  const skipRest = () => {
    setShowTimer(false);
    setCurrentSet(currentSet + 1);
  };

  const extractYouTubeVideoId = (url: string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  if (isCompleted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="text-2xl font-bold">Série Concluída!</h2>
              <p className="text-muted-foreground">
                Parabéns! Você completou todos os exercícios da série.
              </p>
              <Link href="/series">
                <Button className="mt-4">Voltar para Séries</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/series">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Séries
          </Button>
        </Link>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{series.name}</span>
            <span className="text-sm font-normal text-muted-foreground">
              Exercício {currentExerciseIndex + 1} de {series.exercises.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">{exercise?.name}</h3>
              <p className="text-muted-foreground">{exercise?.description}</p>
            </div>

            {exercise?.videoUrl && (
              <div className="aspect-video">
                {exercise.videoUrl.includes('youtube.com') ||
                exercise.videoUrl.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
                      exercise.videoUrl
                    )}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="w-full h-full rounded-lg"
                    src={exercise.videoUrl}
                    controls
                  />
                )}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg">{currentExercise.reps} repetições</p>
                  <p className="text-sm text-muted-foreground">
                    Série {currentSet} de {currentExercise.sets}
                  </p>
                </div>
                <Button
                  onClick={handleSetComplete}
                  size="lg"
                  className="relative"
                >
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  <span>
                    Série {currentSet}/{currentExercise.sets}
                  </span>
                </Button>
              </div>

              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso da Série</span>
                      <span className="text-muted-foreground">
                        {Math.round((currentSet / currentExercise.sets) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{
                          width: `${
                            (currentSet / currentExercise.sets) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {showTimer && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Tempo de Descanso</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TimerIcon className="h-4 w-4" />
                      <span>{series.restTimeInSeconds}s</span>
                    </div>
                  </div>

                  <Timer
                    duration={series.restTimeInSeconds}
                    onComplete={handleTimerComplete}
                    autoStart={true}
                  />

                  <Button
                    onClick={skipRest}
                    variant="outline"
                    className="w-full"
                  >
                    <FastForward className="mr-2 h-4 w-4" />
                    Pular Descanso
                  </Button>

                  <div className="text-sm text-muted-foreground text-center">
                    Próxima série: {currentSet + 1}/{currentExercise.sets}
                  </div>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Próximo exercício:</span>
                  <span>
                    {currentExerciseIndex < series.exercises.length - 1
                      ? exercises.find(
                          (ex) =>
                            ex.id ===
                            series.exercises[currentExerciseIndex + 1]
                              .exerciseId
                        )?.name
                      : 'Último exercício'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
