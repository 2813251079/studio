import { Card, CardContent } from "@/components/ui/card";
import { Puzzle } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function InclusiveGamesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('inclusive_games.title')}</h1>
        <p className="text-muted-foreground">{t('inclusive_games.subtitle')}</p>
      </div>
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
        <Puzzle className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">{t('inclusive_games.coming_soon.title')}</h2>
        <p className="text-muted-foreground mt-2">{t('inclusive_games.coming_soon.description')}</p>
      </Card>
    </div>
  );
}
