import { ENV } from "./env";

const NEWSLETTER_SOURCE = "newsletter";
const NEWSLETTER_TAG = "AUTOMATIONSKURS_COLDPLAY";
const DEFAULT_TAG = "AUTOMATIONSKURS_LEAD";
const NEWSLETTER_LIST_ID = 146;
const DEFAULT_LIST_ID = 147;

type LeadRouting = {
  tag: string;
  listId: number;
};

type LeadInput = {
  email: string;
  phone: string;
  utmSource?: string | null;
};

type QuentnTerm = {
  id: number;
  name: string;
};

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
}

function buildLeadRouting(utmSource?: string | null): LeadRouting {
  if ((utmSource ?? "").trim().toLowerCase() === NEWSLETTER_SOURCE) {
    return {
      tag: NEWSLETTER_TAG,
      listId: NEWSLETTER_LIST_ID,
    };
  }

  return {
    tag: DEFAULT_TAG,
    listId: DEFAULT_LIST_ID,
  };
}

function hasValidApiConfig() {
  return Boolean(ENV.quentnApiBaseUrl) && Boolean(ENV.quentnApiKey);
}

async function quentnRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!hasValidApiConfig()) {
    throw new Error("Quentn API is not configured");
  }

  const requestUrl = `${normalizeBaseUrl(ENV.quentnApiBaseUrl)}${path.replace(/^\/+/, "")}`;
  const response = await fetch(requestUrl, {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.quentnApiKey}`,
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? safeParseJson(text) : null;

  if (!response.ok) {
    const errorMessage =
      (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string" && payload.message) ||
      (payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" && payload.error) ||
      text ||
      "Unknown Quentn API error";

    throw new Error(`Quentn request failed (${response.status}): ${errorMessage}`);
  }

  return payload as T;
}

function safeParseJson(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parseTermId(payload: unknown): number | null {
  if (!payload || typeof payload !== "object" || !("id" in payload)) {
    return null;
  }

  const rawId = (payload as { id?: unknown }).id;
  const parsed = typeof rawId === "number" ? rawId : Number(rawId);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

async function getOrCreateTermId(termName: string): Promise<number> {
  const term = await quentnRequest<QuentnTerm | null>(`terms/${encodeURIComponent(termName)}`, {
    method: "GET",
  }).catch(() => null);

  if (term?.id) {
    return term.id;
  }

  const created = await quentnRequest<{ id?: number | string }>("terms", {
    method: "POST",
    body: JSON.stringify({ name: termName }),
  });

  const termId = parseTermId(created);
  if (!termId) {
    throw new Error("Could not create term in Quentn");
  }

  return termId;
}

function parseContactId(payload: unknown): number | null {
  if (!payload || typeof payload !== "object" || !("id" in payload)) {
    return null;
  }

  const rawId = (payload as { id?: unknown }).id;
  const contactId = typeof rawId === "number" ? rawId : Number(rawId);

  if (!Number.isFinite(contactId)) {
    return null;
  }

  return contactId;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();

  if (!trimmed) return false;
  if (!/^[0-9+\s()./-]+$/.test(trimmed)) return false;

  const plusOccurrences = (trimmed.match(/\+/g) || []).length;
  if (plusOccurrences > 1) return false;
  if (plusOccurrences === 1 && !trimmed.startsWith("+")) return false;

  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function createOrUpdateQuentnLead(input: LeadInput): Promise<{
  contactId: number;
  tag: string;
  listId: number;
}> {
  const routing = buildLeadRouting(input.utmSource);
  const termId = await getOrCreateTermId(routing.tag);

  const createdContact = await quentnRequest<{ id?: number | string }>("contact", {
    method: "POST",
    body: JSON.stringify({
      contact: {
        mail: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        list_id: routing.listId,
      },
      duplicate_check_method: "email",
      duplicate_merge_method: "update_add",
      return_fields: ["id"],
    }),
  });

  const contactId = parseContactId(createdContact);
  if (!contactId) {
    throw new Error("Quentn did not return a contact id");
  }

  await quentnRequest<{ success?: string }>(`contact/${contactId}/terms`, {
    method: "PUT",
    body: JSON.stringify([termId]),
  });

  return {
    contactId,
    tag: routing.tag,
    listId: routing.listId,
  };
}
