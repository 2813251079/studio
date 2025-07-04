import Header from "@/components/header";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-20 md:py-32 prose prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent !mb-10">
          {t('footer.terms')}
        </h1>
        <h2>1. Aceptación de los Términos</h2>
        <p>Al acceder y utilizar Open Music Academy, usted acepta y se compromete a cumplir con estos términos y condiciones. Si no está de acuerdo, no debe utilizar nuestros servicios.</p>
        
        <h2>2. Descripción del Servicio</h2>
        <p>Open Music Academy proporciona herramientas basadas en inteligencia artificial para la exploración y generación de frecuencias sonoras y contenido visual con fines de bienestar y entretenimiento. Los servicios son proporcionados "tal cual" y no constituyen consejo médico o terapéutico.</p>

        <h2>3. Cuentas de Usuario</h2>
        <p>Para acceder a ciertas funciones, debe crear una cuenta. Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades que ocurran bajo su cuenta.</p>

        <h2>4. Propiedad Intelectual</h2>
        <p>El contenido generado por los usuarios a través de nuestras herramientas de IA puede ser utilizado para fines personales y no comerciales. La plataforma y su contenido original, características y funcionalidad son propiedad de Elo Diaz Allende y están protegidos por leyes de propiedad intelectual.</p>

        <h2>5. Limitación de Responsabilidad</h2>
        <p>{t('footer.disclaimer')}</p>

        <h2>6. Modificaciones de los Términos</h2>
        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Le notificaremos de cualquier cambio publicando los nuevos términos en esta página.</p>
        
        <h2>7. Contacto</h2>
        <p>Si tiene alguna pregunta sobre estos Términos, por favor contáctenos en eloallende.openmusicacademy@gmail.com.</p>
      </main>
      <Footer />
    </div>
  );
}
