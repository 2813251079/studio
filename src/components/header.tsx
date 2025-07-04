"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";
import { Instagram, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const t = (key: any) => translations.es[key as any] || key;

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.232c-.276.447-.84.58-1.285.305-2.5-1.52-5.655-1.85-9.338-1.015-.512.115-.99-.196-.99-.728s.396-.92.908-.995c4.095-.915 7.632-.525 10.455 1.127.447.275.58.84.305 1.285zm1.4-2.766c-.33.538-1.015.705-1.554.375-2.792-1.71-7.05-2.235-10.4-.12-.604.375-1.285-.06-1.396-.662s.06-1.285.662-1.396c3.856-2.385 8.703-1.77 11.948.375.538.33.705 1.015.375 1.554zm.135-2.91c-.405.625-1.2.82-1.825.415-3.23-1.96-8.3-2.41-11.45-.135-.705.485-1.554-.01-1.664-.71-.11-.705.484-1.554.71-1.664C7.03 5.49 12.645 6 16.37 8.235c.625.405.82 1.2.415 1.825z"/></svg>
);

export default function Header() {
  const instagramUrl = "https://www.instagram.com/openmusicfrecuencias?igsh=MWRqa2RhOTJsdWRuYg==&utm_source=ig_contact_invite";
  const spotifyUrl = "https://open.spotify.com/user/31lfxkbb22o76w43fy7xjl5z4osy?si=c7fb8f473f324663";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Logo className="w-20 h-20" />
          <span className="font-bold text-3xl hidden sm:inline-block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">{t('app.title')}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">{t('landing.header.login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">{t('landing.header.get_started')}</Link>
          </Button>
           <Button asChild variant="ghost" size="icon">
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <SpotifyIcon />
            </Link>
          </Button>
        </nav>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-6 pt-10">
                <Button asChild>
                  <Link href="/auth/login" onClick={() => setOpen(false)}>{t('landing.header.login')}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/register" onClick={() => setOpen(false)}>{t('landing.header.get_started')}</Link>
                </Button>
                 <div className="flex items-center justify-center gap-4 pt-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram className="h-6 w-6" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                            <SpotifyIcon className="h-6 w-6" />
                        </Link>
                    </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
