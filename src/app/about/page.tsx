import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Wifi, Dumbbell, Sparkles, Shield, KeyRound, Utensils, Users, TreeDeciduous, Heart } from "lucide-react";
import { EXCLUSIVE_AMENITIES } from "@/data/amenities";

export const metadata: Metadata = {
  title: "About Us | yaanalivings",
  description: "Yaana Living provides a wide range of options from hostels, PGs to studio apartments to fully furnished flats. Have a look at our properties and choose for yourself.",
};

const AMENITY_ICONS = [Wifi, Dumbbell, Sparkles, Shield, KeyRound, Utensils, Users, TreeDeciduous, Heart];

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
    <div className="">
      {/* <Link href="/" className="inline-block text-yaana-forest font-semibold hover:underline mb-8 pt-28">
        ← Back to Home
      </Link> */}

       {/* Hero: dark, matching yaana contact */}
            <section className="relative py-16 lg:py-24 bg-yaana-nearblack overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/assets/hero-bg.webp"
                  alt=""
                  fill
                  className="object-cover opacity-30"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-yaana-nearblack/80" />
              </div>
              <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white uppercase tracking-tight">
                  Luxury Student Residences
                </h1>
                <p className="text-white/90 mt-4 text-sm sm:text-base">
                  yaanalivings redefines hostel living with a touch of luxury, crafted for students and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areas—a safe, comfortable, and engaging environment.
                </p>
              </div>
            </section>

      {/* ABOUT US - white */}
      <section className="py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-yaana-charcoal uppercase tracking-tight mb-8 text-center">
          About Us
        </h1>
        <div className="max-w-3xl mx-auto text-yaana-charcoal/90 text-justify space-y-4">
          <p>
            Introducing yaanalivings, where student and professional living reaches new heights in India. We offer a wide range of options from hostels, PGs to studio apartments and fully furnished flats. Our spaces are designed for comfort, safety, and community.
          </p>
          <p>
            What truly sets us apart is our focus on 10X better living: Smart KYC, digital payments, our tenant app, faster complaint resolution, and complimentary tenant insurance. Have a look at our properties and choose for yourself.
          </p>
        </div>
      </section>

      {/* EXCLUSIVE AMENITIES - dark */}
      <section className="py-12 lg:py-16 bg-yaana-nearblack">
        <h2 className="text-2xl md:text-3xl font-semibold text-white uppercase tracking-tight mb-4 text-center">
          Exclusive Amenities
        </h2>
        <p className="max-w-2xl mx-auto text-white/85 text-center text-sm mb-12">
          From high-speed WiFi and fitness to security and community events, we bring together everything you need for a comfortable, connected stay.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {EXCLUSIVE_AMENITIES.map((label, i) => {
            const Icon = AMENITY_ICONS[i] ?? Heart;
            return (
              <div key={label} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-sm uppercase tracking-wider">{label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMMUNITY SPACES - white */}
      <section className="lg:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase tracking-tight mb-4 text-center">
          Community Spaces
        </h2>
        <p className="max-w-2xl mx-auto text-yaana-charcoal/90 text-center mb-10">
          Lounges, co-working corners, dining areas, and recreational zones—all crafted to help you connect, relax, and thrive.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {COMMUNITY_IMAGES.map((src, i) => (
            <div key={i} className="aspect-[3/2] relative rounded-card overflow-hidden">
              <Image src={src} alt={`Community space ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
            </div>
          ))}
        </div>
      </section>

      {/* NOT JUST A PLACE TO STAY - white */}
      <section className="py-12 lg:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal uppercase tracking-tight mb-2 text-center">
          Not Just a Place to Stay
        </h2>
        <p className="text-yaana-charcoal/80 text-center mb-8">
          Curated experiences you&apos;ll cherish. Come over and feel the difference.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="aspect-[4/3] relative rounded-card overflow-hidden">
            <Image src="/assets/gallery/g1.jpg" alt="Living" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="aspect-[4/3] relative rounded-card overflow-hidden">
            <Image src="/assets/gallery/g2.jpg" alt="Spaces" fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      <p className="pb-12 text-center">
        <Link href="/rental" className="text-yaana-forest font-semibold hover:underline">
          View our properties →
        </Link>
      </p>
    </div>
  );
}
