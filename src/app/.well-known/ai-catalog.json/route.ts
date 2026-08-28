import { NextResponse } from "next/server";

export function GET() {
  const catalog = {
    specVersion: "1.0.0",
    host: {
      name: "Advert Dijital Ajans",
      url: "https://www.advert.com.tr",
      description:
        "Antalya merkezli yapay zeka destekli dijital ajans. Web tasarim, otomasyon, video produksiyon ve dijital reklamcilik hizmetleri.",
    },
    entries: [
      {
        identifier: "urn:air:advert.com.tr:contact:api",
        displayName: "Advert Contact API",
        type: "application/json",
        url: "https://www.advert.com.tr/api/contact",
        description: "Contact form endpoint for inquiries",
        representativeQueries: [
          "How can I contact Advert agency?",
          "Send a message to Advert",
          "Request a quote from Advert",
          "Get in touch with Advert digital agency",
        ],
      },
      {
        identifier: "urn:air:advert.com.tr:mcp:server-card",
        displayName: "Advert MCP Server Card",
        type: "application/json",
        url: "https://www.advert.com.tr/.well-known/mcp/server-card.json",
        description: "MCP server card for agent discovery",
        representativeQueries: [
          "What capabilities does Advert offer for AI agents?",
          "Discover Advert MCP server",
        ],
      },
      {
        identifier: "urn:air:advert.com.tr:skills:index",
        displayName: "Advert Agent Skills",
        type: "application/json",
        url: "https://www.advert.com.tr/.well-known/agent-skills/index.json",
        description: "Agent skills discovery index",
        representativeQueries: [
          "What skills does Advert provide for AI agents?",
          "List Advert agent capabilities",
        ],
      },
      {
        identifier: "urn:air:advert.com.tr:catalog:api",
        displayName: "Advert API Catalog",
        type: "application/linkset+json",
        url: "https://www.advert.com.tr/.well-known/api-catalog",
        description: "API catalog for automated API discovery (RFC 9727)",
        representativeQueries: [
          "What APIs does Advert expose?",
          "Discover Advert API endpoints",
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
