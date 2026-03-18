"use client";

import Link from "next/link";
import { SectionFade } from "@/components/ui/section-fade";
import { LavenderWallpaper } from "../decor/LavenderWallpaper";

const STATS = [
  { value: "8+", label: "CITIES" },
  { value: "2500+", label: "BEDS" },
  { value: "30+", label: "HOSTELS" },
  { value: "5000+", label: "STUDENTS" },
];

export function WhyYaana() {
  return (
    <section className="relative py-20 lg:py-28 bg-white--">
      <LavenderWallpaper/>
      <SectionFade className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            WHY YAANA!
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            {/* At YAANA, we offer more than just a place to live. Our modern spaces are designed for comfort, safety, and community. With 24/7 security, high-speed Wi-Fi, cozy study areas, and vibrant common spaces, you&apos;ll feel right at home. Plus, our events and activities foster connections, helping you make lifelong friendships. */}
            At YAANA, living is redefined as an experience of comfort, elegance, and connection. Our thoughtfully curated spaces are designed to offer both serenity and sophistication, ensuring you feel at ease the moment you arrive. With 24/7 security, seamless high-speed Wi-Fi, inviting study lounges, and beautifully designed common areas, every detail reflects effortless living. Curated events and shared moments bring our community together, creating meaningful connections and friendships that last beyond your stay. 
          </p>
          <div className="mt-8 ">
            <Link 
              href="/about" 
              className="inline-block text-lavender-700- text-white font-semibold hover:text-lavender-700 py-3 px-6 rounded-full
              bg-lavender-700 transition-colors text-sm uppercase tracking-wider"
            >
              More About Us →
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

