import Header from "@/components/header";
import Footer from "@/components/footer";
import { translations } from "@/lib/translations";

const t = (key: any) => translations.es[key as any] || key;

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container py-20 md:py-32 prose prose-invert max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent !mb-10">
          {t('footer.privacy')}
        </h1>

        <h2>1. Información que Recopilamos</h2>
        <p>Recopilamos información que usted nos proporciona directamente al crear una cuenta, como su nombre y dirección de correo electrónico. También recopilamos datos generados por el uso de nuestros servicios, como las descripciones textuales para la generación de contenido de IA y las imágenes para el análisis facial.</p>
        
        <h2>2. Uso de la Información</h2>
        <p>Utilizamos la información para:</p>
        <ul>
          <li>Proveer, operar y mantener nuestros servicios.</li>
          <li>Mejorar, personalizar y expandir nuestros servicios.</li>
          <li>Comprender y analizar cómo utiliza nuestros servicios.</li>
          <li>Procesar sus transacciones.</li>
          <li>Comunicarnos con usted para servicio al cliente, para proporcionarle actualizaciones y otra información relacionada con el servicio.</li>
        </ul>

        <h2>3. Seguridad de los Datos</h2>
        <p>La seguridad de sus datos es importante para nosotros. Las imágenes cargadas para el análisis facial no se almacenan en nuestros servidores después de que el análisis se ha completado y la respuesta ha sido enviada. Los textos y otras entradas se procesan de forma anónima en la medida de lo posible.</p>

        <h2>4. No Compartimos su Información</h2>
        <p>No vendemos, intercambiamos ni transferimos de ningún otro modo su información de identificación personal a terceros. Esto no incluye a terceros de confianza que nos asisten en la operación de nuestro sitio web o en la prestación de servicios, siempre que dichas partes se comprometan a mantener esta información confidencial.</p>

        <h2>5. Cambios en esta Política de Privacidad</h2>
        <p>Podemos actualizar nuestra Política de Privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página.</p>

        <h2>6. Contacto</h2>
        <p>Si tiene alguna pregunta sobre esta Política de Privacidad, por favor contáctenos en eloallende.openmusicacademy@gmail.com.</p>
      </main>
      <Footer />
    </div>
  );
}
