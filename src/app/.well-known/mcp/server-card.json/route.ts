import { NextResponse } from "next/server";

export function GET() {
  const serverCard = {
    serverInfo: {
      name: "Advert Dijital Ajans",
      version: "1.0.0",
      description:
        "Antalya merkezli yapay zeka destekli dijital ajans. Web tasarim, otomasyon, video produksiyon ve dijital reklamcilik hizmetleri.",
      url: "https://www.advert.com.tr",
    },
    capabilities: {
      contact: {
        description: "Iletisim formu uzerinden mesaj gonderme",
        endpoint: "https://www.advert.com.tr/api/contact",
        method: "POST",
      },
    },
    transport: {
      type: "https",
      endpoint: "https://www.advert.com.tr",
    },
  };

  return NextResponse.json(serverCard, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
