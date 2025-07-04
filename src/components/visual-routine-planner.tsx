'use client';

import { useState } from 'react';
import type { Pictogram } from '@/app/dashboard/inclusive-games/page';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { XCircle, CheckSquare, Square, Undo2 } from 'lucide-react';

interface VisualRoutinePlannerProps {
    pictograms: Pictogram[];
    t: (key: string) => string;
}

export default function VisualRoutinePlanner({ pictograms, t }: VisualRoutinePlannerProps) {
    const [routine, setRoutine] = useState<Pictogram[]>([]);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const handlePictoClick = (picto: Pictogram) => {
        setRoutine(prev => [...prev, picto]);
    };
    
    const handleRemoveItem = (indexToRemove: number) => {
        setRoutine(prev => prev.filter((_, index) => index !== indexToRemove));
        setCompletedSteps(prev => {
            const newSet = new Set(prev);
            newSet.delete(indexToRemove);
            return newSet;
        });
    };

    const handleToggleStep = (index: number) => {
        setCompletedSteps(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    const handleReset = () => {
        setRoutine([]);
        setCompletedSteps(new Set());
    };
    
    const handlePictoKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, picto: Pictogram) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handlePictoClick(picto);
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">{t('inclusive_games.planner.routine_title')}</CardTitle>
                </CardHeader>
                <CardContent className="min-h-[200px]">
                    {routine.length === 0 ? (
                        <p className="text-muted-foreground">{t('inclusive_games.planner.routine_placeholder')}</p>
                    ) : (
                        <ol className="space-y-4">
                            {routine.map((picto, index) => {
                                const isCompleted = completedSteps.has(index);
                                return (
                                    <li key={`${picto.id}-${index}`} className="flex items-center justify-between gap-4 p-3 rounded-lg bg-secondary">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleToggleStep(index)}
                                                aria-label={isCompleted ? t('inclusive_games.planner.uncheck_step') : t('inclusive_games.planner.check_step')}
                                                className={`flex items-center gap-3 transition-opacity ${isCompleted ? 'opacity-50' : ''}`}
                                            >
                                                {isCompleted ? <CheckSquare className="h-6 w-6 text-primary" /> : <Square className="h-6 w-6 text-primary" />}
                                                <span className="text-lg font-semibold">{index + 1}.</span>
                                            </button>
                                            <div className={`flex items-center gap-3 transition-opacity ${isCompleted ? 'opacity-50 line-through' : ''}`}>
                                                {picto.icon}
                                                <span className="text-base font-medium">{t(picto.labelKey)}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveItem(index)}
                                            aria-label={`${t('inclusive_games.planner.remove_step')}: ${t(picto.labelKey)}`}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <XCircle className="h-6 w-6" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    )}
                </CardContent>
            </Card>

            <div className="flex gap-4">
                <Button onClick={handleReset} variant="outline" disabled={routine.length === 0}>
                    <Undo2 className="mr-2 h-4 w-4" />
                    {t('inclusive_games.planner.reset_button')}
                </Button>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3">{t('inclusive_games.planner.add_step_title')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {pictograms.map((picto) => (
                        <Card 
                            key={picto.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handlePictoClick(picto)}
                            onKeyDown={(e) => handlePictoKeyDown(e, picto)}
                            aria-label={`${t('inclusive_games.planner.add_step_pictogram')}: ${t(picto.labelKey)}`}
                            className="flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all hover:ring-2 hover:ring-primary hover:shadow-lg active:scale-95"
                        >
                            {picto.icon}
                            <p className="mt-2 font-medium">{t(picto.labelKey)}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
