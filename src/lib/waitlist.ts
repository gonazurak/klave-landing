export const clientCountRanges = ["0-10", "10-50", "50-200", "200+"] as const;
export const verticals = ["profesional", "empresa", "contador", "otro"] as const;
export const monthlyVolumeRanges = ["0-5m", "5-20m", "20-50m", "50m+"] as const;

export type ClientCountRange = (typeof clientCountRanges)[number];
export type Vertical = (typeof verticals)[number];
export type MonthlyVolumeRange = (typeof monthlyVolumeRanges)[number];

export type WaitlistLead = {
  email: string;
  name: string;
  companyName: string;
  cuit?: string;
  clientCountRange: ClientCountRange;
  vertical: Vertical;
  monthlyVolumeRange: MonthlyVolumeRange;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
};

export type WaitlistValidationResult =
  | { ok: true; data: WaitlistLead }
  | { ok: false; errors: Record<string, string> };

const EMAIL_MAX_LENGTH = 254;
const TEXT_MAX_LENGTH = 120;
const MESSAGE_MAX_LENGTH = 1000;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeOptionalText(value: string, maxLength = TEXT_MAX_LENGTH) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return undefined;
  }

  return normalized.slice(0, maxLength);
}

function isOneOf<T extends readonly string[]>(value: string, options: T): value is T[number] {
  return options.includes(value);
}

function normalizeCuit(value: string) {
  return value.replace(/\D/g, "");
}

function isValidCuit(value: string) {
  if (!/^\d{11}$/.test(value)) {
    return false;
  }

  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  const digits = value.split("").map(Number);
  const sum = weights.reduce((total, weight, index) => total + weight * digits[index], 0);
  const mod = 11 - (sum % 11);
  const checkDigit = mod === 11 ? 0 : mod === 10 ? 9 : mod;

  return checkDigit === digits[10];
}

export function validateWaitlistForm(formData: FormData): WaitlistValidationResult {
  const errors: Record<string, string> = {};
  const honeypot = readString(formData, "website");

  if (honeypot) {
    errors.website = "No pudimos procesar el formulario.";
  }

  const email = readString(formData, "email").toLowerCase();
  if (!email) {
    errors.email = "Ingresá un email laboral.";
  } else if (
    email.length > EMAIL_MAX_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.email = "Ingresá un email válido.";
  }

  const name = normalizeOptionalText(readString(formData, "name"));
  if (!name) {
    errors.name = "Ingresá tu nombre.";
  }

  const companyName = normalizeOptionalText(readString(formData, "company_name"));
  if (!companyName) {
    errors.company_name = "Ingresá el nombre de la empresa.";
  }

  const rawCuit = readString(formData, "cuit");
  const cuit = rawCuit ? normalizeCuit(rawCuit) : undefined;
  if (cuit && !isValidCuit(cuit)) {
    errors.cuit = "Ingresá un CUIT válido de 11 dígitos.";
  }

  const clientCountRange = readString(formData, "client_count_range");
  if (!isOneOf(clientCountRange, clientCountRanges)) {
    errors.client_count_range = "Seleccioná el tamaño de cartera.";
  }

  const vertical = readString(formData, "vertical");
  if (!isOneOf(vertical, verticals)) {
    errors.vertical = "Seleccioná un perfil.";
  }

  const monthlyVolumeRange = readString(formData, "monthly_volume_range");
  if (!isOneOf(monthlyVolumeRange, monthlyVolumeRanges)) {
    errors.monthly_volume_range = "Seleccioná el volumen mensual.";
  }

  const message = normalizeOptionalText(readString(formData, "message"), MESSAGE_MAX_LENGTH);
  const utmSource = normalizeOptionalText(readString(formData, "utm_source"));
  const utmMedium = normalizeOptionalText(readString(formData, "utm_medium"));
  const utmCampaign = normalizeOptionalText(readString(formData, "utm_campaign"));
  const utmTerm = normalizeOptionalText(readString(formData, "utm_term"));
  const utmContent = normalizeOptionalText(readString(formData, "utm_content"));
  const referrer = normalizeOptionalText(readString(formData, "referrer"), 500);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      email,
      name: name as string,
      companyName: companyName as string,
      cuit,
      clientCountRange: clientCountRange as ClientCountRange,
      vertical: vertical as Vertical,
      monthlyVolumeRange: monthlyVolumeRange as MonthlyVolumeRange,
      message,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      referrer,
    },
  };
}
