import { Button } from "@/components/ui/button";
import { Dumbbell, ListPlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <h1 className="text-4xl font-bold text-center">Workout Tracker</h1>
        <p className="text-xl text-muted-foreground text-center max-w-md">
          Gerencie seus exercícios e séries de academia de forma simples e eficiente
        </p>
        
        <div className="flex gap-4">
          <Link href="/exercises">
            <Button size="lg">
              <Dumbbell className="mr-2 h-5 w-5" />
              Exercícios
            </Button>
          </Link>
          <Link href="/series">
            <Button size="lg" variant="outline">
              <ListPlus className="mr-2 h-5 w-5" />
              Séries
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}