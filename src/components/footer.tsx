import Link from "next/link";
import Image from "next/image";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function Footer() {
  const logoUrl = "https://storage.googleapis.com/project-spark-348216.appspot.com/users%2FlD5sgrj92eaW42rAAnZ01c8U5kh1%2Flabs%2FM_tE-GwtwWd215bT3tO2s%2Flogo.png";
  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src={logoUrl} width={24} height={24} alt={t('app.logo_alt')} className="rounded-full" />
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
