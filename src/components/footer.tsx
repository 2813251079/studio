
'use client';

import Link from "next/link";
import Logo from "@/components/logo";
import { translations } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import SpotifyIcon from "@/components/spotify-icon";
import InstagramIcon from "@/components/instagram-icon";
import YoutubeIcon from "@/components/youtube-icon";

const t = (key: any) => translations.es[key as any] || key;

export default function Footer() {
  const instagramUrl = "https://www.instagram.com/openmusicfrecuencias?igsh=MWRqa2RhOTJsdWRuYg==";
  const spotifyUrl = "https://open.spotify.com/user/31lfxkbb22o76w43fy7xjl5z4osy?si=c7fb8f473f324663";
  const youtubeUrl = "https://www.youtube.com/results?search_query=frecuencias+musicales+sanadoras+y+curativas";

  return (
    <footer className="w-full">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-4 md:px-0">
          <Link href="/">
            <Logo className="w-40 h-40" />
          </Link>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-sm leading-loose text-muted-foreground">
              {t('footer.rights_reserved')}
            </p>
             <div className="flex gap-2 justify-center md:justify-start">
                <Link href="/terms" className="text-sm text-primary hover:underline">
                  {t('footer.terms')}
                </Link>
                 <span className="text-sm text-muted-foreground">|</span>
                 <Link href="/privacy" className="text-sm text-primary hover:underline">
                  {t('footer.privacy')}
                </Link>
            </div>
            <p className="text-xs text-accent mt-2 max-w-md">{t('footer.disclaimer')}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon" className="h-14 w-14">
                <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramIcon className="h-8 w-8" />
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-14 w-14">
                <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify">
                    <SpotifyIcon className="h-8 w-8" />
                </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-14 w-14">
                <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                    <YoutubeIcon className="h-8 w-8" />
                </Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}
