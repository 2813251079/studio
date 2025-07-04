import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function FrequenciesPage() {
  const frequencies = [
    {
      title: t('frequencies.432hz.title'),
      description: t('frequencies.432hz.description'),
    },
    {
      title: t('frequencies.528hz.title'),
      description: t('frequencies.528hz.description'),
    },
    {
      title: t('frequencies.639hz.title'),
      description: t('frequencies.639hz.description'),
    },
    {
      title: t('frequencies.741hz.title'),
      description: t('frequencies.741hz.description'),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('frequencies.title')}</h1>
        <p className="text-muted-foreground">{t('frequencies.subtitle')}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {frequencies.map((freq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{freq.title}</CardTitle>
              <CardDescription className="pt-2">{freq.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>
                <PlayCircle className="mr-2 h-4 w-4" />
                Reproducir
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
