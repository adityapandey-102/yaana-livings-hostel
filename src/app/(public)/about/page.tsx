import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Wifi,
  Dumbbell,
  Sparkles,
  Shield,
  KeyRound,
  Utensils,
  Users,
  TreeDeciduous,
  Heart,
} from "lucide-react";
import { EXCLUSIVE_AMENITIES } from "@/data/amenities";
import { LifeAtYaana } from "@/components/sections/LifeAtYaana";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";

export const metadata: Metadata = {
  title: "About Us | yaanalivings",
  description:
    "Yaana Living provides hostels, PGs, studio apartments, and fully furnished flats designed for comfort, safety, and community.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: "About Us | yaanalivings",
    description:
      "Yaana Living provides hostels, PGs, studio apartments, and fully furnished flats designed for comfort, safety, and community.",
    url: '/about',
  },
};

const AMENITY_ICONS = [
  Wifi,
  Dumbbell,
  Sparkles,
  Shield,
  KeyRound,
  Utensils,
  Users,
  TreeDeciduous,
  Heart,
];


export default function AboutPage() {
  return (
    <div className="w-full overflow-hidden">
      {/* ================= HERO ================= */}
      {/* <section className="relative py-20 md:py-28 bg-yaana-nearblack">
        <div className="absolute inset-0">
          <Image
            src="/assets/hero-bg.webp"
            alt="Luxury student residence"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-yaana-nearblack/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white uppercase tracking-tight">
            Luxury Student Residences
          </h1>

          <p className="text-white/90 mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            Yaanalivings redefines hostel living with a touch of luxury,
            crafted for students and young professionals. Ideally located near
            top educational hubs, we provide stylish rooms, premium amenities,
            and vibrant common spaces in a safe, comfortable environment.
          </p>
        </div>
      </section> */}

      <section className="relative py-20 md:py-28 bg-yaana-nearblack-- bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70 overflow-hidden">
        <div className="absolute inset-0">
          {/* <Image
            src="/assets/hero-bg.webp"
            alt="Luxury Student Residences"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          /> */}
          <LavenderWallpaper />
          {/* <div className="absolute inset-0 bg-gradient-to-b from-yaana-nearblack/80 via-yaana-nearblack/70 to-yaana-nearblack/90" /> */}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/80--">
            Life at yaana
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold text-white-- uppercase tracking-tight">
            {/* Comfortable residences > Elegant Living Spaces */}
            Elegant Living Spaces
          </h1>

          <p className="text-white/90-- mt-6 text-sm sm:text-base md:text-lg leading-relaxed">
            YAANA reimagines hostel living with a touch of luxury—stylish spaces, premium amenities, and vibrant communities for students and young professionals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rental"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-yaana-nearblack transition hover:bg-white/90"
            >
              Explore Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white-- transition hover:bg-white/10"
            >
              Book a Visit
            </Link>
          </div>
        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section className="relative py-16 md:py-20 bg-white-- overflow-hidden">
        <LavenderWallpaper className="h-full" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-yaana-charcoal uppercase mb-6">
              About Us
            </h2>

            <div className="space-y-6 text-yaana-charcoal/90 text-base md:text-lg leading-relaxed">
              <p>
                At YAANA, we redefine modern student and young professional accommodation across India. Our thoughtfully designed hostels, PGs, studio apartments, and fully furnished flats are created to offer the perfect balance of comfort, safety, and community living.
              </p>

              <p>
                What truly sets us apart is our 10X better living experience—powered by Smart KYC, seamless digital payments, a dedicated tenant app, faster complaint resolution, and complimentary tenant insurance. Every YAANA space is designed to make everyday living simpler, smarter, and more enjoyable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Secure Access", value: "24/7" },
              { label: "Response Time", value: "< 24h" },
              { label: "Community Events", value: "Weekly" },
              { label: "Move-In Ready", value: "Day 1" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-card border border-lavender-200 bg-white/90 p-5 shadow-sm"
              >
                <div className="text-2xl font-semibold text-yaana-nearblack">
                  {item.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-yaana-charcoal/70 mt-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AMENITIES ================= */}
      <section className="py-16 md:py-20 bg-yaana-nearblack">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white uppercase mb-4">
            Exclusive Amenities
          </h2>

          <p className="max-w-2xl mx-auto text-white/80 mb-12 text-sm md:text-base">
            Everything you need for a comfortable and connected lifestyle.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {EXCLUSIVE_AMENITIES.map((label, i) => {
              const Icon = AMENITY_ICONS[i] ?? Heart;
              return (
                <div
                  key={label}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white text-xs sm:text-sm uppercase tracking-wider">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY ================= */}
      <LifeAtYaana />

      {/* ================= CTA ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase mb-4">
            Not Just a Place to Stay
          </h2>

          <p className="text-yaana-charcoal/80 mb-8">
            Curated experiences you will cherish. Come and feel the difference.
          </p>

          <Link
            href="/rental"
            className="inline-block px-8 py-3 bg-lavender-700 text-white rounded-full font-medium hover:bg-lavender-800 transition"
          >
            View Our Properties {"\u003e"}
          </Link>
        </div>
      </section>
    </div>
  );
}
