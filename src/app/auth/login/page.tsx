import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary dark:bg-black">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input id="email" type="email" placeholder="m@ejemplo.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">{t('login.button')}</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t('login.no_account')}{" "}
            <Link href="/auth/register" className="underline text-primary">
              {t('login.register')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
