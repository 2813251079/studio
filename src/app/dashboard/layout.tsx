
'use client';

import Link from 'next/link';
import Logo from '@/components/logo';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
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
import { UserCircle, LogOut, Waves, Wind, Video, Puzzle, SlidersHorizontal, Star, Menu, Brain, BookOpen, BrainCircuit, Smile, Download, HeartHandshake, Loader2, Palette } from 'lucide-react';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import SpotifyIcon from '@/components/spotify-icon';
import InstagramIcon from '@/components/instagram-icon';
import YoutubeIcon from '@/components/youtube-icon';
import VoiceCommander from '@/components/voice-commander';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const t = (key: any) => translations.es[key as any] || key;

const instagramUrl = "https://www.instagram.com/openmusicfrecuencias?igsh=MWRqa2RhOTJsdWRuYg==";
const spotifyUrl = "https://open.spotify.com/user/31lfxkbb22o76w43fy7xjl5z4osy?si=c7fb8f473f324663";
const youtubeUrl = "https://www.youtube.com/results?search_query=frecuencias+musicales+sanadoras+y+curativas";


const features = [
    { href: '/dashboard/frequencies', title: t('dashboard.sidebar.frequencies'), icon: <Waves /> },
    { href: '/dashboard/audio-enhancer', title: t('dashboard.sidebar.workspace_harmonizer'), icon: <Wind /> },
    { href: '/dashboard/video-harmonizer', title: t('dashboard.sidebar.video_harmonizer'), icon: <Video /> },
    { href: '/dashboard/ai-creator', title: t('dashboard.sidebar.ai_creator'), icon: <Palette /> },
    { href: '/dashboard/inclusive-games', title: t('dashboard.sidebar.inclusive_games'), icon: <Puzzle /> },
    { href: '/open-condition', title: t('dashboard.sidebar.open_condition'), icon: <HeartHandshake /> },
    { href: '/dashboard/production', title: t('dashboard.sidebar.music_production'), icon: <SlidersHorizontal /> },
    { href: '/dashboard/tuner', title: t('dashboard.sidebar.tuner'), icon: <Brain /> },
    { href: '/dashboard/facial-wellness', title: t('dashboard.sidebar.facial_wellness'), icon: <Smile /> },
    { href: '/dashboard/education', title: t('dashboard.sidebar.education_db'), icon: <BookOpen /> },
    { href: '/education', title: t('dashboard.sidebar.healing_frequencies'), icon: <BrainCircuit /> },
];

function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const { user, logout, isFirebaseConfigured } = useAuth();

  const handleLogout = async () => {
    await logout();
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

  const handleFrequencyButtonClick = () => {
    if (pathname === '/dashboard') {
      router.back();
    } else {
      router.push('/dashboard');
    }
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-24 max-w-screen-2xl items-center justify-between">
        <Link 
            href="/dashboard" 
            aria-label={t('dashboard.sidebar.home')}
            className="w-48 h-48 flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-110 active:scale-95 md:ml-16"
        >
            <Logo className="w-full h-full" />
        </Link>
        
        <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="text-xl flex items-center gap-2">
                           <Logo className="w-24 h-24" />
                           <span>{t('app.title')}</span>
                        </Button>
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
            </nav>

            <div className="hidden md:flex items-center gap-2">
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

            <div className="hidden md:flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleFrequencyButtonClick}>
                    F=1/T (hertz)
                </Button>
                <Button asChild size="sm">
                    <Link href="/pricing">
                        <Download className="mr-2 h-4 w-4"/>
                        {t('landing.header.downloads')}
                    </Link>
                </Button>
                {isFirebaseConfigured && <VoiceCommander />}
            </div>
            
            {isFirebaseConfigured && user ? (
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                          <Avatar className="h-10 w-10">
                              {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'Usuario'} data-ai-hint="person avatar" />}
                              <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
                          </Avatar>
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{user.displayName || user.email || "Invitado"}</DropdownMenuLabel>
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
            ) : (
               <Button asChild>
                  <Link href="/auth/login">{t('landing.header.login')}</Link>
               </Button>
            )}
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
                     <Button
                        variant="outline"
                        onClick={() => {
                            handleFrequencyButtonClick();
                            setMobileMenuOpen(false);
                        }}
                        className="flex items-center justify-center text-base gap-3"
                     >
                        F=1/T (hertz)
                     </Button>
                     {features.map((feature) => (
                        <Link key={feature.href} href={feature.href} className="flex items-center gap-3 text-lg" onClick={() => setMobileMenuOpen(false)}>
                            {feature.icon}
                            <span>{feature.title}</span>
                        </Link>
                     ))}
                      <Link href="/pricing" className="flex items-center gap-3 text-lg" onClick={() => setMobileMenuOpen(false)}>
                        <Download />
                        <span>{t('landing.header.downloads')}</span>
                      </Link>
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
  const { user, loading, isFirebaseConfigured } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if Firebase is configured and we're done loading and there's no user.
    if (!loading && !user && isFirebaseConfigured) {
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.replace('/auth/login');
    }
  }, [user, loading, router, pathname, isFirebaseConfigured]);

  // Show a loader while we're determining the auth state.
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If we have a user, or if Firebase isn't configured, show the dashboard.
  // The header will correctly show either the user avatar or a login button.
  if (user || !isFirebaseConfigured) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <DashboardHeader />
        <main className="flex-1 container py-8">{children}</main>
      </div>
    );
  }

  // This will be shown briefly before redirect if Firebase is configured but user is not logged in.
  return null;
}
