"use server";

import { headers } from "next/headers";
import { getWaitlistRepository } from "@/lib/waitlist-store";
import { validateWaitlistForm } from "@/lib/waitlist";

export type WaitlistActionResult = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  stored?: boolean;
};

function addTrackingFromReferrer(formData: FormData, referrer: string) {
  if (!referrer) {
    return;
  }

  if (!formData.get("referrer")) {
    formData.set("referrer", referrer);
  }

  try {
    const url = new URL(referrer);
    const trackingFields = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    for (const field of trackingFields) {
      const value = url.searchParams.get(field);

      if (value && !formData.get(field)) {
        formData.set(field, value);
      }
    }
  } catch {
    // Some browsers or proxies can send a non-URL Referer. Keep the raw value only.
  }
}

export async function submitWaitlistAction(formData: FormData): Promise<WaitlistActionResult> {
  const requestHeaders = await headers();
  const fallbackReferrer = requestHeaders.get("referer") ?? "";

  addTrackingFromReferrer(formData, fallbackReferrer);

  const validation = validateWaitlistForm(formData);

  if (!validation.ok) {
    return {
      ok: false,
      message: "Revisá los campos marcados.",
      errors: validation.errors,
    };
  }

  const result = await getWaitlistRepository().save(validation.data);

  return {
    ok: true,
    message: result.stored
      ? "Ya estás en la lista. Te vamos a contactar cuando abramos POCs privados."
      : "Formulario validado. Falta configurar la persistencia para guardar el lead.",
    stored: result.stored,
  };
}
