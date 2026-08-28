"use client";

import { useEffect } from "react";

export default function WebMCP() {
  useEffect(() => {
    const nav = navigator as Navigator & {
      modelContext?: {
        provideContext: (ctx: {
          tools: Array<{
            name: string;
            description: string;
            inputSchema: Record<string, unknown>;
            execute: (input: Record<string, unknown>) => Promise<unknown>;
          }>;
        }) => void;
      };
    };

    if (!nav.modelContext?.provideContext) return;

    nav.modelContext.provideContext({
      tools: [
        {
          name: "get_services",
          description:
            "Get the list of digital services offered by Advert agency in Antalya",
          inputSchema: { type: "object", properties: {} },
          execute: async () => ({
            services: [
              {
                name: "Web Tasarım",
                description:
                  "Kurumsal web sitesi, e-ticaret, landing page tasarımı",
              },
              {
                name: "Dijital Reklamcılık",
                description: "Google Ads, Meta Ads, sosyal medya yönetimi",
              },
              {
                name: "Video Prodüksiyon",
                description: "Tanıtım filmi, drone çekimi, sosyal medya videoları",
              },
              {
                name: "Otomasyon",
                description: "İş süreçleri otomasyonu, yapay zeka entegrasyonu",
              },
              {
                name: "SEO",
                description: "Arama motoru optimizasyonu, teknik SEO",
              },
            ],
          }),
        },
        {
          name: "get_contact_info",
          description: "Get contact information for Advert digital agency",
          inputSchema: { type: "object", properties: {} },
          execute: async () => ({
            company: "Advert Dijital Ajans",
            location: "Antalya, Türkiye",
            website: "https://www.advert.com.tr",
            contactEndpoint: "https://www.advert.com.tr/api/contact",
            social: {
              facebook: "https://www.facebook.com/advert.com.tr",
              instagram: "https://www.instagram.com/advert.com.tr",
              tiktok: "https://tiktok.com/@advert.com.tr",
              linkedin: "https://www.linkedin.com/company/advertcomtr/",
            },
          }),
        },
        {
          name: "submit_contact",
          description:
            "Submit a contact inquiry to Advert agency. Requires name, email, and message.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Full name" },
              email: { type: "string", description: "Email address" },
              phone: { type: "string", description: "Phone number (optional)" },
              message: { type: "string", description: "Message content" },
            },
            required: ["name", "email", "message"],
          },
          execute: async (input: Record<string, unknown>) => {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            });
            if (!res.ok) return { error: "Failed to submit contact form" };
            return { success: true, message: "Contact form submitted successfully" };
          },
        },
      ],
    });
  }, []);

  return null;
}
