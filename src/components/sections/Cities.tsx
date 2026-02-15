"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";

const CITIES = [
  { name: "Greater Noida", count: "1 Hostel", href: "/rental?city=greater-noida", img: "/assets/cities/greater-noida.jpg" },
  { name: "Mumbai", count: "4 Hostels", href: "/rental?city=mumbai", img: "/assets/cities/mumbai.jpg" },
  { name: "Ahmedabad", count: "1 Hostel", href: "/rental?city=ahmedabad", img: "/assets/cities/ahmedabad.jpg" },
  { name: "Noida", count: "2 Hostels", href: "/rental?city=noida", img: "/assets/cities/noida.jpg" },
  { name: "Pune", count: "COMING SOON", href: "#", img: "/assets/cities/pune.jpg", comingSoon: true },
];

export function Cities() {
  return (
    <section className="py-20 lg:py-28 bg-lavender-100">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            Luxury & Fully Furnished PG/Hostels
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            Discover luxury living with YAANA in premier cities across India. Our properties offer unmatched elegance, modern amenities, and thoughtfully designed spaces, providing you with a unique blend of comfort and sophistication, wherever you choose to stay.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CITIES.map((c) => (
            <Link
              key={c.name}
              href={c.comingSoon ? "#" : c.href}
              className={`group relative block rounded-card overflow-hidden aspect-[3/4] bg-yaana-charcoal shadow-md hover:shadow-xl transition-all duration-300 ${c.comingSoon ? "cursor-default" : "hover:-translate-y-1"}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-yaana-dark-lavender/30 to-yaana-dark-lavender/40" />
              </div>
              
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                {c.comingSoon && (
                  <span className="inline-block text-[10px] font-bold bg-lavender-600 text-yaana-nearblack px-2 py-1 rounded mb-2 w-fit uppercase tracking-wider">
                    {c.count}
                  </span>
                )}
                <p className="font-serif font-bold text-lg lg:text-xl text-white mb-1">{c.name}</p>
                {!c.comingSoon && <p className="text-xs text-white/90 font-medium">{c.count}</p>}
              </div>
            </Link>
          ))}
        </div>
      </SectionFade>
    </section>
  );
}

