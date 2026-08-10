import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, budget, message, turnstileToken } = body;

    if (!name || !email || !service) {
      return Response.json({ error: "Gerekli alanları doldurun." }, { status: 400 });
    }

    const tsRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET!,
        response: turnstileToken || "",
      }),
    });
    const tsData = await tsRes.json();
    if (!tsData.success) {
      return Response.json({ error: "Bot doğrulaması başarısız." }, { status: 403 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Advert Web" <${process.env.SMTP_USER}@advert.com.tr>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Yeni Proje Talebi — ${name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;color:#1a1a1a">
          <h2 style="margin:0 0 24px;font-size:20px;font-weight:600">Yeni Proje Talebi</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;width:140px">Ad Soyad</td><td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:500">${name}</td></tr>
            ${company ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Şirket</td><td style="padding:10px 0;border-bottom:1px solid #eee">${company}</td></tr>` : ""}
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">E-posta</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="mailto:${email}" style="color:#1e7bd6">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Telefon</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="tel:${phone}" style="color:#1e7bd6">${phone}</a></td></tr>` : ""}
            <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Hizmet</td><td style="padding:10px 0;border-bottom:1px solid #eee">${service}</td></tr>
            ${budget ? `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#666">Bütçe</td><td style="padding:10px 0;border-bottom:1px solid #eee">${budget}</td></tr>` : ""}
          </table>
          ${message ? `<div style="margin-top:24px;padding:16px;background:#f8f8f8;border-radius:8px;font-size:14px;line-height:1.7;white-space:pre-wrap">${message}</div>` : ""}
          <p style="margin-top:32px;font-size:12px;color:#999">Bu mesaj advert.com.tr iletişim formundan gönderildi.</p>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return Response.json({ error: "Mail gönderilemedi." }, { status: 500 });
  }
}
