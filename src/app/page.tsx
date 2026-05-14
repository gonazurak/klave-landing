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
import { ROICalculator } from "./roi-calculator";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const logoSrc = `${basePath}/brand/klave-logo-inverse-transparent.png`;
const privacyHref = `${basePath}/privacidad/`;
const termsHref = `${basePath}/terminos/`;

const metrics = [
  { label: "Cuenta 1", value: "$32,8M", detail: "Cuenta principal", trend: "+12,4%" },
  { label: "Cuenta 2", value: "$18,6M", detail: "Cuenta operativa", trend: "+8,7%" },
  { label: "Cuenta 3", value: "$9,8M", detail: "Cuenta secundaria", trend: "+5,2%" },
  { label: "Cuenta 4", value: "$4,1M", detail: "Cuenta pagos", trend: "+3,1%" },
  { label: "Total disponible", value: "$65,3M", detail: "En 4 cuentas", trend: "+9,8%" },
];

const flows = [
  { icon: WalletCards, title: "Cobrás claro", text: "Cada ingreso llega con contexto para entender qué pasó." },
  { icon: ReceiptText, title: "Ordenás la caja", text: "Saldos, cobros y pendientes viven en una vista única." },
  { icon: FileCheck2, title: "Cerrás más rápido", text: "Menos cruces manuales y menos seguimiento por mensajes." },
  { icon: BanknoteArrowDown, title: "Pagás con control", text: "Preparás egresos y vencimientos sin perder trazabilidad." },
];

const painPoints = [
  {
    title: "Comprobantes por WhatsApp",
    text: "Cada pago exige pedir, reenviar y validar capturas manualmente.",
  },
  {
    title: "Horas conciliando pagos",
    text: "El equipo pierde tiempo cruzando cobros, pagos y planillas.",
  },
  {
    title: "Cuentas y bancos separados",
    text: "La caja real queda repartida entre portales y extractos.",
  },
  {
    title: "Pendientes fuera del tablero",
    text: "Vencimientos, aprobaciones y seguimiento viven en otro circuito.",
  },
];

const bottomBenefits = [
  { icon: Landmark, title: "Multi-banco" },
  { icon: Clock3, title: "Visibilidad en tiempo real" },
  { icon: BanknoteArrowDown, title: "Pagos automáticos" },
  { icon: ReceiptText, title: "Cierre operativo" },
];

const integrations = [
  { name: "Cuentas", detail: "Vista consolidada para seguir saldos y movimientos sin saltar entre portales." },
  { name: "Cobros", detail: "Seguimiento más claro de ingresos, pendientes y pagos sin identificar." },
  { name: "Pagos", detail: "Preparación de egresos, vencimientos y aprobaciones desde el mismo tablero." },
  { name: "Conciliación", detail: "Menos planillas y menos tareas repetidas al cerrar la operación diaria." },
  { name: "Reportes", detail: "Información lista para revisar caja, evolución y próximos compromisos." },
  { name: "Equipo", detail: "Un lugar compartido para tesorería, dirección y asesoría contable." },
];

const plans = [
  {
    name: "Starter",
    fee: "USD 0",
    commission: "1,0%",
    cap: "USD 5",
    customers: "5",
    payments: "100/mes",
    bestFor: "Prueba real con pocos clientes.",
  },
  {
    name: "Profesional",
    fee: "USD 19",
    commission: "1,0%",
    cap: "USD 10",
    customers: "30",
    payments: "500/mes",
    bestFor: "Profesionales con cobranza recurrente.",
  },
  {
    name: "Business",
    fee: "USD 79",
    commission: "0,2%",
    cap: "USD 20",
    customers: "200",
    payments: "Ilimitado",
    bestFor: "Empresas con mayor operación mensual.",
  },
  {
    name: "Business+",
    fee: "USD 149",
    commission: "0%",
    cap: "Sin cap",
    customers: "500",
    payments: "Ilimitado",
    bestFor: "Volumen alto con costo mensual predecible.",
  },
  {
    name: "Contador",
    fee: "USD 199",
    commission: "0%",
    cap: "Sin cap",
    customers: "50 sub-clientes",
    payments: "Ilimitado",
    bestFor: "Estudios contables multi-empresa.",
  },
];

const faqs = [
  {
    question: "¿Para quién es Klave?",
    answer:
      "Para empresas, profesionales y estudios contables que quieren ordenar cobros, pagos y caja diaria.",
  },
  {
    question: "¿Tengo que cambiar mi operación?",
    answer:
      "No de entrada. La idea es empezar con un diagnóstico corto y adaptar el piloto a tu forma actual de trabajar.",
  },
  {
    question: "¿Cuándo puedo probarlo?",
    answer:
      "Estamos abriendo acceso temprano con casos privados. Si tu operación encaja, te contactamos para avanzar.",
  },
];

function CashFlowChart() {
  return (
    <div className="cashflow-chart" aria-hidden="true">
      <div className="cashflow-grid" />
      <svg viewBox="0 0 520 170" preserveAspectRatio="none">
        <defs>
          <linearGradient id="cashflowFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3ddc97" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#3ddc97" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          className="cashflow-fill"
          d="M8 132 C44 124 70 118 104 121 C144 124 166 98 204 103 C242 108 260 83 296 86 C336 89 360 66 398 70 C438 74 462 49 512 42 L512 162 L8 162 Z"
        />
        <path
          className="cashflow-line real"
          d="M8 132 C44 124 70 118 104 121 C144 124 166 98 204 103 C242 108 260 83 296 86"
        />
        <path
          className="cashflow-line projected"
          d="M296 86 C336 89 360 66 398 70 C438 74 462 49 512 42"
        />
        <circle cx="296" cy="86" r="5" />
      </svg>
      <div className="chart-tooltip">
        <span>16 may</span>
        <strong>$58,2M</strong>
      </div>
      <div className="chart-scale">
        <span>$80M</span>
        <span>$60M</span>
        <span>$40M</span>
        <span>$20M</span>
      </div>
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
              <a href="#calculadora">ROI</a>
              <a href="#integraciones">Conexiones</a>
              <a href="#control">Control</a>
              <a href="#pricing">Precios</a>
              <a href="#waitlist">Contacto</a>
            </nav>
            <div className="header-actions">
              <a className="nav-cta" href="#waitlist">Lista de espera</a>
            </div>
          </div>
          </header>

        <div className="hero-grid">
          <div className="hero-copy" id="top">
            <h1>
              La tesorería digital <span>de tu empresa</span>
            </h1>
            <p>
              Ordená cobros, pagos y caja diaria desde una misma vista.
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
              </span>
              <span>
                <BanknoteArrowDown size={20} />
                Pagos automáticos
              </span>
              <span>
                <ReceiptText size={20} />
                Conciliación inteligente
              </span>
            </div>
          </div>

          <div className="hero-product" id="producto" aria-label="Vista producto Klave">
            <aside className="app-sidebar" aria-hidden="true">
              <div className="app-mark">
                <Image src={logoSrc} alt="" width={491} height={158} />
              </div>
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
                    <em>{metric.detail}</em>
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
                      ["Cliente recurrente", "$ 1.250.000,00", "Acreditado"],
                      ["Factura recurrente", "$ 850.000,00", "Acreditado"],
                      ["Abono mensual", "$ 620.000,00", "Acreditado"],
                      ["Orden comercial", "$ 415.000,00", "Acreditado"],
                      ["Anticipo recibido", "$ 230.000,00", "Acreditado"],
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
                      ["Proveedor logístico", "$ 2.150.000,00", "Programado"],
                      ["Servicios digitales", "$ 1.780.000,00", "Programado"],
                      ["Insumos operativos", "$ 950.000,00", "Programado"],
                      ["Infraestructura cloud", "$ 620.000,00", "Programado"],
                      ["Campaña comercial", "$ 480.000,00", "Programado"],
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
                    <span>Pendientes operativos</span>
                    <CircleDollarSign size={15} />
                  </div>
                  <div className="table-list">
                    {[
                      ["Vencimiento próximo", "$ 1.200.000,00", "Pendiente"],
                      ["Cobro por revisar", "$ 850.000,00", "Pendiente"],
                      ["Pago por aprobar", "$ 650.000,00", "Revisar"],
                      ["Egreso diferido", "$ 300.000,00", "Revisar"],
                      ["Movimiento menor", "$ 210.000,00", "Revisar"],
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
                  <CashFlowChart />
                </section>
                <section className="sync-panel">
                  <div className="panel-heading">
                    <span>Integraciones y sincronización</span>
                    <RefreshCw size={16} />
                  </div>
                  {["Cuentas", "Cobros", "Pagos", "Reportes"].map((item) => (
                    <div className="sync-row" key={item}>
                      <span>{item}</span>
                      <strong>Al día</strong>
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

      <section className="problem-band" id="control">
        <div className="section-inner problem-grid">
          <div className="problem-copy">
            <span className="section-kicker">Tesorería operativa</span>
            <h2>
              Menos persecución de comprobantes.
              <br />
              Más control de caja.
            </h2>
            <p>
              Klave centraliza cobros, pagos, saldos y conciliación para que el
              seguimiento diario no dependa de mensajes sueltos ni planillas.
            </p>
          </div>
          <div className="pain-grid">
            {painPoints.map((point) => (
              <div className="pain-item" key={point.title}>
                <Clock3 size={18} />
                <div>
                  <strong>{point.title}</strong>
                  <span>{point.text}</span>
                </div>
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

      <ROICalculator />

      <section className="integrations-band" id="integraciones">
        <div className="section-inner integrations-layout">
          <div className="section-heading">
            <span className="section-kicker">Conexiones</span>
            <h2>Tu operación de tesorería, más ordenada y fácil de seguir.</h2>
          </div>
          <div className="integration-grid">
            {integrations.map((integration) => (
              <article className="integration-card" key={integration.name}>
                <strong>{integration.name}</strong>
                <p>{integration.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-band" id="pricing">
        <div className="section-inner pricing-layout">
          <div className="pricing-copy">
            <span className="section-kicker">Acceso temprano</span>
            <h2>Planes pensados para validar rápido y crecer con volumen.</h2>
            <p>
              El modelo combina abono mensual con comisión decreciente, evitando
              castigar operaciones de mayor volumen.
            </p>
          </div>
          <div className="pricing-table-wrap">
            <table className="pricing-table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Abono</th>
                  <th>Comisión</th>
                  <th>Cap</th>
                  <th>Clientes</th>
                  <th>Pagos</th>
                  <th>Uso recomendado</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.name}>
                    <th scope="row">{plan.name}</th>
                    <td>{plan.fee}</td>
                    <td>{plan.commission}</td>
                    <td>{plan.cap}</td>
                    <td>{plan.customers}</td>
                    <td>{plan.payments}</td>
                    <td>{plan.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pricing-cards" aria-label="Planes">
            {plans.map((plan) => (
              <article className="pricing-card" key={plan.name}>
                <div>
                  <span>{plan.name}</span>
                  <strong>{plan.fee}</strong>
                </div>
                <dl>
                  <div>
                    <dt>Comisión</dt>
                    <dd>{plan.commission}</dd>
                  </div>
                  <div>
                    <dt>Cap</dt>
                    <dd>{plan.cap}</dd>
                  </div>
                  <div>
                    <dt>Clientes</dt>
                    <dd>{plan.customers}</dd>
                  </div>
                  <div>
                    <dt>Pagos</dt>
                    <dd>{plan.payments}</dd>
                  </div>
                </dl>
                <p>{plan.bestFor}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-band" id="faq">
        <div className="section-inner faq-layout">
          <div className="section-heading">
            <span className="section-kicker">Dudas frecuentes</span>
            <h2>Lo mínimo para saber si tiene sentido avanzar.</h2>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <article className="faq-item" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
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
              Ideal para empresas con cobranza recurrente, operación manual o
              poca visibilidad diaria de caja.
            </p>
            <p className="waitlist-note">
              Acceso temprano con condiciones preferenciales para los primeros
              casos privados.
            </p>
          </div>
          <form
            action="mailto:hola@klave.com.ar"
            className="signup-form"
            encType="text/plain"
            method="post"
          >
            <input
              aria-hidden="true"
              autoComplete="off"
              name="website"
              tabIndex={-1}
              type="text"
              style={{ display: "none" }}
            />
            <input name="utm_source" type="hidden" />
            <input name="utm_medium" type="hidden" />
            <input name="utm_campaign" type="hidden" />
            <input name="utm_term" type="hidden" />
            <input name="utm_content" type="hidden" />
            <input name="referrer" type="hidden" />
            <label>
              Nombre
              <input name="name" placeholder="Nombre y apellido" type="text" required />
            </label>
            <label>
              Email laboral
              <input name="email" type="email" placeholder="gonzalo@empresa.com" required />
            </label>
            <label>
              Empresa
              <input name="company_name" type="text" placeholder="Nombre de la empresa" required />
            </label>
            <label>
              CUIT
              <input name="cuit" inputMode="numeric" placeholder="30-XXXXXXXX-X" type="text" />
            </label>
            <label>
              Tamaño de cartera
              <select name="client_count_range" defaultValue="" required>
                <option disabled value="">Seleccionar rango</option>
                <option value="0-10">0-10 clientes</option>
                <option value="10-50">10-50 clientes</option>
                <option value="50-200">50-200 clientes</option>
                <option value="200+">200+ clientes</option>
              </select>
            </label>
            <label>
              Perfil
              <select name="vertical" defaultValue="" required>
                <option disabled value="">Seleccionar perfil</option>
                <option value="profesional">Profesional independiente</option>
                <option value="empresa">Empresa</option>
                <option value="contador">Estudio contable</option>
                <option value="otro">Otro</option>
              </select>
            </label>
            <label>
              Volumen mensual
              <select name="monthly_volume_range" defaultValue="" required>
                <option disabled value="">Seleccionar volumen</option>
                <option value="0-5m">Hasta $5M/mes</option>
                <option value="5-20m">$5M-$20M/mes</option>
                <option value="20-50m">$20M-$50M/mes</option>
                <option value="50m+">$50M+/mes</option>
              </select>
            </label>
            <label className="full-field">
              Qué querés resolver
              <textarea
                name="message"
                placeholder="Contanos brevemente qué querés ordenar de tu tesorería..."
                rows={3}
              />
            </label>
            <button type="submit">
              Unirme a la lista
              <Zap size={18} />
            </button>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="footer-brand" href="#top" aria-label="Klave">
            <Image src={logoSrc} alt="Klave" width={491} height={158} />
          </a>
          <p>La tesorería digital de tu empresa.</p>
          <nav aria-label="Footer">
            <a href="#producto">Producto</a>
            <a href="#flujo">Cómo funciona</a>
            <a href="#calculadora">ROI</a>
            <a href="#pricing">Precios</a>
            <a href="#faq">FAQ</a>
            <a href={privacyHref}>Privacidad</a>
            <a href={termsHref}>Términos</a>
            <a href="#waitlist">Contacto</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
