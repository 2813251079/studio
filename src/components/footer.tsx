import Link from "next/link";
import Image from "next/image";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function Footer() {
  const logoUrl = "https://placehold.co/128x128.png";
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src={logoUrl} width={24} height={24} alt={t('app.title')} className="rounded-full" data-ai-hint="abstract geometric" />
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
