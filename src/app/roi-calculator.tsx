"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator, RotateCcw } from "lucide-react";

type ProfileKey = "profesional" | "pyme" | "contador" | "multiempresa";

const profiles: Record<
  ProfileKey,
  {
    label: string;
    clients: number;
    volume: number;
    transferPct: number;
    weeklyHours: number;
    monthlyErrors: number;
    dsoDays: number;
  }
> = {
  profesional: {
    label: "Profesional independiente",
    clients: 80,
    volume: 4_000_000,
    transferPct: 60,
    weeklyHours: 8,
    monthlyErrors: 4,
    dsoDays: 28,
  },
  pyme: {
    label: "PyME B2B",
    clients: 150,
    volume: 25_000_000,
    transferPct: 80,
    weeklyHours: 20,
    monthlyErrors: 7,
    dsoDays: 30,
  },
  contador: {
    label: "Estudio contable",
    clients: 250,
    volume: 18_000_000,
    transferPct: 70,
    weeklyHours: 28,
    monthlyErrors: 10,
    dsoDays: 35,
  },
  multiempresa: {
    label: "Varias unidades",
    clients: 240,
    volume: 50_000_000,
    transferPct: 75,
    weeklyHours: 32,
    monthlyErrors: 12,
    dsoDays: 34,
  },
};

function formatARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatHours(value: number) {
  return `${Math.round(value)} hs/mes`;
}

function selectPlan(clients: number, volume: number) {
  if (clients <= 5) return { name: "Starter", monthlyFee: 0, commissionPct: 1 };
  if (clients <= 30) return { name: "Profesional", monthlyFee: 19_000, commissionPct: 1 };
  if (clients <= 200 && volume <= 30_000_000) {
    return { name: "Business", monthlyFee: 79_000, commissionPct: 0.2 };
  }
  if (volume > 30_000_000) return { name: "Business+", monthlyFee: 149_000, commissionPct: 0 };
  return { name: "Contador", monthlyFee: 199_000, commissionPct: 0 };
}

export function ROICalculator() {
  const [profile, setProfile] = useState<ProfileKey>("pyme");
  const [clients, setClients] = useState(profiles.pyme.clients);
  const [volume, setVolume] = useState(profiles.pyme.volume);
  const [transferPct, setTransferPct] = useState(profiles.pyme.transferPct);
  const [weeklyHours, setWeeklyHours] = useState(profiles.pyme.weeklyHours);
  const [hourCost, setHourCost] = useState(3500);
  const [monthlyErrors, setMonthlyErrors] = useState(profiles.pyme.monthlyErrors);
  const [dsoDays, setDsoDays] = useState(profiles.pyme.dsoDays);
  const [capitalCostPct, setCapitalCostPct] = useState(90);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const results = useMemo(() => {
    const transferVolume = volume * (transferPct / 100);
    const monthlyAdminHours = weeklyHours * 4.33;
    const monthlyAdminCost = monthlyAdminHours * hourCost;
    const errorsCost = monthlyErrors * 3000;
    const financialCost = (dsoDays / 365) * volume * (capitalCostPct / 100);
    const totalToday = monthlyAdminCost + errorsCost + financialCost;

    const bindFee = transferVolume * 0.005;
    const plan = selectPlan(clients, volume);
    const klaveFee = plan.monthlyFee + transferVolume * (plan.commissionPct / 100);
    const newAdminHours = monthlyAdminHours * 0.1;
    const newAdminCost = newAdminHours * hourCost;
    const newErrorsCost = monthlyErrors * 0.1 * 3000;
    const newDso = Math.max(dsoDays - 7, 10);
    const newFinancialCost = (newDso / 365) * volume * (capitalCostPct / 100);
    const totalWithKlave = bindFee + klaveFee + newAdminCost + newErrorsCost + newFinancialCost;
    const savings = totalToday - totalWithKlave;
    const roiBase = bindFee + klaveFee || 1;

    return {
      plan,
      monthlyAdminHours,
      totalToday,
      bindFee,
      klaveFee,
      newAdminHours,
      newDso,
      totalWithKlave,
      savings,
      yearlySavings: savings * 12,
      roi: savings / roiBase,
    };
  }, [capitalCostPct, clients, dsoDays, hourCost, monthlyErrors, transferPct, volume, weeklyHours]);

  function applyProfile(nextProfile: ProfileKey) {
    const preset = profiles[nextProfile];
    setProfile(nextProfile);
    setClients(preset.clients);
    setVolume(preset.volume);
    setTransferPct(preset.transferPct);
    setWeeklyHours(preset.weeklyHours);
    setMonthlyErrors(preset.monthlyErrors);
    setDsoDays(preset.dsoDays);
  }

  return (
    <section className="roi-band" id="calculadora">
      <div className="section-inner roi-layout">
        <div className="roi-copy">
          <span className="section-kicker">
            <Calculator size={16} />
            Calculadora ROI
          </span>
          <h2>Pasá de discutir comisión a medir ahorro real.</h2>
          <p>
            Estimá el costo oculto de conciliación, errores y capital inmovilizado
            contra un escenario con cobranza identificada y conciliación automática.
          </p>
          <div className="profile-grid" aria-label="Casos pre-cargados">
            {(Object.keys(profiles) as ProfileKey[]).map((key) => (
              <button
                className={profile === key ? "active" : ""}
                key={key}
                type="button"
                onClick={() => applyProfile(key)}
              >
                {profiles[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="roi-tool">
          <div className="calculator-inputs">
            <label>
              <span>Clientes activos</span>
              <strong>{clients}</strong>
              <input
                min="5"
                max="500"
                type="range"
                value={clients}
                onChange={(event) => setClients(Number(event.target.value))}
              />
            </label>
            <label>
              <span>Facturación mensual</span>
              <strong>{formatARS(volume)}</strong>
              <input
                min="1000000"
                max="80000000"
                step="500000"
                type="range"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </label>
            <label>
              <span>Pago por transferencia</span>
              <strong>{transferPct}%</strong>
              <input
                min="0"
                max="100"
                type="range"
                value={transferPct}
                onChange={(event) => setTransferPct(Number(event.target.value))}
              />
            </label>

            <button
              className="advanced-toggle"
              type="button"
              onClick={() => setShowAdvanced((current) => !current)}
            >
              Ajustar valores avanzados
              <ArrowRight size={16} />
            </button>

            {showAdvanced ? (
              <div className="advanced-grid">
                <label>
                  <span>Horas semanales</span>
                  <strong>{weeklyHours}</strong>
                  <input
                    min="0"
                    max="40"
                    type="range"
                    value={weeklyHours}
                    onChange={(event) => setWeeklyHours(Number(event.target.value))}
                  />
                </label>
                <label>
                  <span>Costo hora admin</span>
                  <strong>{formatARS(hourCost)}</strong>
                  <input
                    min="1500"
                    max="15000"
                    step="500"
                    type="range"
                    value={hourCost}
                    onChange={(event) => setHourCost(Number(event.target.value))}
                  />
                </label>
                <label>
                  <span>Errores por mes</span>
                  <strong>{monthlyErrors}</strong>
                  <input
                    min="0"
                    max="30"
                    type="range"
                    value={monthlyErrors}
                    onChange={(event) => setMonthlyErrors(Number(event.target.value))}
                  />
                </label>
                <label>
                  <span>DSO actual</span>
                  <strong>{dsoDays} días</strong>
                  <input
                    min="5"
                    max="60"
                    type="range"
                    value={dsoDays}
                    onChange={(event) => setDsoDays(Number(event.target.value))}
                  />
                </label>
                <label>
                  <span>Costo financiero anual</span>
                  <strong>{capitalCostPct}%</strong>
                  <input
                    min="40"
                    max="150"
                    type="range"
                    value={capitalCostPct}
                    onChange={(event) => setCapitalCostPct(Number(event.target.value))}
                  />
                </label>
              </div>
            ) : null}
          </div>

          <div className="roi-results">
            <div className="result-card">
              <span>Hoy</span>
              <strong>{formatARS(results.totalToday)}</strong>
              <small>{formatHours(results.monthlyAdminHours)} y DSO {dsoDays} días</small>
            </div>
            <div className="result-card highlighted">
              <span>Con Klave</span>
              <strong>{formatARS(results.totalWithKlave)}</strong>
              <small>
                {results.plan.name}, {formatHours(results.newAdminHours)} y DSO {results.newDso} días
              </small>
            </div>
            <div className="roi-balance">
              <span>Balance neto estimado</span>
              <strong>{formatARS(results.savings)}/mes</strong>
              <small>
                {formatARS(results.yearlySavings)}/año · ROI {results.roi.toFixed(1)}x
              </small>
            </div>
            <dl className="cost-breakdown">
              <div>
                <dt>Comisión BIND estimada</dt>
                <dd>{formatARS(results.bindFee)}</dd>
              </div>
              <div>
                <dt>Plan Klave + variable</dt>
                <dd>{formatARS(results.klaveFee)}</dd>
              </div>
              <div>
                <dt>Plan recomendado</dt>
                <dd>{results.plan.name}</dd>
              </div>
            </dl>
            <button className="reset-button" type="button" onClick={() => applyProfile(profile)}>
              <RotateCcw size={16} />
              Restaurar caso
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
