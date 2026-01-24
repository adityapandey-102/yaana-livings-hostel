import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Life at yaanalivings | yaanalivings",
  description: "100% Digital Experience with yaanalivings. Digital check-in, online rent payment, rent rewards, in-app food menu, faster complaint resolution, and more.",
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
    <div>
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <Link href="/" className="inline-block text-yaana-forest font-semibold hover:underline mb-8">
          ← Back to Home
        </Link>
      </div> */}
      {/* Hero: dark, matching yaana contact */}
      <section className="relative py-16 lg:py-24 bg-yaana-nearblack overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt=""
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-yaana-nearblack/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white uppercase tracking-tight">
            Luxury Student Residences
          </h1>
          <p className="text-white/90 mt-4 text-sm sm:text-base">
            yaanalivings redefines hostel living with a touch of luxury, crafted for students and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areas—a safe, comfortable, and engaging environment.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase tracking-tight text-center mb-10">
          Life at yaanalivings
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {LIFE_GALLERY.map(({ src, span }, i) => (
            <div
              key={i}
              className={`relative rounded-card overflow-hidden ${span === 2 ? "md:col-span-2" : ""}`}
            >
              <div className={`aspect-[4/3] ${span === 2 ? "md:aspect-[2/1]" : ""} relative`}>
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 bg-yaana-nearblack">
        <p className="text-center text-white font-serif text-lg md:text-xl">
          Every story deserves a chapter called yaanalivings!
        </p>
      </section>

      <section className="py-12 bg-yaana-cream">
        <ContactPageContent />
      </section>
    </div>
  );
}
