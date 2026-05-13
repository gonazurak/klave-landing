import type { Metadata } from "next";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const logoSrc = `${basePath}/brand/klave-logo-inverse-transparent.png`;
const homeHref = `${basePath || ""}/`;

export const metadata: Metadata = {
  title: "Privacidad | Klave",
  description: "Política de privacidad preliminar de Klave.",
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href={homeHref} aria-label="Volver a Klave">
          <Image src={logoSrc} alt="Klave" width={491} height={158} priority />
        </a>
      </header>
      <article className="legal-content">
        <span className="section-kicker">Política de privacidad</span>
        <h1>Privacidad de datos</h1>
        <p>
          Esta política preliminar describe cómo Klave recolecta y usa datos de
          contacto enviados en la landing y en conversaciones de acceso temprano.
        </p>

        <h2>Datos que podemos recolectar</h2>
        <p>
          Nombre, email laboral, empresa, CUIT, tamaño de cartera, volumen
          mensual aproximado, perfil de negocio y el mensaje enviado por el
          formulario.
        </p>

        <h2>Finalidad</h2>
        <p>
          Usamos estos datos para responder consultas, priorizar POCs privados,
          validar demanda y entender necesidades de tesorería digital en PyMEs
          B2B argentinas.
        </p>

        <h2>No custodia de fondos</h2>
        <p>
          La dirección actual de Klave es operar como software de tesorería, sin
          custodiar fondos de clientes. La información bancaria operativa se
          definirá en contratos y consentimientos específicos antes de cualquier
          integración real.
        </p>

        <h2>Derechos del titular</h2>
        <p>
          Podés pedir acceso, rectificación o eliminación de tus datos escribiendo
          a <a href="mailto:hola@klave.com.ar">hola@klave.com.ar</a>.
        </p>

        <p className="legal-note">
          Documento placeholder para etapa pre-MVP. Debe ser reemplazado por una
          versión legal revisada antes de activar base de datos, analytics
          productivos o onboarding de clientes.
        </p>
      </article>
    </main>
  );
}
