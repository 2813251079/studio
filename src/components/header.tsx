"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function Header() {
  const logoUrl = "https://placehold.co/128x128.png";
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoUrl} width={48} height={48} alt={t('app.title')} className="rounded-full" data-ai-hint="logo soundwave" />
          <span className="font-bold text-xl hidden sm:inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('app.title')}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="link" asChild>
            <Link href="/#features">{t('landing.header.features')}</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/pricing">{t('landing.header.pricing')}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/auth/login">{t('landing.header.login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">{t('landing.header.get_started')}</Link>
          </Button>
        </nav>
        <Button size="icon" variant="ghost" className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>
    </header>
  );
}
