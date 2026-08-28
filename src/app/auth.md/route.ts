import { NextResponse } from "next/server";

const AUTH_MD = `# Auth.md — Advert Dijital Ajans

> Agent authentication metadata for advert.com.tr

## Overview

Advert's public website and contact API do not require authentication.
All endpoints listed below are open and do not need tokens or credentials.

## Public Endpoints

| Endpoint | Method | Auth Required |
|---|---|---|
| \`/\` | GET | No |
| \`/api/contact\` | POST | No |
| \`/robots.txt\` | GET | No |
| \`/sitemap.xml\` | GET | No |
| \`/.well-known/api-catalog\` | GET | No |
| \`/.well-known/mcp/server-card.json\` | GET | No |
| \`/.well-known/agent-skills/index.json\` | GET | No |
| \`/.well-known/ai-catalog.json\` | GET | No |

## Agent Registration

No agent registration is required. All APIs are publicly accessible.

## Rate Limiting

Please be respectful of our resources. We recommend no more than 60 requests per minute.

## Contact

For API questions: https://www.advert.com.tr/#iletisim
`;

export function GET() {
  return new NextResponse(AUTH_MD, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
