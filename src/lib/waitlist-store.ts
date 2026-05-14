import type { WaitlistLead } from "./waitlist";

export type WaitlistSaveResult =
  | { stored: true; id?: string }
  | { stored: false; reason: string };

export interface WaitlistRepository {
  save(lead: WaitlistLead): Promise<WaitlistSaveResult>;
}

class NoopWaitlistRepository implements WaitlistRepository {
  async save(): Promise<WaitlistSaveResult> {
    return {
      stored: false,
      reason: "DATABASE_URL no está configurada; lead validado sin persistencia.",
    };
  }
}

class NeonPendingRepository implements WaitlistRepository {
  async save(): Promise<WaitlistSaveResult> {
    return {
      stored: false,
      reason:
        "DATABASE_URL está configurada, pero falta instalar y conectar el driver Neon elegido.",
    };
  }
}

export function getWaitlistRepository(): WaitlistRepository {
  if (!process.env.DATABASE_URL) {
    return new NoopWaitlistRepository();
  }

  return new NeonPendingRepository();
}

export const waitlistTableSql = `
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  cuit TEXT,
  company_name TEXT NOT NULL,
  client_count_range TEXT NOT NULL,
  vertical TEXT NOT NULL,
  monthly_volume_range TEXT NOT NULL,
  message TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;
