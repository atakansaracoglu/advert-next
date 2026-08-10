"use client";

import { useEffect, useRef } from "react";

const PRIVACY_CONTENT = `
<h4>1. Veri Sorumlusu</h4>
<p>Advert Dijital Ajans ("Şirket"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında veri sorumlusu sıfatıyla kişisel verilerinizi aşağıda açıklanan amaçlar doğrultusunda işlemektedir.</p>

<h4>2. İşlenen Kişisel Veriler</h4>
<p>Web sitemiz üzerinden iletişim formu aracılığıyla ad-soyad, e-posta adresi, telefon numarası, şirket adı ve mesaj içeriği gibi kişisel verileriniz toplanmaktadır. Ayrıca çerez (cookie) teknolojileri aracılığıyla IP adresi, tarayıcı bilgileri ve site kullanım verileri işlenebilmektedir.</p>

<h4>3. Kişisel Verilerin İşlenme Amaçları</h4>
<p>Toplanan kişisel veriler; hizmet taleplerinizin değerlendirilmesi, sizinle iletişime geçilmesi, teklif hazırlanması, hizmet kalitesinin artırılması, yasal yükümlülüklerin yerine getirilmesi ve güvenlik amacıyla bot koruması (Cloudflare Turnstile) kapsamında işlenmektedir.</p>

<h4>4. Kişisel Verilerin Aktarılması</h4>
<p>Kişisel verileriniz, e-posta iletim hizmeti sağlayıcısı (SMTP2GO) ve güvenlik hizmeti sağlayıcısı (Cloudflare) ile yasal zorunluluklar çerçevesinde yetkili kamu kurum ve kuruluşlarına aktarılabilmektedir. Verileriniz yurt dışına aktarılması halinde KVKK'nın 9. maddesi kapsamında gerekli önlemler alınmaktadır.</p>

<h4>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h4>
<p>Kişisel verileriniz, web sitemizdeki formlar ve çerezler aracılığıyla elektronik ortamda toplanmaktadır. Verilerin işlenmesinin hukuki sebebi; KVKK'nın 5/2-c (sözleşmenin ifası), 5/2-f (meşru menfaat) ve 5/1 (açık rıza) bentleridir.</p>

<h4>6. Veri Sahibinin Hakları</h4>
<p>KVKK'nın 11. maddesi uyarınca; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme, kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme, KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme haklarına sahipsiniz.</p>

<h4>7. Çerez Politikası</h4>
<p>Web sitemiz, kullanıcı deneyimini iyileştirmek, site trafiğini analiz etmek ve güvenlik sağlamak amacıyla çerezler kullanmaktadır. Tarayıcınızın ayarlarından çerezleri devre dışı bırakabilirsiniz; ancak bu durumda sitenin bazı işlevleri kısıtlanabilir.</p>

<h4>8. Veri Güvenliği</h4>
<p>Şirketimiz, kişisel verilerinizin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek ile verilerin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik SSL şifreleme, güvenlik duvarı ve erişim kontrolü gibi gerekli teknik ve idari tedbirleri almaktadır.</p>

<h4>9. İletişim</h4>
<p>Kişisel verilerinizle ilgili her türlü talep ve sorularınız için <strong>info@advert.com.tr</strong> adresinden bizimle iletişime geçebilirsiniz.</p>

<p style="margin-top:1.2rem;font-size:.72rem;opacity:.4">Son güncelleme: Ağustos 2026</p>
`;

const TERMS_CONTENT = `
<h4>1. Taraflar</h4>
<p>İşbu Kullanım Koşulları, advert.com.tr web sitesini ("Site") ziyaret eden veya kullanan gerçek ve tüzel kişiler ("Kullanıcı") ile Advert Dijital Ajans ("Şirket") arasındaki ilişkiyi düzenlemektedir.</p>

<h4>2. Hizmet Kapsamı</h4>
<p>Şirket; web tasarım, otomasyon, video prodüksiyon ve dijital reklamcılık alanlarında hizmet vermektedir. Site üzerinden sunulan bilgiler tanıtım amaçlıdır ve bağlayıcı teklif niteliği taşımaz. Hizmet koşulları, her proje için ayrıca düzenlenecek sözleşme ile belirlenir.</p>

<h4>3. Fikri Mülkiyet Hakları</h4>
<p>Site üzerindeki tüm içerik, tasarım, logo, grafik, metin, görsel ve yazılımlar 5846 sayılı Fikir ve Sanat Eserleri Kanunu ve ilgili mevzuat kapsamında Şirket'in mülkiyetindedir. İzinsiz kopyalama, çoğaltma, dağıtma veya işleme yasaktır.</p>

<h4>4. Kullanıcı Yükümlülükleri</h4>
<p>Kullanıcı, Siteyi hukuka ve ahlaka uygun şekilde kullanmayı, iletişim formlarında doğru bilgi vermeyi ve Sitenin güvenliğini tehdit edecek eylemlerden kaçınmayı kabul eder. 5651 sayılı Kanun kapsamında hukuka aykırı içerik paylaşılması halinde sorumluluk kullanıcıya aittir.</p>

<h4>5. Sorumluluk Sınırı</h4>
<p>Şirket, Site üzerindeki bilgilerin doğruluğu, eksiksizliği ve güncelliği konusunda garanti vermez. Site'nin kesintisiz veya hatasız çalışacağı taahhüt edilmez. Sitedeki bilgilere dayanılarak alınan kararlardan doğabilecek doğrudan veya dolaylı zararlardan Şirket sorumlu tutulamaz.</p>

<h4>6. Üçüncü Taraf Bağlantılar</h4>
<p>Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Şirket, bu sitelerin içerik ve gizlilik uygulamalarından sorumlu değildir. Bu sitelerin kullanımı, ilgili sitenin kendi kullanım koşullarına tabidir.</p>

<h4>7. Mücbir Sebepler</h4>
<p>Doğal afetler, savaş, grev, altyapı arızaları, siber saldırılar ve benzeri mücbir sebep halleri nedeniyle Sitenin geçici veya kalıcı olarak erişilemez olması durumunda Şirket sorumlu tutulamaz.</p>

<h4>8. Değişiklik Hakkı</h4>
<p>Şirket, işbu Kullanım Koşulları'nı önceden bildirmeksizin güncelleme hakkını saklı tutar. Güncellenmiş koşullar Site'de yayımlandığı tarihte yürürlüğe girer. Kullanıcının Siteyi kullanmaya devam etmesi, güncel koşulları kabul ettiği anlamına gelir.</p>

<h4>9. Uygulanacak Hukuk ve Uyuşmazlık Çözümü</h4>
<p>İşbu Kullanım Koşulları Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında Tüketici Hakem Heyetleri ve Antalya Mahkemeleri ve İcra Daireleri yetkilidir.</p>

<h4>10. İletişim</h4>
<p>Kullanım Koşulları hakkında sorularınız için <strong>info@advert.com.tr</strong> adresinden bizimle iletişime geçebilirsiniz.</p>

<p style="margin-top:1.2rem;font-size:.72rem;opacity:.4">Son güncelleme: Ağustos 2026</p>
`;

export default function LegalModal({ type, open, onClose }: { type: "privacy" | "terms" | null; open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!type) return null;

  const title = type === "privacy" ? "Gizlilik Politikası" : "Kullanım Koşulları";
  const content = type === "privacy" ? PRIVACY_CONTENT : TERMS_CONTENT;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{
        background: "rgba(0,0,0,.45)", backdropFilter: "blur(12px) saturate(120%)", WebkitBackdropFilter: "blur(12px) saturate(120%)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .35s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <div
        className="liquid-glass-panel w-full max-w-[600px] relative"
        data-legalmodal
        style={{
          padding: "2.4rem", transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(.97)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1), opacity .35s",
        }}
      >
        <button
          onClick={onClose}
          className="glass-close absolute top-[1.2rem] right-[1.2rem] w-8 h-8 flex items-center justify-center cursor-pointer text-[var(--cream-46)] hover:text-[var(--cream)]"
          aria-label="Kapat"
        >
          <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>

        <div className="relative z-[2]" style={{ maxHeight: "calc(85vh - 4.8rem)", overflowY: "auto" }}>
          <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.3rem", letterSpacing: "-.02em", marginBottom: "1.6rem", color: "var(--cream)" }}>{title}</h3>
          <div
            className="legal-content"
            style={{ fontSize: ".82rem", lineHeight: 1.78, color: "rgba(243,239,230,.55)" }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      <style>{`
        .legal-content h4 {
          font-family: var(--font-d);
          font-weight: 600;
          font-size: .92rem;
          color: var(--cream);
          margin: 1.4rem 0 .4rem;
        }
        .legal-content h4:first-child { margin-top: 0 }
        .legal-content p { margin-bottom: .6rem }
        .legal-content strong { color: var(--cream); font-weight: 500 }
      `}</style>
    </div>
  );
}
