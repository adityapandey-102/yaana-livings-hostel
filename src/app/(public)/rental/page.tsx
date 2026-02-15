import type { Metadata } from "next";
import { RentalPageContent } from "@/components/rental/RentalPageContent";
import Image from "next/image";
import { LavenderPairTwoCorners } from "@/components/decor/LavenderPairTwoCorners";

export const metadata: Metadata = {
  title: "Rental Properties | yaanalivings",
  description:
    "View our properties: hostels, PGs, studio apartments and fully furnished flats. Yaana homes, Yaana comforts, Yaana Group, Yaana living. Bengaluru, Karnataka.",
};

export default function RentalPage() {
  return (
    <div className="w-full overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 bg-yaana-nearblack">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt="Comfortable Residences"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-yaana-nearblack/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white uppercase tracking-tight">
            Comfortable Residences
          </h1>

          <p className="text-white/90 mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            yaanalivings redefines hostel living with a touch of luxury,
            crafted for students and young professionals. Ideally located near
            top educational hubs, we offer an inspiring space complete with
            high-end amenities, stylish rooms, and vibrant common areas—a safe,
            comfortable, and engaging environment.
          </p>
        </div>
      </section>

      {/* ================= PROPERTIES SECTION ================= */}
      <section className="relative py-16 md:py-20">
        {/* Decorative Corners – FULL WIDTH */}
        <LavenderPairTwoCorners />

        {/* Centered Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal mb-3">
            Our Properties Across India
          </h2>

          <p className="text-yaana-charcoal/80 mb-10 max-w-2xl text-sm md:text-base">
            Premium shared accommodation with modern amenities and vibrant community.
          </p>

          <RentalPageContent />
        </div>
      </section>
    </div>
  );
}
