import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | yaanalivings",
  description: "Photo gallery of yaanalivings properties. Hostels, PGs, studio apartments and fully furnished flats.",
};

const gallery = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.webp",
  "/assets/gallery/g4.webp",
  "/assets/gallery/g5.webp",
  "/assets/gallery/g6.webp",
  "/assets/properties/yaana-homes.jpg",
  "/assets/properties/yaana-comforts.jpg",
  "/assets/properties/yaana-group.webp",
  "/assets/properties/yaana-living.webp",
];

export default function GalleryPage() {
  return (
    <div>

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
            Gallery
          </h1>
          <p className="text-white/90 mt-4 text-sm sm:text-base">
            yaanalivings redefines hostel living with a touch of luxury, crafted for students and young professionals. Ideally located near top educational hubs, we offer an inspiring space complete with high-end amenities, stylish rooms, and vibrant common areasâ€”a safe, comfortable, and engaging environment.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="leaf-accent" />
        {/* <Link href="/" className="inline-block text-lavender-700 font-semibold hover:underline mb-8">â† Back to Home</Link> */}
        <h1 className="text-3xl md:text-4xl font-serif text-yaana-charcoal mb-4">Gallery</h1>
        <p className="text-yaana-charcoal/90 mb-12 max-w-2xl">
          Embark on a visual journey through our stunning properties. Each photo showcases comfort and refinement across hostels, PGs, and fully furnished flats.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden relative">
              <Image src={src} alt={`Gallery ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

