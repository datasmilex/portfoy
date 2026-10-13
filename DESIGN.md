# Design System (DESIGN.md)

Yunus Emre Gedik (Yunovax) kişisel portföyünün tasarım dili. YX Shot (`/yxshot`) kendi zinc tabanlı arayüzünü korur; bu belge portföy sayfası içindir.

---

## 1. Yön: sessiz lüks
- **Tipografi taşır, dekor değil.** Kart, rozet, ikon karosu yok. Hiyerarşiyi serif başlıklar, ince çizgiler ve boşluk kurar.
- **Mobil önce.** Ziyaretçilerin çoğu telefondan gelir; her satır başparmakla rahat dokunulabilir (min. 44px), yatay kaydırma yok.
- **Az ama net.** Her bölümde tek bir fikir: kim olduğum, ne yaptığım, nasıl ulaşılacağı.
- **Kişilik detaylarda.** YDCO'nun fısıltısı (yalnızca hover destekleyen cihazlarda), The Pier okuma görünümü, footer'daki not.

---

## 2. Renk token'ları (`src/index.css` → `@theme`)
| Token | Değer | Kullanım |
| --- | --- | --- |
| `ink` | `#0e0d0c` | Zemin (sıcak kömür) |
| `ink-raised` | `#171513` | Hover yüzeyi |
| `paper` | `#ece7df` | Başlıklar, birincil metin, birincil buton |
| `paper-dim` | `#c9c3b9` | Vurgulu ikincil metin, italik vurgular |
| `mute` | `#8f897f` | Açıklamalar, etiketler |
| `faint` | `#625d56` | Numaralar, meta |
| `line` / `line-strong` | paper @ %11 / %22 | Ayraçlar, çerçeveler |

Tek renkli ve sıcak. Gradyan, parıltı, neon vurgu yok.

---

## 3. Tipografi
- **Display:** Instrument Serif (`font-display`) — h1 `clamp(2.9rem, 12vw, 6.25rem)`, bölüm başlıkları `2.5rem → 6xl`, proje adları `2.6rem → 5xl`. Vurgu için italik + `paper-dim`.
- **Metin:** Inter (`font-sans`) — gövde 15–17px, etiketler 14px (`text-sm`). 12px altı metin yok.
- Etiketler büyük harf/izli değil; düz, küçük ve `mute` renginde.

---

## 4. Bileşen kalıpları
- **Giriş (masthead):** "Yunus Emre *Gedik*" dev serif, kelime kelime maskeden yukarı kayarak açılır. Mobilde üç satır, masaüstünde tek satır. Altında kısa tanıtım, CTA ve "Şu sıralar…" satırı.
- **Proje dizini:** numara · tür · serif başlık · tek cümle açıklama · alan adı. Satırın tamamı tıklanabilir (stretched link); sağdaki yuvarlak ok rozeti hover/dokunuşta `paper` ile dolar. İkincil eylemler (`Hikâyeyi oku`) `relative z-10` ile üstte.
- **Kapanış:** Footer'ın en altında `paper` %6 opaklıkta dev "Yunovax" imzası.
- **Doku:** Tüm sayfanın üstünde %5.5 opaklıkta, sabit (animasyonsuz) gri film greni (`.grain`).
- **Birincil CTA:** `bg-paper text-ink rounded-full h-12`. İkincil eylemler alt çizgili metin bağlantısı.
- **Hareket:** `Reveal` bileşeni — 14px yukarı kayarak beliren, tek seferlik. `MotionConfig reducedMotion="user"` ile azaltılmış hareket tercihine uyar.

---

## 5. Yasaklar
- ❌ Gradyan metin, gradyan buton/çerçeve, bulanık ışık küreleri.
- ❌ Başlık üstü rozet/pill etiketleri, iç içe ikon karoları.
- ❌ Kart ızgaraları içinde kart; her şeyin bir kutuda olması.
- ❌ Konfeti, sürekli dönen/titreyen ikonlar gibi dikkat dağıtan hareket.
