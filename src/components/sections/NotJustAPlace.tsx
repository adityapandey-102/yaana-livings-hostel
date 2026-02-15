"use client";

import { SectionFade } from "@/components/ui/section-fade";

export function NotJustAPlace() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(210,183,229,0.35) 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      
      <SectionFade className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-lavender-200 mb-6 tracking-tight leading-tight">
          NOT JUST A PLACE TO STAY
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-lavender-200 font-light tracking-wide">
          But an experience to cherish. Come over and feel the difference
        </p>
      </SectionFade>
    </section>
  );
}
