import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export type Pricing = {
  currency: string;
  originalPrice: number;
  dealPrice: number;
  discountPercent: number;
  gstPercent: number;
  offerEnabled: boolean;
  offerHours: number;
};

/** Defaults mirror the seeded settings so there is no flash before the fetch. */
export const PRICING_DEFAULTS: Pricing = {
  currency: "₹",
  originalPrice: 3691,
  dealPrice: 3137,
  discountPercent: 15,
  gstPercent: 18,
  offerEnabled: true,
  offerHours: 48,
};

/**
 * Live pricing + offer config, editable from /admin.
 * Returns preformatted Indian-grouped strings alongside the raw numbers.
 */
export function usePricing() {
  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const res = await api.settings.$get();
      if (!res.ok) throw new Error("Failed to load settings");
      const json = (await res.json()) as { settings: Pricing };
      return json.settings;
    },
    initialData: PRICING_DEFAULTS,
    staleTime: 60_000,
  });

  const p = data ?? PRICING_DEFAULTS;
  const fmt = (n: number) => `${p.currency}${n.toLocaleString("en-IN")}`;

  return {
    ...p,
    fmt,
    /** e.g. "₹3,691" */
    orig: fmt(p.originalPrice),
    /** e.g. "₹3,137" */
    deal: fmt(p.dealPrice),
    /** number only, e.g. "3,691" */
    origNum: p.originalPrice.toLocaleString("en-IN"),
    /** number only, e.g. "3,137" */
    dealNum: p.dealPrice.toLocaleString("en-IN"),
  };
}
