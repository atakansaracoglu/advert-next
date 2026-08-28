import { NextResponse } from "next/server";

const AUTH_MD = `# auth.md — Advert Dijital Ajans

> Agent authentication metadata for advert.com.tr

## Overview

Advert provides public APIs that do not require authentication for read access.
The contact API accepts unauthenticated POST requests. Agents may optionally
register for client credentials to identify themselves.

## Agent Registration

Agents can register via the OAuth 2.0 Dynamic Client Registration endpoint:

- **Registration endpoint:** \`https://www.advert.com.tr/oauth/register\`
- **Authorization server metadata:** \`https://www.advert.com.tr/.well-known/oauth-authorization-server\`
- **Protected resource metadata:** \`https://www.advert.com.tr/.well-known/oauth-protected-resource\`

### Supported Identity Types

| Type | Description |
|------|-------------|
| \`web_did\` | Decentralized Web Identifier |
| \`email\` | Email-based agent identity |

### Supported Credential Types

| Type | Description |
|------|-------------|
| \`client_credentials\` | OAuth 2.0 client credentials grant |

### Registration Request

\`\`\`http
POST /oauth/register HTTP/1.1
Host: www.advert.com.tr
Content-Type: application/json

{
  "client_name": "My Agent",
  "grant_types": ["client_credentials"],
  "scope": "read contact",
  "contacts": ["agent@example.com"]
}
\`\`\`

## Scopes

| Scope | Description |
|-------|-------------|
| \`read\` | Read public content and service information |
| \`contact\` | Submit contact inquiries via the contact API |

## Public Endpoints (no auth required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| \`/\` | GET | Homepage |
| \`/api/contact\` | POST | Contact form submission |
| \`/robots.txt\` | GET | Robots exclusion rules |
| \`/sitemap.xml\` | GET | Sitemap |
| \`/.well-known/api-catalog\` | GET | API catalog (RFC 9727) |
| \`/.well-known/mcp/server-card.json\` | GET | MCP server card |
| \`/.well-known/agent-skills/index.json\` | GET | Agent skills index |
| \`/.well-known/ai-catalog.json\` | GET | ARD manifest |

## Rate Limiting

60 requests per minute per client. Registered agents may request higher limits.

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
