import {
  ArrowRight,
  BadgeCheck,
  BanknoteArrowDown,
  Building2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Landmark,
  Layers3,
  LockKeyhole,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import Image from "next/image";

const logoSrc = "/brand/klave-logo-inverse-transparent.png";

const metrics = [
  { label: "Cobros identificados", value: "$18,4M", trend: "+23%" },
  { label: "Pagos programados", value: "$9,8M", trend: "12 órdenes" },
  { label: "Conciliación ERP", value: "98,7%", trend: "Bejerman" },
];

const flows = [
  { icon: WalletCards, title: "CVU único", text: "Cada cliente paga a su identificador." },
  { icon: ReceiptText, title: "Match automático", text: "Klave reconoce quién pagó sin comprobantes." },
  { icon: FileCheck2, title: "ERP conciliado", text: "La cobranza queda lista para imputar." },
  { icon: BanknoteArrowDown, title: "Pagos salientes", text: "Proveedores y reglas desde una vista." },
];

const painPoints = [
  "Comprobantes por WhatsApp",
  "Horas conciliando pagos",
  "Cuentas y bancos separados",
  "ECHEQs fuera del tablero",
];

const plans = [
  { name: "Starter", price: "$0", detail: "Para validar con pocos clientes" },
  { name: "Profesional", price: "USD 19", detail: "Independientes con cobranza recurrente" },
  { name: "Business", price: "USD 79", detail: "PyMEs B2B con tesorería activa" },
];

function MiniTrend() {
  return (
    <div className="trend" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flow-arrow" aria-hidden="true">
      <ChevronRight size={18} />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero-grid">
          <header className="site-header">
            <a className="brand" href="#top" aria-label="Klave">
              <Image src={logoSrc} alt="Klave" width={491} height={158} priority />
            </a>
            <nav className="nav-links" aria-label="Principal">
              <a href="#producto">Producto</a>
              <a href="#flujo">Cómo funciona</a>
              <a href="#pricing">Pricing</a>
            </nav>
            <a className="nav-cta" href="#waitlist">
              Acceso temprano
            </a>
          </header>

          <div className="hero-copy" id="top">
            <div className="eyebrow">
              <Sparkles size={16} />
              B2B · Multi-banco · ERP-ready
            </div>
            <h1>La tesorería digital de tu empresa</h1>
            <p>
              Cobrá identificado, pagá automatizado, conciliá con tu ERP.
              Multi-banco.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#waitlist">
                Unirme a la lista de espera
                <ArrowRight size={18} />
              </a>
              <a className="secondary-button" href="#flujo">
                Ver cómo funciona
              </a>
            </div>
            <div className="trust-row" aria-label="Señales de confianza">
              <span>
                <ShieldCheck size={16} />
                Sin custodia de fondos
              </span>
              <span>
                <LockKeyhole size={16} />
                Banco como rail
              </span>
            </div>
          </div>

          <div className="hero-product" id="producto" aria-label="Vista producto Klave">
            <div className="product-topbar">
              <div>
                <span>Tablero de tesorería</span>
                <strong>Mayo 2026</strong>
              </div>
              <div className="sync-pill">
                <RefreshCw size={14} />
                ERP sincronizado
              </div>
            </div>

            <div className="metric-grid">
              {metrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.trend}</small>
                </article>
              ))}
            </div>

            <div className="dashboard-main">
              <section className="cash-panel">
                <div className="panel-heading">
                  <span>Flujo consolidado</span>
                  <TrendingUp size={18} />
                </div>
                <MiniTrend />
                <div className="cash-row">
                  <span>Hoy</span>
                  <strong>$4,2M disponibles</strong>
                </div>
              </section>

              <section className="activity-panel">
                <div className="panel-heading">
                  <span>Movimientos identificados</span>
                  <BadgeCheck size={18} />
                </div>
                <div className="activity-list">
                  <div>
                    <span className="dot aqua" />
                    <p>Bernini Textil</p>
                    <strong>$1.250.000</strong>
                  </div>
                  <div>
                    <span className="dot blue" />
                    <p>Romano Servicios</p>
                    <strong>$730.000</strong>
                  </div>
                  <div>
                    <span className="dot amber" />
                    <p>Pago proveedor</p>
                    <strong>Programado</strong>
                  </div>
                </div>
              </section>
            </div>

            <div className="bank-strip">
              <span>
                <Landmark size={16} />
                BIND
              </span>
              <span>
                <Building2 size={16} />
                Bejerman
              </span>
              <span>
                <Layers3 size={16} />
                Multi-empresa
              </span>
              <span>
                <CircleDollarSign size={16} />
                ECHEQ
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="problem-band">
        <div className="section-inner problem-grid">
          <div>
            <span className="section-kicker">Tesorería operativa</span>
            <h2>Menos persecución de comprobantes. Más control de caja.</h2>
          </div>
          <div className="pain-grid">
            {painPoints.map((point) => (
              <div className="pain-item" key={point}>
                <Clock3 size={18} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flow-band" id="flujo">
        <div className="section-inner">
          <div className="section-heading">
            <span className="section-kicker">Cómo funciona</span>
            <h2>Del pago entrante a la conciliación, sin perder trazabilidad.</h2>
          </div>
          <div className="flow-grid">
            {flows.map((item, index) => (
              <div className="flow-step" key={item.title}>
                <item.icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                {index < flows.length - 1 ? <FlowArrow /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-band" id="pricing">
        <div className="section-inner pricing-layout">
          <div>
            <span className="section-kicker">Acceso temprano</span>
            <h2>Planes pensados para validar rápido y crecer con volumen.</h2>
            <p>
              El modelo combina abono mensual con comisión decreciente, evitando
              castigar operaciones B2B de ticket alto.
            </p>
          </div>
          <div className="plans-grid">
            {plans.map((plan) => (
              <article className="plan-card" key={plan.name}>
                <span>{plan.name}</span>
                <strong>{plan.price}</strong>
                <p>{plan.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="waitlist-band" id="waitlist">
        <div className="section-inner waitlist-panel">
          <div>
            <span className="section-kicker">Waitlist privada</span>
            <h2>Entrá primero cuando abramos los POCs.</h2>
            <p>
              Ideal para empresas con cobranza recurrente, múltiples cuentas,
              ECHEQs o conciliación manual contra ERP.
            </p>
          </div>
          <form className="signup-form">
            <label>
              Email laboral
              <input type="email" placeholder="gonzalo@empresa.com" />
            </label>
            <label>
              Empresa
              <input type="text" placeholder="Nombre de la empresa" />
            </label>
            <button type="button">
              Unirme a la lista
              <Zap size={18} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
