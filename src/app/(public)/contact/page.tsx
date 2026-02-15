import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { LavenderPairOneCorners } from "@/components/decor/LavenderPairOneCorners";

export const metadata: Metadata = {
  title: "Contact Us | yaanalivings",
  description: "Get in touch with yaanalivings. Email: divyaprasad1977@gmail.com, Phone: 9844749685. We are always ready to serve you.",
};

export default function ContactPage() {
  return (
    <>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <Link href="/" className="text-lavender-700 font-semibold hover:underline">
          â† Back to Home
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
            yaanalivings redefines hostel living with a touch of luxury, crafted for students and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areasâ€”a safe, comfortable, and engaging environment.
          </p>
        </div>
      </section>

      <div className="relative">
        <LavenderPairOneCorners />
        <div className="relative z-10">
          <ContactPageContent />
        </div>
      </div>
    </>
  );
}

