import Image from "next/image";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import styles from "./Animation.module.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });
const sans = Montserrat({ subsets: ["latin"], weight: ["500", "700", "800", "900"] });

const INSTAGRAM_URL = "https://www.instagram.com/jmangga_reang/";
const WHATSAPP_URL = "https://wa.me/6285812345678";
const WHATSAPP_LABEL = "0858 1234 5678";

// Jeda animasi masuk (dipakai oleh .fx di Animation.module.css lewat --d)
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[55%] w-[55%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a10 10 0 1 1-4.6 18.9L2 22l1.2-5.2A10 10 0 0 1 12 2z" />
      <g transform="translate(6.6 6.6) scale(0.45)">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

type PillProps = {
  href: string;
  label: string;
  text: string;
  icon: React.ReactNode;
  delayMs?: number;
};

function ContactPill({ href, label, text, icon, delayMs = 0 }: PillProps) {
  return (
    <div data-fx="right" className={styles.fx} style={delay(delayMs)}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="group flex h-14 items-stretch overflow-hidden rounded-full bg-black shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition hover:bg-neutral-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/40 sm:h-[4.5rem] lg:h-[5.5rem]"
      >
        <span className="flex aspect-square h-full items-center justify-center rounded-full bg-[#FFA500] text-black">
          {icon}
        </span>
        <span className="flex min-w-0 flex-1 items-center justify-center whitespace-nowrap px-3 text-base font-bold tracking-[0.18em] text-[#FFA500] sm:px-5 sm:text-2xl sm:tracking-[0.3em] lg:text-4xl lg:tracking-[0.35em]">
          {text}
        </span>
      </a>
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className={`${sans.className} relative isolate overflow-hidden`}
      style={{
        background:
          "linear-gradient(to bottom, #FFA500 0%, #FFA500 20%, #FFD27A 38%, #FFFFFF 56%)",
      }}
    >
      {/* Mangga utama: pembungkus luar memegang posisi (translate Tailwind),
          pembungkus dalam memegang animasi (translate .fx) agar tidak bentrok */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[52%] max-w-[420px] -translate-x-1/2 md:left-[34%] md:w-[27%] md:max-w-none md:translate-x-0">
        <div data-fx="zoom" className={styles.fx}>
          <Image
            src="/images/manggaLandingP.png"
            alt="Mangga utuh dan potongan mangga"
            width={386}
            height={386}
            priority
            className="h-auto w-full drop-shadow-[0_18px_25px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* Mangga blur di kiri bawah */}
      <div
        data-fx="left"
        className={`${styles.fx} pointer-events-none absolute -bottom-[3%] -left-[4%] -z-10 hidden aspect-square w-[34%] max-w-[480px] overflow-hidden md:block`}
        style={{
          ...delay(400),
          maskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, #000 55%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/manggaLandingP.png"
          alt=""
          width={386}
          height={386}
          className="absolute -left-[86%] -top-[95%] h-auto w-[220%] max-w-none blur-[5px]"
        />
      </div>

      <div className="mx-auto flex min-h-[760px] max-w-[1440px] flex-col px-6 pb-12 pt-[46vw] sm:px-10 md:min-h-[min(100vh,900px)] md:pt-[16%]">
        {/* Baris judul */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-start md:gap-0">
          {/* Brand */}
          <div className="md:pr-6 lg:pr-8">
            <div className="inline-block">
              <p
                data-fx="up"
                style={delay(150)}
                className={`${styles.fx} ${serif.className} whitespace-nowrap text-2xl font-semibold uppercase tracking-[0.06em] text-black sm:text-4xl lg:text-5xl`}
              >
                Juragan Mangga
              </p>
              <h1
                data-fx="up"
                className={`${styles.fx} flex justify-between border-b-4 border-[#FFA500] pb-1 text-5xl font-extrabold uppercase leading-none text-[#FFA500] sm:text-7xl lg:text-8xl`}
                style={{ ...delay(300), textShadow: "0 0 18px rgba(255,255,255,0.9)" }}
              >
                {"REANG".split("").map((char) => (
                  <span key={char}>{char}</span>
                ))}
              </h1>
            </div>
          </div>

          {/* Garis pemisah */}
          <div
            data-fx="zoom"
            className={`${styles.fx} hidden h-24 w-px bg-black md:block lg:h-32`}
            style={delay(300)}
            aria-hidden="true"
          />

          {/* CONTACT: tiap huruf punya fade in/out sendiri, muncul berurutan */}
          <h2
            aria-label="Contact"
            className="whitespace-nowrap text-[clamp(3.25rem,10vw,8.5rem)] font-black uppercase leading-none tracking-tight text-black md:pl-4"
            style={{ textShadow: "0 8px 20px rgba(0,0,0,0.25)" }}
          >
            {"CONTACT".split("").map((char, i) => (
              <span
                key={i}
                aria-hidden="true"
                data-fx="up"
                className={`${styles.fx} inline-block`}
                style={delay(250 + i * 70)}
              >
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Tombol kontak + tagline */}
        <div className="mt-10 flex flex-col gap-5 md:ml-auto md:mt-14 md:w-[66%]">
          <ContactPill
            href={INSTAGRAM_URL}
            label="Buka Instagram @jmangga_reang"
            text="@JMANGGA_REANG"
            icon={<InstagramIcon />}
            delayMs={500}
          />
          <ContactPill
            href={WHATSAPP_URL}
            label={`Chat WhatsApp ${WHATSAPP_LABEL}`}
            text="085812345678"
            icon={<WhatsappIcon />}
            delayMs={650}
          />

          <p
            data-fx="up"
            className={`${styles.fx} mx-auto mt-6 max-w-3xl text-center text-[11px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-black sm:text-sm md:mt-10`}
            style={delay(800)}
          >
            Platform berbagai supplier buah mangga dengan cita rasa mangga dari
            seluruh Nusantara
          </p>
        </div>
      </div>
    </section>
  );
}