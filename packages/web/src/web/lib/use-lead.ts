import { useMutation } from "@tanstack/react-query";
import { api } from "./api";

export interface LeadInput {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  message?: string;
  source: "register" | "enroll" | "contact" | "demo";
}

/** Saves a lead to the database (shows up in the /admin leads CMS). */
export function useSubmitLead() {
  return useMutation({
    mutationFn: async (input: LeadInput) => {
      const res = await api.leads.$post({ json: input });
      return res.json();
    },
  });
}
