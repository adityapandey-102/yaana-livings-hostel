import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { LifeAtYaanaGallery } from "@/components/sections/LifeAtYaanaGallery";

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

const LIFE_GALLERIES = [
  {
    id: "yaana-signature",
    title: "YAANA Signature",
    images: Array.from({ length: 15 }, (_, i) => ({
      src: `/assets/gallery/yaana-signature/yaana-signature-${String(i + 1).padStart(2, "0")}.jpeg`,
    })),
  },
  {
    id: "yaana-livings",
    title: "YAANA Living",
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/assets/gallery/yaana-livings/yaana-livings-${String(i + 1).padStart(2, "0")}.jpeg`,
    })),
  },
  {
    id: "yaana-comforts",
    title: "YAANA Comforts",
    images: Array.from({ length: 7 }, (_, i) => ({
      src: `/assets/gallery/yaana-comforts/yaana-comforts-${String(i + 1).padStart(2, "0")}.jpeg`,
    })),
  },
  {
    id: "yaana-homes",
    title: "YAANA Home",
    images: Array.from({ length: 4 }, (_, i) => ({
      src: `/assets/gallery/yaana-homes/yaana-homes-${String(i + 1).padStart(2, "0")}.jpeg`,
    })),
  },
];

export default function LifeAtYaanaPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 bg-yaana-nearblack-- bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_10%_20%,rgba(255,255,255,0.35),transparent),radial-gradient(900px_500px_at_90%_0%,rgba(186,165,255,0.35),transparent)]"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Curated Living Space
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
      <section className="relative py-16 md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_12%_18%,rgba(186,165,255,0.3),transparent),radial-gradient(900px_500px_at_88%_0%,rgba(255,255,255,0.35),transparent)]"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase tracking-tight text-center mb-12">
            Life at yaana
          </h2>

          <LifeAtYaanaGallery galleries={LIFE_GALLERIES} />
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
