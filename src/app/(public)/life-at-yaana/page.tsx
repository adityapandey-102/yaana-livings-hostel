import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";

export const metadata: Metadata = {
  title: "Life at yaanalivings | yaanalivings",
  description:
    "100% Digital Experience with yaanalivings. Digital check-in, online rent payment, rent rewards, in-app food menu, faster complaint resolution, and more.",
  alternates: {
    canonical: "/life-at-yaana",
  },
  openGraph: {
    title: "Life at yaanalivings | yaanalivings",
    description:
      "100% Digital Experience with yaanalivings. Digital check-in, online rent payment, rent rewards, in-app food menu, faster complaint resolution, and more.",
    url: "/life-at-yaana",
  },
};

const LIFE_FEATURES = [
  {
    title: "Digital Check-In",
    copy: "Seamless onboarding with smart KYC and instant access.",
  },
  {
    title: "Tenant App",
    copy: "Pay rent, raise requests, and track updates in one place.",
  },
  {
    title: "Community First",
    copy: "Shared lounges, curated events, and a thriving social vibe.",
  },
];

const LIFE_GALLERY = [
  { src: "/assets/lifeAtYaana/life-1.jpeg", span: 2 },
  { src: "/assets/lifeAtYaana/life-2.jpeg", span: 1 },
  { src: "/assets/lifeAtYaana/life-3.jpeg", span: 1 },
  { src: "/assets/lifeAtYaana/life-4.jpeg", span: 1 },
  { src: "/assets/lifeAtYaana/life-5.jpeg", span: 1 },
  // { src: "/assets/lifeAtYaana/life-6.jpeg", span: 2 },
  { src: "/assets/lifeAtYaana/life-7.jpeg", span: 2 },
  { src: "/assets/lifeAtYaana/life-8.jpeg", span: 1 },
  { src: "/assets/lifeAtYaana/life-9.jpeg", span: 1 },
  { src: "/assets/lifeAtYaana/life-10.jpeg", span: 1 },
  { src: "/assets/lifeAtYaana/life-11.jpeg", span: 1 },
];

export default function LifeAtYaanaPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 bg-yaana-nearblack-- bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70 overflow-hidden">
        <div className="absolute inset-0">
          <LavenderWallpaper/>

        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Curated Student Living
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white-- uppercase tracking-tight">
            Luxury & Fully Furnished Ladies Accommodation 
          </h1>

          <p className="text-white/90-- mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Experience elevated living with YAANA across India’s premier cities, where elegance, comfort, and modern design meet seamlessly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rental"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-yaana-nearblack transition hover:bg-white/90"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white-- transition hover:bg-white/10"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </section>



      {/* ================= LIFE GALLERY ================= */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <LavenderWallpaper />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase tracking-tight text-center mb-12">
            Life at yaana livings
          </h2>

          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
            {LIFE_GALLERY.map(({ src }, i) => (
              <div key={i} className="mb-4 md:mb-6 break-inside-avoid">
                <div className="relative w-full overflow-hidden rounded-card">
                  <Image
                    src={src}
                    alt={`Life at yaanalivings ${i + 1}`}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover transition duration-700 hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TAGLINE ================= */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className=" font-serif text-lg md:text-xl">
           Every story needs a chapter called Yaana.
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-black/90">
            Live • Learn • Belong
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-16 bg-lavender-50 overflow-hidden">
        <div className="w-full">
          <ContactPageContent />
        </div>
      </section>
    </div>
  );
}
