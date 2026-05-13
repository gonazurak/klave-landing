import type { Metadata } from "next";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const logoSrc = `${basePath}/brand/klave-logo-inverse-transparent.png`;
const homeHref = `${basePath || ""}/`;

export const metadata: Metadata = {
  title: "Términos | Klave",
  description: "Términos preliminares de uso de Klave.",
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href={homeHref} aria-label="Volver a Klave">
          <Image src={logoSrc} alt="Klave" width={491} height={158} priority />
        </a>
      </header>
      <article className="legal-content">
        <span className="section-kicker">Términos de uso</span>
        <h1>Términos preliminares</h1>
        <p>
          Klave se encuentra en etapa pre-MVP. La información publicada en este
          sitio describe una propuesta de producto y no constituye una oferta
          comercial definitiva ni una prestación bancaria o financiera regulada.
        </p>

        <h2>Acceso temprano</h2>
        <p>
          El ingreso a la lista de espera no garantiza disponibilidad inmediata,
          precio final, integración con bancos o aceptación dentro de un POC.
        </p>

        <h2>Software de tesorería</h2>
        <p>
          La dirección actual del producto es proveer software para visibilidad,
          conciliación y automatización operativa. Klave no debe ser interpretado
          como entidad financiera, banco, PSPCP ni custodio de fondos.
        </p>

        <h2>Integraciones</h2>
        <p>
          Las menciones a bancos, ERPs o servicios externos reflejan integraciones
          planificadas o investigadas. Su disponibilidad depende de acuerdos,
          APIs, permisos y validaciones técnicas.
        </p>

        <h2>Precios</h2>
        <p>
          Los precios publicados son una vista preliminar para validación de
          demanda y pueden cambiar antes del lanzamiento comercial.
        </p>

        <p className="legal-note">
          Documento placeholder para etapa pre-MVP. Debe ser reemplazado por
          términos legales revisados antes de cobrar, integrar cuentas bancarias o
          procesar datos productivos.
        </p>
      </article>
    </main>
  );
}
