import Link from "next/link";
import { translations } from "@/lib/translations";
import { Music4 } from "lucide-react";

const t = (key: any) => translations.es[key as any] || key;

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Music4 className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} {t('app.title')}. {t('app.description')}.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">X</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Instagram</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Facebook</Link>
        </div>
      </div>
    </footer>
  );
}
