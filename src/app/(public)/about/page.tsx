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
import { LavenderPairOneCorners } from "@/components/decor/LavenderPairOneCorners";

export const metadata: Metadata = {
  title: "About Us | yaanalivings",
  description:
    "Yaana Living provides hostels, PGs, studio apartments, and fully furnished flats designed for comfort, safety, and community.",
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

const COMMUNITY_IMAGES = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.webp",
  "/assets/gallery/g4.webp",
  "/assets/gallery/g5.webp",
  "/assets/gallery/g6.webp",
];

export default function AboutPage() {
  return (
    <div className="w-full overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-20 md:py-28 bg-yaana-nearblack">
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
      </section>

      {/* ================= ABOUT ================= */}
      <section className="relative py-16 md:py-20 bg-white">
        <LavenderPairOneCorners />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-yaana-charcoal uppercase mb-8">
            About Us
          </h2>

          <div className="space-y-6 text-yaana-charcoal/90 text-base md:text-lg leading-relaxed">
            <p>
              Yaanalivings offers thoughtfully designed hostels, PGs, studio
              apartments, and fully furnished flats across India. Our spaces
              prioritize comfort, safety, and community living.
            </p>

            <p>
              What sets us apart is our 10X better living experience: Smart
              KYC, digital payments, a dedicated tenant app, faster complaint
              resolution, and complimentary tenant insurance.
            </p>
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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase mb-4 text-center">
            Community Spaces
          </h2>

          <p className="max-w-2xl mx-auto text-center text-yaana-charcoal/80 mb-10">
            Lounges, co-working corners, dining areas, and recreational
            zones — crafted to help you connect and thrive.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {COMMUNITY_IMAGES.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Community space ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

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
            View Our Properties →
          </Link>
        </div>
      </section>
    </div>
  );
}
