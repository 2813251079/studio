
'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { translations } from "@/lib/translations";
import { Loader2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";

const t = (key: any) => translations.es[key as any] || key;

const loginSchema = z.object({
  identifier: z.string().min(1, "Por favor, introduce tu email, teléfono o nombre."),
  password: z.string().min(1, "La contraseña no puede estar vacía."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading, isFirebaseConfigured } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<{ title: string; description: string } | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);


  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LoginFormValues) => {
    setLoginError(null);

    if (!isFirebaseConfigured || !auth) {
      toast({
        variant: 'destructive',
        title: "Servicio no disponible",
        description: "La autenticación no está configurada. Por favor, contacta al administrador.",
      });
      return;
    }

    let emailForAuth = values.identifier;
    const identifierLower = values.identifier.toLowerCase();
    
    const isOwnerAttempt = 
        identifierLower === 'manuel diaz allende' || 
        values.identifier === '+56983361119' || 
        identifierLower === 'eloallende.openmusicacademy@gmail.com';

    if (identifierLower === 'manuel diaz allende' || values.identifier === '+56983361119') {
      emailForAuth = 'eloallende.openmusicacademy@gmail.com';
    }

    try {
        await signInWithEmailAndPassword(auth, emailForAuth, values.password);
        
        const title = isOwnerAttempt ? "¡Bienvenido, propietario!" : "¡Bienvenido de nuevo!";
        toast({ title: title, description: "Has iniciado sesión correctamente." });

        const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
        sessionStorage.removeItem('redirectAfterLogin');
        router.replace(redirectUrl);

    } catch (error: any) {
        if (isOwnerAttempt) {
            setLoginError({
                title: "Error de Acceso Propietario",
                description: "La cuenta de propietario debe ser creada manualmente en la consola de Firebase o la contraseña es incorrecta."
            });
             form.setError("identifier", { type: "manual", message: " " });
             form.setError("password", { type: "manual", message: " " });
        } else {
            let errorTitle = "Error de inicio de sesión";
            let errorMessage = "El identificador o la contraseña no son correctos.";

            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                     errorMessage = "El identificador o la contraseña no son correctos.";
                     form.setError("identifier", { type: "manual", message: " " });
                     form.setError("password", { type: "manual", message: " " });
                    break;
                case 'auth/invalid-email':
                    errorMessage = "El formato del correo electrónico no es válido. Por favor, inténtalo de nuevo.";
                    form.setError("identifier", { type: "manual", message: "Correo electrónico no válido." });
                    break;
                case 'auth/invalid-api-key':
                case 'auth/api-key-not-valid':
                    errorMessage = "La clave de API de Firebase no es válida. Por favor, contacta al administrador.";
                    break;
                default:
                    break;
            }
             setLoginError({ title: errorTitle, description: errorMessage });
        }
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
      <Link href="/">
        <Logo className="w-48 h-48" />
      </Link>
      
      {loginError && (
        <div className="w-full max-w-sm">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{loginError.title}</AlertTitle>
                <AlertDescription>{loginError.description}</AlertDescription>
            </Alert>
        </div>
       )}

      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('login.title')}</CardTitle>
          <CardDescription className="text-center">{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isFirebaseConfigured && !loginError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Servicio no disponible</AlertTitle>
                <AlertDescription>
                  La autenticación no está configurada. Por favor, contacta al administrador.
                </AlertDescription>
              </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="identifier">Email, Teléfono o Nombre</Label>
                      <FormControl>
                        <Input id="identifier" placeholder="Tu identificador" {...field} disabled={isSubmitting || !isFirebaseConfigured} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">{t('login.password')}</Label>
                       <div className="relative">
                        <FormControl>
                          <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            {...field} 
                            disabled={isSubmitting || !isFirebaseConfigured} 
                            className="pr-10"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Eye className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <Button type="submit" className="w-full" disabled={isSubmitting || !isFirebaseConfigured}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : t('login.button')}
              </Button>
            </form>
          </Form>
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
