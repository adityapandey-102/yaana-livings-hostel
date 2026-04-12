"use client";

import Link from "next/link";
import { SectionFade } from "@/components/ui/section-fade";
import { LavenderWallpaper } from "../decor/LavenderWallpaper";

const STATS = [
  { value: "4", label: "PROPERTIES" },
  { value: "800+", label: "BEDS" },
  { value: "1000+", label: "REVIEWS" },
  { value: "3000+", label: "CLIENTS" },
];

export function WhyYaana() {
  return (
    <section className="relative py-20 lg:py-28 bg-white--">
      <LavenderWallpaper/>
      <SectionFade className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
           Founders Desk
          </h2>
          <p className="max-w-3xl italic mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            &ldquo;YAANA Group was founded with one thought - no girl should ever feel unsafe or lonely while living away from home. Over the last decade, we&apos;ve served thousands of young women, offering them a caring environment where safety meets comfort. At YAANA, you&apos;re not just renting a room you&apos;re joining a family.&rdquo;
          </p>
          <p className="mt-4 font-medium italic">- Divya Prasad, Founder and Proprietrix, YAANA Group</p>
          <div className="mt-8 ">
            <Link 
              href="/about" 
              className="inline-block text-lavender-700- text-white font-semibold  hover:text-lavender-200 py-3 px-6 rounded-full
              bg-lavender-700 transition-colors text-sm uppercase tracking-wider"
            >
              Discover more about us →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-lavender-700-- text-black mb-2">{s.value}</p>
              <p className="text-xs lg:text-sm uppercase tracking-luxury text-yaana-charcoal/70 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </SectionFade>
    </section>
  );
}
