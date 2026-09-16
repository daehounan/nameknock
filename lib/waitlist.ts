export const PRODUCT_KIND_OPTIONS = [
  { value: "saas", label: "I’m naming a SaaS" },
  { value: "app", label: "I’m naming an app" },
  { value: "other", label: "Other" },
] as const;

export const SCREEN_VOLUME_OPTIONS = [
  { value: "1-5", label: "1–5 names / month" },
  { value: "6-20", label: "6–20 names / month" },
  { value: "21-plus", label: "21+ names / month" },
] as const;

export type ProductKind = (typeof PRODUCT_KIND_OPTIONS)[number]["value"];
export type ScreenVolume = (typeof SCREEN_VOLUME_OPTIONS)[number]["value"];

export type WaitlistEntry = {
  email: string;
  productKind?: ProductKind;
  screenVolume?: ScreenVolume;
  createdAt: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCT_KIND_VALUES = new Set<ProductKind>(
  PRODUCT_KIND_OPTIONS.map((option) => option.value),
);
const SCREEN_VOLUME_VALUES = new Set<ScreenVolume>(
  SCREEN_VOLUME_OPTIONS.map((option) => option.value),
);

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email) && email.length <= 254;
}

function isProductKind(value: string): value is ProductKind {
  return PRODUCT_KIND_VALUES.has(value as ProductKind);
}

function isScreenVolume(value: string): value is ScreenVolume {
  return SCREEN_VOLUME_VALUES.has(value as ScreenVolume);
}

export function parseProductKind(value: string): ProductKind | "" {
  return isProductKind(value) ? value : "";
}

export function parseScreenVolume(value: string): ScreenVolume | "" {
  return isScreenVolume(value) ? value : "";
}

function optionalChoice<T extends string>(
  raw: unknown,
  allowed: Set<T>,
  error: string,
): { value?: T; error?: string } {
  if (raw === undefined || raw === null || raw === "") {
    return {};
  }

  if (typeof raw !== "string") {
    return { error };
  }

  const value = raw.trim();
  if (!value) {
    return {};
  }

  if (!allowed.has(value as T)) {
    return { error };
  }

  return { value: value as T };
}

export function parseWaitlistEntry(input: unknown): WaitlistEntry | { error: string } {
  if (typeof input !== "object" || input === null) {
    return { error: "Invalid request." };
  }

  const record = input as Record<string, unknown>;
  const emailRaw = typeof record.email === "string" ? record.email.trim() : "";

  if (!emailRaw) {
    return { error: "Email is required." };
  }

  if (!isValidEmail(emailRaw)) {
    return { error: "Enter a valid email address." };
  }

  const productKind = optionalChoice(
    record.productKind,
    PRODUCT_KIND_VALUES,
    "Choose what you are naming, or leave it blank.",
  );
  if (productKind.error) {
    return { error: productKind.error };
  }

  const screenVolume = optionalChoice(
    record.screenVolume,
    SCREEN_VOLUME_VALUES,
    "Choose how many names you screen, or leave it blank.",
  );
  if (screenVolume.error) {
    return { error: screenVolume.error };
  }

  const entry: WaitlistEntry = {
    email: emailRaw.toLowerCase(),
    createdAt: new Date().toISOString(),
  };

  if (productKind.value) {
    entry.productKind = productKind.value;
  }

  if (screenVolume.value) {
    entry.screenVolume = screenVolume.value;
  }

  return entry;
}
