import type { Metadata } from "next";
import Link from "next/link";
import { RentalPageContent } from "@/components/rental/RentalPageContent";
import { div } from "framer-motion/client";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rental Properties | yaanalivings",
  description: "View our properties: hostels, PGs, studio apartments and fully furnished flats. Yaana homes, Yaana comforts, Yaana Group, Yaana living. Bengaluru, Karnataka.",
};

export default function RentalPage() {
  return (
    <div>

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
            Comfortable Residences
          </h1>
          <p className="text-white/90 mt-4 text-sm sm:text-base">
            yaanalivings redefines hostel living with a touch of luxury, crafted for students and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areas—a safe, comfortable, and engaging environment.
          </p>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-12">
        {/* <Link href="/" className="inline-block text-yaana-forest font-semibold hover:underline mb-6\">
        ← Back to Home
      </Link> */}
        <h1 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal mb-2">
          Our Properties Across India
        </h1>
        <p className="text-yaana-charcoal/80 mb-8 max-w-2xl">
          Premium shared accommodation with modern amenities and vibrant community.
        </p>
        <RentalPageContent />
      </div>
    </div>
  );
}
