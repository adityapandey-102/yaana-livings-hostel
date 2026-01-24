"use client";

import Link from "next/link";
import { SectionFade } from "@/components/ui/section-fade";
import { Button } from "@/components/ui/button";

const AMENITIES = {
  common: ["High-speed wifi", "Common gym", "Common parking", "First aid box", "CCTV", "Attached Washroom", "Power Backup", "24 x 7 Security", "Waste Disposal", "Maintenance Staff", "Cleaning Services", "24 * 7 Security Guard", "Gym", "High Speed Wifi", "Parking"],
  services: ["Housekeeping", "Gym", "Wifi", "Room Cleaning", "First aid box"],
  food: ["Veg Food", "Weekly new menu", "On demand Food services", "Seasonal food menu"],
};

export function WorldOfYaana() {
  return (
    <section className="py-16 lg:py-24 bg-yaana-cream">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="leaf-accent" />
        <h2 className="text-2xl md:text-3xl font-serif text-yaana-charcoal text-center mb-4">
          What this place offers
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { label: "Common", items: AMENITIES.common },
            { label: "Services", items: AMENITIES.services },
            { label: "Food", items: AMENITIES.food },
          ].map((group) => (
            <div key={group.label} className="rounded-card border border-yaana-charcoal/10 bg-white p-6">
              <h3 className="font-semibold text-yaana-charcoal uppercase tracking-wider mb-4">{group.label}</h3>
              <ul className="space-y-2 text-sm text-yaana-charcoal/90">
                {group.items.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-yaana-charcoal/90 mb-4">Ready to book your stay? Experience all these amenities and more at our property.</p>
          <Button asChild>
            <Link href="/contact">Check availability</Link>
          </Button>
        </div>
      </SectionFade>
    </section>
  );
}
