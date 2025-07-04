import WorkspaceHarmonizerForm from "@/components/workspace-harmonizer-form";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function WorkspaceHarmonizerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('workspace_harmonizer.title')}</h1>
        <p className="text-muted-foreground">{t('workspace_harmonizer.subtitle')}</p>
      </div>
      <WorkspaceHarmonizerForm />
    </div>
  );
}
