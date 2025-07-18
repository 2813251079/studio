
"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/translations";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SpotifyIcon from "@/components/spotify-icon";
import InstagramIcon from "@/components/instagram-icon";
import YoutubeIcon from "@/components/youtube-icon";

const t = (key: any) => translations.es[key as any] || key;

export default function Header() {
  const instagramUrl = "https://www.instagram.com/openmusicfrecuencias?igsh=MWRqa2RhOTJsdWRuYg==";
  const spotifyUrl = "https://open.spotify.com/user/31lfxkbb22o76w43fy7xjl5z4osy?si=c7fb8f473f324663";
  const youtubeUrl = "https://www.youtube.com/results?search_query=frecuencias+musicales+sanadoras+y+curativas";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <Logo className="w-48 h-48" />
          <span className="font-bold text-3xl hidden sm:inline-block text-foreground transition-colors group-hover:text-accent">{t('app.title')}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">{t('landing.header.login')}</Link>
          </Button>
           <Button asChild variant="ghost" size="icon">
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon className="h-7 w-7" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                <SpotifyIcon className="h-7 w-7" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <YoutubeIcon className="h-7 w-7" />
            </Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/pricing">{t('landing.header.downloads')}</Link>
          </Button>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/auth/register">{t('landing.header.get_started')}</Link>
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
              <SheetHeader>
                <SheetTitle className="sr-only">Menú Principal</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 pt-10">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/auth/register" onClick={() => setOpen(false)}>{t('landing.header.get_started')}</Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link href="/pricing" onClick={() => setOpen(false)}>{t('landing.header.downloads')}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/login" onClick={() => setOpen(false)}>{t('landing.header.login')}</Link>
                </Button>
                 <div className="flex items-center justify-center gap-4 pt-4">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <InstagramIcon className="h-7 w-7" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                            <SpotifyIcon className="h-7 w-7" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                        <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                            <YoutubeIcon className="h-7 w-7" />
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
