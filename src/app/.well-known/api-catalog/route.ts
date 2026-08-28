import { NextResponse } from "next/server";

export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://www.advert.com.tr/api/contact",
        "service-desc": [
          {
            href: "https://www.advert.com.tr/.well-known/api-catalog",
            type: "application/linkset+json",
          },
        ],
        "service-doc": [
          {
            href: "https://www.advert.com.tr",
            type: "text/html",
          },
        ],
      },
    ],
  };

  return NextResponse.json(catalog, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
