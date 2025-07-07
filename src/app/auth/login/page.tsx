
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
import { Loader2, AlertTriangle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";

const t = (key: any) => translations.es[key as any] || key;

const loginSchema = z.object({
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading, isFirebaseConfigured } = useAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
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
    if (!isFirebaseConfigured || !auth) {
      toast({
        variant: 'destructive',
        title: "Servicio no disponible",
        description: "La autenticación no está configurada. Por favor, contacta al administrador.",
      });
      return;
    }

    const handleSuccess = (title: string, description: string) => {
      toast({ title, description });
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
      sessionStorage.removeItem('redirectAfterLogin');
      router.replace(redirectUrl);
    };

    // --- Special Owner Account Logic ---
    if (values.email.toLowerCase() === 'eloallende.openmusicacademy@gmail.com') {
      const ownerEmail = 'eloallende.openmusicacademy@gmail.com';
      const ownerPassword = 'Micke.berta.charly';

      try {
        await signInWithEmailAndPassword(auth, ownerEmail, ownerPassword);
        handleSuccess("¡Bienvenido, propietario!", "Has iniciado sesión correctamente.");
      } catch (signInError: any) {
        // If sign-in fails, it could be because the user doesn't exist. Try creating it.
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
          try {
            await createUserWithEmailAndPassword(auth, ownerEmail, ownerPassword);
            handleSuccess("¡Cuenta de propietario creada!", "Has iniciado sesión correctamente.");
          } catch (creationError: any) {
            // If creation fails because the email is in use, it means the original password was wrong.
            if (creationError.code === 'auth/email-already-in-use') {
              toast({
                variant: 'destructive',
                title: "Error de Contraseña",
                description: "La contraseña para la cuenta de propietario es incorrecta. Por favor, contacta al administrador para restablecerla.",
              });
            } else {
              // Handle other creation errors
              toast({
                variant: 'destructive',
                title: "Error Inesperado",
                description: `No se pudo crear o acceder a la cuenta de propietario. ${creationError.message}`,
              });
            }
          }
        } else {
          // Handle other sign-in errors for the owner account
          toast({
            variant: 'destructive',
            title: "Error de Inicio de Sesión",
            description: `Ha ocurrido un error inesperado. ${signInError.message}`,
          });
        }
      }
      return; // End special user logic
    }

    // --- Regular User Login Logic ---
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      handleSuccess("¡Bienvenido de nuevo!", "Has iniciado sesión correctamente.");
    } catch (error: any) {
      console.error(error);
      let errorMessage = "Ha ocurrido un error inesperado.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "El correo electrónico o la contraseña no son correctos.";
        form.setError("email", { type: "manual", message: " " });
        form.setError("password", { type: "manual", message: " " });
        setTimeout(() => form.setFocus('email'), 0);
      } else if (error.code === 'auth/invalid-api-key' || error.code === 'auth/api-key-not-valid') {
        errorMessage = "La clave de API de Firebase no es válida. Por favor, contacta al administrador.";
      }
      toast({
        variant: 'destructive',
        title: "Error de inicio de sesión",
        description: errorMessage,
      });
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
      <Card className="w-full max-w-sm mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('login.title')}</CardTitle>
          <CardDescription className="text-center">{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isFirebaseConfigured && (
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">{t('login.email')}</Label>
                      <FormControl>
                        <Input id="email" type="email" placeholder="m@ejemplo.com" {...field} disabled={isSubmitting || !isFirebaseConfigured} />
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
                      <FormControl>
                        <Input id="password" type="password" {...field} disabled={isSubmitting || !isFirebaseConfigured} />
                      </FormControl>
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
