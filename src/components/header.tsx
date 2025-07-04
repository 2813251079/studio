"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/use-settings";
import {
  Globe,
  Monitor,
  Moon,
  Settings,
  Sun,
  Type,
  Video,
  Check,
} from "lucide-react";
import { translations } from "@/lib/translations";

export default function Header() {
  const {
    isMounted,
    theme,
    setTheme,
    fontSize,
    setFontSize,
    animationsEnabled,
    setAnimationsEnabled,
    language,
    setLanguage,
  } = useSettings();

  const t = (key: any) => translations[language]?.[key] || translations['en'][key];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <WandIcon className="h-6 w-6" />
          <h1 className="font-headline text-xl font-bold tracking-tight">
            {t('app.title')}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">{t('header.select_language')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('header.language')}</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as any)}>
                <DropdownMenuRadioItem value="es">
                  {t('header.spanish')}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en">
                  {t('header.english')}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">{t('header.sensory_settings')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('header.sensory_settings')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isMounted && (
                <>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Monitor className="mr-2 h-4 w-4" />
                      <span>{t('header.theme')}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                          <Sun className="mr-2 h-4 w-4" />
                          <span>{t('header.light')}</span>
                          {theme === "light" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                          <Moon className="mr-2 h-4 w-4" />
                          <span>{t('header.dark')}</span>
                          {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Type className="mr-2 h-4 w-4" />
                      <span>{t('header.font_size')}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup value={fontSize} onValueChange={(value) => setFontSize(value as any)}>
                          <DropdownMenuRadioItem value="sm">{t('header.font_size.sm')}</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="base">{t('header.font_size.base')}</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="lg">{t('header.font_size.lg')}</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Video className="mr-2 h-4 w-4" />
                    <span>{t('header.animations')}</span>
                    <Switch
                      className="ml-auto"
                      checked={animationsEnabled}
                      onCheckedChange={setAnimationsEnabled}
                      aria-label="Toggle animations"
                    />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function WandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4V2" />
      <path d="M15 10V8" />
      <path d="M12.5 6.5h-5" />
      <path d="M17.5 6.5h-5" />
      <path d="M3 10v4c0 .5.4.9.9.9h16.2c.5 0 .9-.4.9-.9v-4" />
      <path d="M3 18v2c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-2" />
    </svg>
  );
}
