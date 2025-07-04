import Link from "next/link";
import Image from "next/image";
import { translations } from "@/lib/translations";
import { Instagram } from "lucide-react";

const t = (key: any) => translations.es[key as any] || key;

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.232c-.276.447-.84.58-1.285.305-2.5-1.52-5.655-1.85-9.338-1.015-.512.115-.99-.196-.99-.728s.396-.92.908-.995c4.095-.915 7.632-.525 10.455 1.127.447.275.58.84.305 1.285zm1.4-2.766c-.33.538-1.015.705-1.554.375-2.792-1.71-7.05-2.235-10.4-.12-.604.375-1.285-.06-1.396-.662s.06-1.285.662-1.396c3.856-2.385 8.703-1.77 11.948.375.538.33.705 1.015.375 1.554zm.135-2.91c-.405.625-1.2.82-1.825.415-3.23-1.96-8.3-2.41-11.45-.135-.705.485-1.554-.01-1.664-.71-.11-.705.484-1.554.71-1.664C7.03 5.49 12.645 6 16.37 8.235c.625.405.82 1.2.415 1.825z"/></svg>
);

export default function Footer() {
  const logoUrl = "https://placehold.co/128x128.png";
  const instagramUrl = "https://www.instagram.com/openmusicfrecuencias?igsh=MWRqa2RhOTJsdWRuYg==&utm_source=ig_contact_invite";
  const spotifyUrl = "https://open.spotify.com/user/31lfxkbb22o76w43fy7xjl5z4osy?si=cd0a66d7796f437c";

  return (
    <footer className="w-full border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src={logoUrl} width={24} height={24} alt={t('app.title')} className="rounded-full" data-ai-hint="abstract geometric" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} {t('app.title')}. {t('app.description')}.
          </p>
        </div>
        <div className="flex items-center gap-6">
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-6 w-6" />
            </Link>
            <Link href={spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-muted-foreground hover:text-foreground">
                <SpotifyIcon className="h-6 w-6" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
