import {
  ArrowRight,
  BadgeCheck,
  BanknoteArrowDown,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Landmark,
  Layers3,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const logoSrc = `${basePath}/brand/klave-logo-inverse-transparent.png`;

const metrics = [
  { label: "Macro", value: "$32.840.650,75", trend: "+12,4%" },
  { label: "Galicia", value: "$18.560.210,40", trend: "+8,7%" },
  { label: "BBVA", value: "$9.784.120,30", trend: "+5,2%" },
  { label: "Santander", value: "$4.125.870,22", trend: "+3,1%" },
  { label: "Total disponible", value: "$65.310.851,67", trend: "+9,8%" },
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

const bottomBenefits = [
  { icon: Landmark, title: "Multi-banco" },
  { icon: Clock3, title: "Visibilidad en tiempo real" },
  { icon: BanknoteArrowDown, title: "Automatización de pagos" },
  { icon: ReceiptText, title: "Conciliación con tu ERP" },
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

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <header className="site-header">
          <div className="header-inner">
            <a className="brand" href="#top" aria-label="Klave">
              <Image src={logoSrc} alt="Klave" width={491} height={158} priority />
            </a>
            <nav className="nav-links" aria-label="Principal">
              <a href="#producto">Producto</a>
              <a href="#flujo">Cómo funciona</a>
              <a href="#integraciones">Integraciones</a>
              <a href="#seguridad">Seguridad</a>
              <a href="#pricing">Precios</a>
              <a href="#waitlist">Contacto</a>
            </nav>
            <div className="header-actions">
              <a className="login-link" href="#waitlist">Iniciar sesión</a>
              <a className="nav-cta" href="#waitlist">Unirme a la lista de espera</a>
            </div>
          </div>
          </header>

        <div className="hero-grid">
          <div className="hero-copy" id="top">
            <h1>
              La tesorería digital <span>de tu empresa</span>
            </h1>
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
            <div className="value-strip" aria-label="Beneficios principales">
              <span>
                <BadgeCheck size={20} />
                Cobros identificados
                <small>por CVU único</small>
              </span>
              <span>
                <BanknoteArrowDown size={20} />
                Pagos automatizados
                <small>y programados</small>
              </span>
              <span>
                <ReceiptText size={20} />
                Conciliación inteligente
                <small>con tu ERP</small>
              </span>
            </div>
          </div>

          <div className="hero-product" id="producto" aria-label="Vista producto Klave">
            <aside className="app-sidebar" aria-hidden="true">
              <div className="app-mark">»</div>
              <span className="active"><WalletCards size={17} /></span>
              <span><Layers3 size={17} /></span>
              <span><Landmark size={17} /></span>
              <span><BanknoteArrowDown size={17} /></span>
              <span><ReceiptText size={17} /></span>
              <span><TrendingUp size={17} /></span>
              <span><ShieldCheck size={17} /></span>
            </aside>

            <div className="app-content">
              <div className="product-topbar">
                <div>
                  <strong>Resumen</strong>
                  <span>Visión general de tu tesorería</span>
                </div>
                <div className="sync-pill">
                  12-13 may 2026
                </div>
              </div>

              <span className="panel-label">Saldos en bancos</span>
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
                <section className="table-panel">
                  <div className="panel-heading">
                    <span>Cobros identificados (hoy)</span>
                    <ArrowRight size={15} />
                  </div>
                  <div className="table-list">
                    {[
                      ["ACME S.A.", "$ 1.250.000,00", "Acreditado"],
                      ["Distribuidora del Norte", "$ 850.000,00", "Acreditado"],
                      ["Servicios Integrales S.R.L.", "$ 620.000,00", "Acreditado"],
                      ["Alimentos del Sur S.A.", "$ 415.000,00", "Acreditado"],
                      ["Grupo Constructor SA", "$ 230.000,00", "Acreditado"],
                    ].map(([name, amount, status]) => (
                      <div className="table-row" key={name}>
                        <span>{name}</span>
                        <strong>{amount}</strong>
                        <small>{status}</small>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="table-panel">
                  <div className="panel-heading">
                    <span>Pagos a proveedores programados</span>
                    <ArrowRight size={15} />
                  </div>
                  <div className="table-list">
                    {[
                      ["Logística Andina S.A.", "$ 2.150.000,00", "Programado"],
                      ["Tech Solutions S.R.L.", "$ 1.780.000,00", "Programado"],
                      ["Papeles del Plata S.A.", "$ 950.000,00", "Programado"],
                      ["Servicios Cloud S.A.", "$ 620.000,00", "Programado"],
                      ["Publicidad Total S.R.L.", "$ 480.000,00", "Programado"],
                    ].map(([name, amount, status]) => (
                      <div className="table-row" key={name}>
                        <span>{name}</span>
                        <strong>{amount}</strong>
                        <small className="muted">{status}</small>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="table-panel echeq-panel">
                  <div className="panel-heading">
                    <span>Cola ECHEQ</span>
                    <CircleDollarSign size={15} />
                  </div>
                  <div className="table-list">
                    {[
                      ["ECHEQ #0001245", "$ 1.200.000,00", "Pendiente"],
                      ["ECHEQ #0001244", "$ 850.000,00", "Pendiente"],
                      ["ECHEQ #0001243", "$ 650.000,00", "Para firmar"],
                      ["ECHEQ #0001242", "$ 300.000,00", "Para firmar"],
                      ["ECHEQ #0001241", "$ 210.000,00", "Para firmar"],
                    ].map(([name, amount, status]) => (
                      <div className="table-row" key={name}>
                        <span>{name}</span>
                        <strong>{amount}</strong>
                        <small className="warning">{status}</small>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="dashboard-bottom">
                <section className="cash-panel">
                  <div className="panel-heading">
                    <span>Flujo de caja proyectado</span>
                    <TrendingUp size={16} />
                  </div>
                  <MiniTrend />
                </section>
                <section className="sync-panel">
                  <div className="panel-heading">
                    <span>Integraciones y sincronización</span>
                    <RefreshCw size={16} />
                  </div>
                  {["SAP Business One", "Microsoft Dynamics 365", "SiAP", "Bancos (4)"].map((item) => (
                    <div className="sync-row" key={item}>
                      <span>{item}</span>
                      <strong>Sincronizado</strong>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <p>Todo lo que tu tesorería necesita, en un solo lugar</p>
          <div className="benefit-grid">
            {bottomBenefits.map((item) => (
              <span key={item.title}>
                <item.icon size={22} />
                {item.title}
              </span>
            ))}
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
                {index < flows.length - 1 ? (
                  <div className="flow-arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </div>
                ) : null}
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
