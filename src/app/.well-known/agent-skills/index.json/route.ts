import { NextResponse } from "next/server";

export function GET() {
  const index = {
    $schema:
      "https://agentskills.io/schemas/agent-skills-index-v0.2.0.json",
    skills: [
      {
        name: "contact-form",
        type: "api",
        description:
          "Submit a contact inquiry to Advert digital agency via the contact form API.",
        url: "https://www.advert.com.tr/api/contact",
      },
      {
        name: "services-info",
        type: "content",
        description:
          "Browse Advert's digital services: web design, automation, video production, digital advertising, SEO.",
        url: "https://www.advert.com.tr/#hizmetlerimiz",
      },
      {
        name: "portfolio",
        type: "content",
        description:
          "View Advert's project portfolio and case studies.",
        url: "https://www.advert.com.tr/#projelerimiz",
      },
    ],
  };

  return NextResponse.json(index, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
