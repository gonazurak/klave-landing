"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calculator, RotateCcw } from "lucide-react";

type ProfileKey = "profesional" | "pyme" | "contador" | "multiempresa";
type PlanKey = "starter" | "professional" | "business" | "businessPlus" | "accountant";

type CalculatorTrackingPayload = {
  activeClients: number;
  monthlyVolume: number;
  transferPct: number;
  selectedPlan: string;
  estimatedMonthlySavings: number;
  roi: number;
};

const BUSINESS_ASSUMPTIONS = {
  arsPerUsd: 1000,
  weeksPerMonth: 4.33,
  defaultHourCostARS: 3500,
  defaultErrorCostARS: 3000,
  defaultCapitalCostPct: 90,
  defaultBankCommissionPct: 0.5,
  expectedAdminReductionPct: 90,
  expectedErrorReductionPct: 90,
  expectedDsoReductionDays: 7,
  minDsoWithKlaveDays: 10,
  estimatedPaymentsPerClientMonthly: 1.5,
} as const;

const PLANS: Record<
  PlanKey,
  {
    name: string;
    monthlyFeeUsd: number;
    commissionPct: number;
    commissionCapUsd?: number;
  }
> = {
  starter: { name: "Starter", monthlyFeeUsd: 0, commissionPct: 1, commissionCapUsd: 5 },
  professional: {
    name: "Profesional",
    monthlyFeeUsd: 19,
    commissionPct: 1,
    commissionCapUsd: 10,
  },
  business: { name: "Business", monthlyFeeUsd: 79, commissionPct: 0.2, commissionCapUsd: 20 },
  businessPlus: { name: "Business+", monthlyFeeUsd: 149, commissionPct: 0 },
  accountant: { name: "Contador", monthlyFeeUsd: 199, commissionPct: 0 },
};

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
  if (clients <= 5) return PLANS.starter;
  if (clients <= 30) return PLANS.professional;
  if (clients <= 200 && volume <= 30_000_000) return PLANS.business;
  if (volume > 30_000_000) return PLANS.businessPlus;
  return PLANS.accountant;
}

function estimateVariableFee(
  transferVolume: number,
  commissionPct: number,
  commissionCapUsd: number | undefined,
  estimatedMonthlyPayments: number,
) {
  const percentageFee = transferVolume * (commissionPct / 100);
  if (!commissionCapUsd) return percentageFee;

  const monthlyCapARS =
    commissionCapUsd * BUSINESS_ASSUMPTIONS.arsPerUsd * estimatedMonthlyPayments;
  return Math.min(percentageFee, monthlyCapARS);
}

function trackCalculatorUsed(payload: CalculatorTrackingPayload) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("calculator_used", {
      detail: payload,
    }),
  );
}

export function ROICalculator() {
  const [profile, setProfile] = useState<ProfileKey>("pyme");
  const [clients, setClients] = useState(profiles.pyme.clients);
  const [volume, setVolume] = useState(profiles.pyme.volume);
  const [transferPct, setTransferPct] = useState(profiles.pyme.transferPct);
  const [weeklyHours, setWeeklyHours] = useState(profiles.pyme.weeklyHours);
  const [hourCost, setHourCost] = useState<number>(BUSINESS_ASSUMPTIONS.defaultHourCostARS);
  const [monthlyErrors, setMonthlyErrors] = useState(profiles.pyme.monthlyErrors);
  const [dsoDays, setDsoDays] = useState(profiles.pyme.dsoDays);
  const [capitalCostPct, setCapitalCostPct] = useState<number>(
    BUSINESS_ASSUMPTIONS.defaultCapitalCostPct,
  );
  const [bankCommissionPct, setBankCommissionPct] = useState<number>(
    BUSINESS_ASSUMPTIONS.defaultBankCommissionPct,
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const hasTrackedInitialUse = useRef(false);

  const results = useMemo(() => {
    const transferVolume = volume * (transferPct / 100);
    const monthlyAdminHours = weeklyHours * BUSINESS_ASSUMPTIONS.weeksPerMonth;
    const monthlyAdminCost = monthlyAdminHours * hourCost;
    const errorsCost = monthlyErrors * BUSINESS_ASSUMPTIONS.defaultErrorCostARS;
    const financialCost = (dsoDays / 365) * volume * (capitalCostPct / 100);
    const totalToday = monthlyAdminCost + errorsCost + financialCost;

    const estimatedMonthlyPayments = Math.max(
      clients,
      Math.round(clients * BUSINESS_ASSUMPTIONS.estimatedPaymentsPerClientMonthly),
    );
    const bankFee = transferVolume * (bankCommissionPct / 100);
    const plan = selectPlan(clients, volume);
    const planFeeARS = plan.monthlyFeeUsd * BUSINESS_ASSUMPTIONS.arsPerUsd;
    const klaveVariableFee = estimateVariableFee(
      transferVolume,
      plan.commissionPct,
      plan.commissionCapUsd,
      estimatedMonthlyPayments,
    );
    const klaveFee = planFeeARS + klaveVariableFee;
    const newAdminHours =
      monthlyAdminHours * (1 - BUSINESS_ASSUMPTIONS.expectedAdminReductionPct / 100);
    const newAdminCost = newAdminHours * hourCost;
    const newErrorsCost =
      monthlyErrors *
      (1 - BUSINESS_ASSUMPTIONS.expectedErrorReductionPct / 100) *
      BUSINESS_ASSUMPTIONS.defaultErrorCostARS;
    const newDso = Math.max(
      dsoDays - BUSINESS_ASSUMPTIONS.expectedDsoReductionDays,
      BUSINESS_ASSUMPTIONS.minDsoWithKlaveDays,
    );
    const newFinancialCost = (newDso / 365) * volume * (capitalCostPct / 100);
    const totalWithKlave = bankFee + klaveFee + newAdminCost + newErrorsCost + newFinancialCost;
    const savings = totalToday - totalWithKlave;
    const roiBase = bankFee + klaveFee || 1;

    return {
      plan,
      monthlyAdminHours,
      transferVolume,
      totalToday,
      bankFee,
      klaveFee,
      estimatedMonthlyPayments,
      newAdminHours,
      newDso,
      totalWithKlave,
      savings,
      yearlySavings: savings * 12,
      roi: savings / roiBase,
    };
  }, [
    bankCommissionPct,
    capitalCostPct,
    clients,
    dsoDays,
    hourCost,
    monthlyErrors,
    transferPct,
    volume,
    weeklyHours,
  ]);

  useEffect(() => {
    if (!hasTrackedInitialUse.current) {
      hasTrackedInitialUse.current = true;
      return;
    }

    const timeout = window.setTimeout(() => {
      trackCalculatorUsed({
        activeClients: clients,
        monthlyVolume: volume,
        transferPct,
        selectedPlan: results.plan.name,
        estimatedMonthlySavings: Math.round(results.savings),
        roi: Number(results.roi.toFixed(2)),
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [clients, results.plan.name, results.roi, results.savings, transferPct, volume]);

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
            Una estimación orientativa para comparar conciliación manual, errores y capital
            inmovilizado contra un escenario con cobranza identificada y conciliación automática.
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
              <span>% cobrado por transferencia</span>
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
              aria-expanded={showAdvanced}
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
                  <span>Costo bancario estimado</span>
                  <strong>{bankCommissionPct.toFixed(1)}%</strong>
                  <input
                    min="0"
                    max="1.5"
                    step="0.1"
                    type="range"
                    value={bankCommissionPct}
                    onChange={(event) => setBankCommissionPct(Number(event.target.value))}
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
              <span>Hoy, estimado</span>
              <strong>{formatARS(results.totalToday)}</strong>
              <small>{formatHours(results.monthlyAdminHours)} y DSO {dsoDays} días</small>
            </div>
            <div className="result-card highlighted">
              <span>Escenario con Klave</span>
              <strong>{formatARS(results.totalWithKlave)}</strong>
              <small>
                {results.plan.name}, {formatHours(results.newAdminHours)} y DSO {results.newDso} días
              </small>
            </div>
            <div className="roi-balance">
              <span>Balance orientativo</span>
              <strong>{formatARS(results.savings)}/mes</strong>
              <small>
                {formatARS(results.yearlySavings)}/año · ROI estimado {results.roi.toFixed(1)}x
              </small>
            </div>
            <dl className="cost-breakdown">
              <div>
                <dt>Costo bancario estimado</dt>
                <dd>{formatARS(results.bankFee)}</dd>
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
            <p className="roi-assumptions">
              Supone USD {BUSINESS_ASSUMPTIONS.arsPerUsd.toLocaleString("es-AR")} de referencia,
              {` ${results.estimatedMonthlyPayments.toLocaleString("es-AR")} pagos/mes estimados `}
              y mejoras operativas esperadas, no garantizadas.
            </p>
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
