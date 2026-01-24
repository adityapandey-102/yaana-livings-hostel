"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";

const COMMUNITY_IMAGES = [
  "/assets/community/lounge-1.jpg",
  "/assets/community/library-1.jpg",
  "/assets/community/study-1.jpg",
  "/assets/community/lounge-2.jpg",
  "/assets/community/pool-1.jpg",
  "/assets/community/dining-1.jpg",
];

export function LifeAtYaana() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            COMMUNITY SPACES
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            Experience community like never before at Yaana Luxury Student Residences. Our vibrant communal spaces foster connections, collaboration, and unforgettable memories. From cozy lounges to dynamic shared areas, discover the heart of our thriving community.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {COMMUNITY_IMAGES.map((img, idx) => (
            <div 
              key={idx}
              className="group relative aspect-[4/3] rounded-card overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yaana-gold/20 to-yaana-forest/30" />
              <div className="absolute inset-0 bg-yaana-nearblack/20 group-hover:bg-yaana-nearblack/10 transition-colors" />
            </div>
          ))}
        </div>
      </SectionFade>
    </section>
  );
}
