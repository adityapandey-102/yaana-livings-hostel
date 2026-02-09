"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RENTAL_PROPERTIES, FILTER_TABS } from "@/data/properties";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497512.2830427995!2d77.461098!3d12.971599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6b%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1";

export function RentalPageContent() {
  const [filter, setFilter] = useState<(typeof FILTER_TABS)[number]>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return RENTAL_PROPERTIES;
    const key = filter.toLowerCase();
    return RENTAL_PROPERTIES.filter((p) => p.type === key || (key === "new" && p.rating));
  }, [filter]);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left: filters + list */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === tab
                  ? "bg-yaana-charcoal text-white"
                  : "bg-yaana-charcoal/5 text-yaana-charcoal hover:bg-yaana-charcoal/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="rounded-card border border-yaana-charcoal/10 overflow-hidden bg-white hover:shadow-lg transition flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 flex-shrink-0 aspect-square sm:aspect-auto sm:h-[180px] relative">
                <Image src={p.img} alt={p.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 192px" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="font-semibold text-yaana-charcoal">{p.name}</h2>
                  {p.rating && (
                    <span className="text-xs font-medium bg-yaana-forest/20 text-yaana-forest px-2 py-0.5 rounded-full flex-shrink-0">
                      {p.rating}
                    </span>
                  )}
                </div>
                <p className="text-sm text-yaana-charcoal/70 mb-2">{p.loc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs text-yaana-charcoal/60 bg-yaana-cream-dark px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-yaana-charcoal font-semibold mb-4">
                  {p.priceLabel === "Starts from" ? `₹ ${p.price} p.m.` : `${p.priceLabel} ${p.price}`}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Button asChild size="sm" className="flex-1 bg-yaana-charcoal hover:bg-yaana-charcoal-light">
                    <Link href={`/property-details/${p.slug}`}>View details</Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Heart className="w-4 h-4" /> My shortlists
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right: Map */}
      <div className="lg:col-span-1">
        <div className="rounded-card overflow-hidden h-[300px] lg:h-[400px] lg:sticky lg:top-24">
          <iframe
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          />
        </div>
      </div>
    </div>
  );
}
