
'use client';

import Link from 'next/link';
import Logo from '@/components/logo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCircle, LogOut, Waves, Wind, Video, Puzzle, SlidersHorizontal, Star, Menu, Brain, BookOpen, BrainCircuit, Smile } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import SpotifyIcon from '@/components/spotify-icon';
import InstagramIcon from '@/components/instagram-icon';
import YoutubeIcon from '@/components/youtube-icon';
import VoiceCommander from '@/components/voice-commander';
import { useRequireAuth, useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const t = (key: any) => translations.es[key as any] || key;

const instagramUrl = "https://www.instagram.com/openmusicfrecuencias?igsh=MWRqa2RhOTJsdWRuYg==&utm_source=ig_contact_invite";
const spotifyUrl = "https://open.spotify.com/user/31lfxkbb22o76w43fy7xjl5z4osy?si=c7fb8f473f324663";
const youtubeUrl = "https://www.youtube.com/results?search_query=frecuencias+musicales+sanadoras+y+curativas";


const features = [
    { href: '/dashboard/frequencies', title: t('dashboard.sidebar.frequencies'), icon: <Waves /> },
    { href: '/dashboard/audio-enhancer', title: t('dashboard.sidebar.workspace_harmonizer'), icon: <Wind /> },
    { href: '/dashboard/video-harmonizer', title: t('dashboard.sidebar.video_harmonizer'), icon: <Video /> },
    { href: '/dashboard/inclusive-games', title: t('dashboard.sidebar.inclusive_games'), icon: <Puzzle /> },
    { href: '/dashboard/production', title: t('dashboard.sidebar.music_production'), icon: <SlidersHorizontal /> },
    { href: '/dashboard/tuner', title: t('dashboard.sidebar.tuner'), icon: <Brain /> },
    { href: '/dashboard/facial-wellness', title: t('dashboard.sidebar.facial_wellness'), icon: <Smile /> },
    { href: '/dashboard/education', title: t('dashboard.sidebar.education_db'), icon: <BookOpen /> },
    { href: '/education', title: t('dashboard.sidebar.healing_frequencies'), icon: <BrainCircuit /> },
    { href: '/pricing', title: t('dashboard.sidebar.coming_soon'), icon: <Star /> },
];

function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    });
    router.push('/');
  };

  const getAvatarFallback = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return <UserCircle />;
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
         <div className="w-20 flex-shrink-0" aria-hidden="true" />
        
        <nav className="hidden md:flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-xl">{t('app.title')}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{t('dashboard.sidebar.home')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {features.map((feature) => (
                             <DropdownMenuItem key={feature.href} asChild>
                                <Link href={feature.href} className="flex items-center gap-2">
                                    {feature.icon}
                                    <span>{feature.title}</span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

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
        </nav>

        <div className="flex items-center gap-4">
            <VoiceCommander />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'Usuario'} data-ai-hint="person avatar" />}
                            <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.displayName || user?.email || "Invitado"}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="#" className="flex items-center gap-2">
                            <UserCircle className="mr-2 h-4 w-4" />
                            <span>{t('dashboard.sidebar.account')}</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('dashboard.sidebar.logout')}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menú</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 pt-10">
                     <Link href="/dashboard" className="font-bold text-lg mb-4" onClick={() => setMobileMenuOpen(false)}>Open Music Academy</Link>
                     {features.map((feature) => (
                        <Link key={feature.href} href={feature.href} className="flex items-center gap-3 text-lg" onClick={() => setMobileMenuOpen(false)}>
                            {feature.icon}
                            <span>{feature.title}</span>
                        </Link>
                     ))}
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
      </div>
    </header>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 container py-8">{children}</main>
      <Link 
        href="/dashboard" 
        className="fixed bottom-6 left-6 z-50 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95"
        aria-label={t('dashboard.sidebar.home')}
      >
        <Logo className="h-20 w-20 drop-shadow-lg" />
      </Link>
    </div>
  );
}
