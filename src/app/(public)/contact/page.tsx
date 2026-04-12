import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";

export const metadata: Metadata = {
  title: "Contact Us | yaanalivings",
  description: "Get in touch with yaanalivings. Email: divyaprasad1977@gmail.com, Phone: 9844749685. We are always ready to serve you.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact Us | yaanalivings",
    description: "Get in touch with yaanalivings. Email: divyaprasad1977@gmail.com, Phone: 9844749685. We are always ready to serve you.",
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <Link href="/" className="text-lavender-700 font-semibold hover:underline">
          ← Back to Home
        </Link>
      </div> */}

            <section className="relative py-20 md:py-28 bg-yaana-nearblack-- bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70 overflow-hidden">
        <div className="absolute inset-0">
          {/* <Image
            src="/assets/hero-bg.webp"
            alt="Luxury Student Residences"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          /> */}
          <LavenderWallpaper/>
          {/* <div className="absolute inset-0 bg-gradient-to-b from-yaana-nearblack/80 via-yaana-nearblack/70 to-yaana-nearblack/90" /> */}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Curated Living Space
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white-- uppercase tracking-tight">
            Premium Living Space
          </h1>

          <p className="text-white/90-- mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Premium accommodation with effortless connectivity, curated services, and a welcoming community right where you need it
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

      <div className="relative">
        <LavenderWallpaper/>
        <div className="relative z-10">
          <ContactPageContent />
        </div>
      </div>
    </>
  );
}

