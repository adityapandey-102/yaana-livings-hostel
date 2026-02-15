"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionFade } from "@/components/ui/section-fade";

const GALLERY = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.webp",
  "/assets/gallery/g4.webp",
  "/assets/gallery/g5.webp",
  "/assets/gallery/g6.webp",
];

export function Gallery() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="leaf-accent" />
        <h2 className="text-2xl md:text-3xl font-serif text-yaana-charcoal text-center mb-4">
          Gallery
        </h2>
        <p className="max-w-2xl mx-auto text-center text-yaana-charcoal/90 mb-12">
          Embark on a visual journey through our stunning properties. Each photo showcases comfort and refinement across hostels, PGs, and fully furnished flats.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((src, i) => (
            <div key={src} className="aspect-[4/3] relative rounded-card overflow-hidden">
              <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
          ))}
        </div>
        <p className="text-center font-serif text-xl text-yaana-charcoal mt-12">
          Every story deserves a chapter called yaanalivings!
        </p>
        <p className="text-center mt-4">
          <Link href="/gallery" className="text-lavender-700 font-semibold hover:underline">
            View full gallery
          </Link>
        </p>
      </SectionFade>
    </section>
  );
}

