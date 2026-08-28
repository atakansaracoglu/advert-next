import { NextResponse } from "next/server";

export function GET() {
  const metadata = {
    issuer: "https://www.advert.com.tr",
    authorization_endpoint: "https://www.advert.com.tr/oauth/authorize",
    token_endpoint: "https://www.advert.com.tr/oauth/token",
    registration_endpoint: "https://www.advert.com.tr/oauth/register",
    scopes_supported: ["read", "contact"],
    response_types_supported: ["code"],
    grant_types_supported: [
      "authorization_code",
      "client_credentials",
    ],
    token_endpoint_auth_methods_supported: ["client_secret_post"],
    service_documentation: "https://www.advert.com.tr/auth.md",
    agent_auth: {
      register_uri: "https://www.advert.com.tr/oauth/register",
      identity_types_supported: ["web_did", "email"],
      credential_types_supported: ["client_credentials"],
      claim_url: "https://www.advert.com.tr/oauth/claim",
    },
  };

  return NextResponse.json(metadata, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
