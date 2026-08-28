import { NextResponse } from "next/server";

export function GET() {
  const metadata = {
    resource: "https://www.advert.com.tr",
    authorization_servers: ["https://www.advert.com.tr"],
    scopes_supported: ["read", "contact"],
    bearer_methods_supported: ["header"],
    resource_documentation: "https://www.advert.com.tr/auth.md",
  };

  return NextResponse.json(metadata, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
