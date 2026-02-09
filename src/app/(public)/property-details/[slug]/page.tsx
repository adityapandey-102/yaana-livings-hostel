import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Share2, Heart, Bed, Wind, Wifi, Dumbbell, Sparkles } from "lucide-react";
import { ExclusiveOffersForm } from "@/components/property/ExclusiveOffersForm";
import { ContactPageContent } from "@/components/contact/ContactPageContent";

const PROPERTIES: Record<string, { name: string; loc: string; room: string; price: string; priceLabel?: string; href: string; img: string }> = {
  yaana7: { name: "Yaana homes", loc: "Girls", room: "Single, Double", price: "₹10,000", priceLabel: "Starts from", href: "https://www.yaanaliving.com/property/yaana7", img: "/assets/properties/yaana-homes.jpg" },
  yaana22: { name: "Yaana comforts", loc: "Girls", room: "Single, Double", price: "Contact management", priceLabel: "For rent", href: "https://www.yaanaliving.com/property/yaana22", img: "/assets/properties/yaana-comforts.jpg" },
  yaana: { name: "Yaana Group", loc: "Bengaluru, Karnataka", room: "Single, Double, Triple", price: "Contact management", priceLabel: "For rent", href: "https://www.yaanaliving.com/property/yaana", img: "/assets/properties/yaana-group.webp" },
  yaana2: { name: "Yaana living", loc: "Girls", room: "Single, Double, Triple & More", price: "Contact management", priceLabel: "For rent", href: "https://www.yaanaliving.com/property/yaana2", img: "/assets/properties/yaana-living.webp" },
};

const AMENITIES = [
  { icon: Bed, label: "Fully Furnished" },
  { icon: Wind, label: "Laundry" },
  { icon: Wifi, label: "High Speed WiFi" },
  { icon: Dumbbell, label: "Gym & Fitness" },
  { icon: Sparkles, label: "Daily Housekeeping" },
];

const LIFE_IMAGES = ["/assets/gallery/g1.jpg", "/assets/gallery/g2.jpg", "/assets/gallery/g3.webp", "/assets/gallery/g4.webp"];

const FAQ = [
  { q: "Why choose yaanalivings?", a: "We offer a wide range from hostels and PGs to studio apartments and fully furnished flats, with 10X better living: Smart KYC, digital payments, tenant app, and complimentary tenant insurance." },
  { q: "How secure are the properties?", a: "All our properties feature 24/7 security, CCTV, and controlled access. Your safety and peace of mind are our priorities." },
  { q: "What should I know before choosing accommodation?", a: "Consider location, budget, room type (single, double, triple), and included amenities. We help you compare options and arrange visits." },
  { q: "How do I get to the property?", a: "We share exact coordinates and directions after you express interest. Most of our properties are well connected by public transport." },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = PROPERTIES[params.slug];
  if (!p) return { title: "Property | yaanalivings" };
  return { title: `${p.name} | yaanalivings`, description: `${p.name} – ${p.loc}. ${p.room}. ${p.price}.` };
}

export default function HostelDetailsPage({ params }: { params: { slug: string } }) {
  const p = PROPERTIES[params.slug];
  if (!p) notFound();

  const sideImages = ["/assets/gallery/g1.jpg", "/assets/gallery/g2.jpg"];

  return (
    <div>
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link href="/rental" className="text-yaana-forest font-semibold hover:underline">
          ← All properties
        </Link>
      </div> */}
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

      {/* Hero: title, location, share/wishlist, gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-yaana-charcoal">{p.name}</h1>
            <p className="flex items-center gap-1 text-yaana-charcoal/80 mt-1">
              <MapPin className="w-4 h-4" />
              {p.loc}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-1 text-yaana-charcoal/70 hover:text-yaana-charcoal text-sm">
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button type="button" className="flex items-center gap-1 text-yaana-charcoal/70 hover:text-yaana-charcoal text-sm">
              <Heart className="w-4 h-4" /> Wishlist
            </button>
          </div>
        </div>

        {/* Gallery: main + 2 side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 aspect-[4/3] relative rounded-card overflow-hidden">
            <Image src={p.img} alt={p.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 66vw" />
          </div>
          <div className="flex flex-col gap-4">
            {sideImages.map((src, i) => (
              <div key={i} className="aspect-[4/3] relative rounded-card overflow-hidden">
                <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
            ))}
          </div>
        </div>

        {p.priceLabel === "For rent" ? (
          <p className="text-yaana-charcoal font-semibold text-xl">For rent, {p.price}</p>
        ) : (
          <>
            <p className="text-yaana-charcoal/70 text-sm">{p.priceLabel ?? "Starts from"}</p>
            <p className="text-yaana-charcoal font-semibold text-xl">{p.price}/mo*</p>
          </>
        )}
      </div>

      {/* Two-col: About + Exclusive Offers form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-yaana-charcoal mb-4">About {p.name}</h2>
            <div className="text-yaana-charcoal/90 space-y-4">
              <p>
                Yaana Living provides a wide range of options from hostels, PGs to studio apartments to fully furnished flats. This property offers comfort, convenience, and community—high-speed WiFi, gym, housekeeping, and more.
              </p>
              <p>
                Our spaces are designed for students and young professionals. With Smart KYC, digital rent payments, and our tenant app, we make moving in and living hassle-free. Experience 10X better living at yaanalivings.
              </p>
            </div>
          </div>
          {/* <div>
            <ExclusiveOffersForm />
          </div> */}
        </div>
      </div>

      {/* Amenities row */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-yaana-charcoal/10">
        <h2 className="text-lg font-semibold text-yaana-charcoal mb-6">Amenities</h2>
        <div className="flex flex-wrap gap-8">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <Icon className="w-8 h-8 text-yaana-charcoal mb-1" />
              <span className="text-sm text-yaana-charcoal/90">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Life at yaanalivings - 4 circular images */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-yaana-charcoal/10">
        <h2 className="text-lg font-semibold text-yaana-charcoal mb-6">Life at yaanalivings</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {LIFE_IMAGES.map((src, i) => (
            <div key={i} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden relative flex-shrink-0">
              <Image src={src} alt="" fill className="object-cover" sizes="112px" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-yaana-charcoal/10">
        <h2 className="text-lg font-semibold text-yaana-charcoal mb-6">FAQs on Living at yaanalivings</h2>
        <div className="space-y-6">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <p className="font-semibold text-yaana-charcoal">{q}</p>
              <p className="text-yaana-charcoal/80 text-sm mt-1">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <section className="py-10 bg-yaana-nearblack">
        <p className="text-center text-white font-serif text-lg md:text-xl">
          Every story deserves a chapter called yaanalivings!
        </p>
      </section>

      {/* Contact Us */}
      <section className="py-12 bg-yaana-cream">
        <ContactPageContent />
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href={"/rental"} rel="noopener noreferrer" className="inline-block bg-yaana-forest text-white px-6 py-2.5 rounded-btn font-medium hover:bg-yaana-forest-light">
          ← All properties
        </Link>
      </div>
    </div>
  );
}
