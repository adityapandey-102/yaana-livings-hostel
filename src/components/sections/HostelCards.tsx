"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const PROPERTIES = [
  { 
    id: "yaana-homes", 
    slug: "yaana-homes", 
    name: "Yaana Homes", 
    loc: "Multiple Cities",
    city: "India",
    room: "Single/Double", 
    features: ["Furnished", "WiFi", "Laundry"],
    price: "₹8,999", 
    priceNote: "/MO", 
    badge: "POPULAR",
    img: "/assets/properties/yaana-homes.jpg" 
  },
  { 
    id: "yaana-comforts", 
    slug: "yaana-comforts", 
    name: "Yaana Comforts", 
    loc: "Premium Locations",
    city: "India",
    room: "Premium", 
    features: ["AC", "Gym", "Gaming Zone"],
    price: "₹15,999", 
    priceNote: "/MO", 
    badge: "PREMIUM",
    img: "/assets/properties/yaana-comforts.jpg" 
  },
  { 
    id: "yaana-group", 
    slug: "yaana-group", 
    name: "Yaana Group", 
    loc: "Urban Centers",
    city: "India",
    room: "Shared/Private", 
    features: ["Community", "Events", "Support"],
    price: "₹12,499", 
    priceNote: "/MO", 
    badge: "COMMUNITY",
    img: "/assets/properties/yaana-group.webp" 
  },
  { 
    id: "yaana-living", 
    slug: "yaana-living", 
    name: "Yaana Living", 
    loc: "Prime Locations",
    city: "India",
    room: "Luxury", 
    features: ["Private Room", "Full AC", "Meals"],
    price: "₹22,499", 
    priceNote: "/MO", 
    badge: "LUXURY",
    img: "/assets/properties/yaana-living.webp" 
  },
];

export function HostelCards() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-yaana-nearblack mb-6 tracking-tight">
            Stay Smart, Live Better at YAANA
          </h2>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-yaana-charcoal leading-relaxed">
            At YAANA, we provide fully-furnished rooms, delicious meals, Wi-Fi, laundry, a game zone, and gym access—all at affordable prices. Enjoy a luxurious student living experience crafted just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPERTIES.map((h) => (
            <article key={h.id} className="group rounded-card border border-yaana-charcoal/10 overflow-hidden bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image 
                  src={h.img} 
                  alt={h.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" 
                  loading="lazy"
                />
                {h.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="inline-block text-[10px] font-bold bg-yaana-gold text-yaana-nearblack px-2 py-1 rounded uppercase tracking-wider">
                      {h.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-yaana-charcoal/60 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{h.loc}</span>
                  </div>
                  
                  <h3 className="font-serif font-semibold text-base text-yaana-nearblack mb-2 leading-tight line-clamp-2">
                    {h.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[10px] font-medium bg-yaana-cream-dark text-yaana-charcoal px-2 py-0.5 rounded">{h.room}</span>
                    {h.features.map((f) => (
                      <span key={f} className="text-[10px] text-yaana-charcoal/60 px-2 py-0.5 border border-yaana-charcoal/10 rounded">{f}</span>
                    ))}
                  </div>
                  
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-xl font-serif font-bold text-yaana-gold">{h.price}</span>
                      <span className="text-xs text-yaana-charcoal/60">{h.priceNote}</span>
                    </div>
                  </div>
                </div>
                
                <Button asChild size="sm" className="w-full bg-yaana-nearblack hover:bg-yaana-gold text-white uppercase text-xs font-semibold tracking-wider">
                  <Link href={`/hostel-details/${h.slug}`}>Enquire Now</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </SectionFade>
    </section>
  );
}
