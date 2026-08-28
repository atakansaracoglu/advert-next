import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MARKDOWN_CONTENT = `# Advert Dijital Ajans

Antalya merkezli yapay zeka destekli dijital ajans.

## Hizmetlerimiz

- **Web Tasarım** — Kurumsal web sitesi ve e-ticaret çözümleri
- **Dijital Reklamcılık** — Google Ads, Meta Ads yönetimi
- **Video Prodüksiyon** — Tanıtım filmi, drone çekimi
- **Otomasyon** — İş süreçleri otomasyonu
- **SEO** — Arama motoru optimizasyonu

## İletişim

- Web: [advert.com.tr](https://www.advert.com.tr)
- Konum: Antalya, Türkiye

## Agent Discovery

- [robots.txt](https://www.advert.com.tr/robots.txt)
- [sitemap.xml](https://www.advert.com.tr/sitemap.xml)
- [API Catalog](https://www.advert.com.tr/.well-known/api-catalog)
- [MCP Server Card](https://www.advert.com.tr/.well-known/mcp/server-card.json)
- [Agent Skills](https://www.advert.com.tr/.well-known/agent-skills/index.json)
- [AI Catalog (ARD)](https://www.advert.com.tr/.well-known/ai-catalog.json)

## Contact API

POST \`/api/contact\` with JSON body:

\`\`\`json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
\`\`\`
`;

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";

  if (
    request.nextUrl.pathname === "/" &&
    accept.includes("text/markdown") &&
    !accept.includes("text/html")
  ) {
    return new NextResponse(MARKDOWN_CONTENT, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(MARKDOWN_CONTENT.length),
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
