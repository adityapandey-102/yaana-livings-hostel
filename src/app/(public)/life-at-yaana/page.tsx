import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { LavenderPairTwoCorners } from "@/components/decor/LavenderPairTwoCorners";

export const metadata: Metadata = {
  title: "Life at yaanalivings | yaanalivings",
  description:
    "100% Digital Experience with yaanalivings. Digital check-in, online rent payment, rent rewards, in-app food menu, faster complaint resolution, and more.",
};

const LIFE_GALLERY = [
  { src: "/assets/gallery/g1.jpg", span: 2 },
  { src: "/assets/gallery/g2.jpg", span: 1 },
  { src: "/assets/gallery/g3.webp", span: 1 },
  { src: "/assets/gallery/g4.webp", span: 1 },
  { src: "/assets/gallery/g5.webp", span: 1 },
  { src: "/assets/gallery/g6.webp", span: 2 },
  { src: "/assets/properties/yaana-homes.jpg", span: 1 },
  { src: "/assets/properties/yaana-comforts.jpg", span: 1 },
  { src: "/assets/smart-living.webp", span: 1 },
];

export default function LifeAtYaanaPage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 bg-yaana-nearblack overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt="Luxury Student Residences"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-yaana-nearblack/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white uppercase tracking-tight">
            Luxury Student Residences
          </h1>

          <p className="text-white/90 mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            yaanalivings redefines hostel living with a touch of luxury,
            crafted for students and young professionals. Ideally located near
            top educational hubs, we offer an inspiring space complete with
            high-end amenities, stylish rooms, and vibrant common areas—
            a safe, comfortable, and engaging environment.
          </p>
        </div>
      </section>

      {/* ================= LIFE GALLERY ================= */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <LavenderPairTwoCorners />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase tracking-tight text-center mb-12">
            Life at yaanalivings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {LIFE_GALLERY.map(({ src, span }, i) => (
              <div
                key={i}
                className={`relative rounded-card overflow-hidden ${
                  span === 2 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full aspect-[4/3] ${
                    span === 2 ? "md:aspect-[2/1]" : ""
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Life at yaanalivings ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition duration-500"
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TAGLINE ================= */}
      <section className="py-12 md:py-16 bg-yaana-nearblack">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-center text-white font-serif text-lg md:text-xl">
            Every story deserves a chapter called yaanalivings!
          </p>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-16 bg-lavender-50 overflow-hidden">
        {/* <div className="w-full max-w-6xl mx-auto px-4 sm:px-6"> */}
          <div className="w-full">
            <ContactPageContent />
          {/* </div> */}
        </div>
      </section>
    </div>
  );
}
