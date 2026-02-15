"use client";

import Link from "next/link";
import { SectionFade } from "@/components/ui/section-fade";

export function Spotlight() {
  return (
    <section className="py-16 lg:py-24 bg-lavender-50">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="leaf-accent" />
        <h2 className="text-2xl md:text-3xl font-serif text-yaana-charcoal text-center mb-4">
          THE SPOTLIGHT
        </h2>
        <p className="max-w-2xl mx-auto text-center text-yaana-charcoal/90 mb-10\">
          Stay updated with the latest news, events, and activities happening at yaanalivings. Discover the excitement and energy within our vibrant community.
        </p>
        <h3 className="text-xl font-serif text-yaana-charcoal text-center mt-12 mb-4\">
          Our reviews!
        </h3>
        <p className="max-w-2xl mx-auto text-center text-yaana-charcoal/90">
          Discover the real experiences that make yaanalivings more than just a place to stay. From cozy comforts to a strong sense of community, hear firsthand from those who call yaanalivings their home.
        </p>
        <p className="text-center mt-8">
          <Link href="/contact" className="text-lavender-700 font-semibold hover:underline">
            View All Reviews
          </Link>
        </p>
      </SectionFade>
    </section>
  );
}

