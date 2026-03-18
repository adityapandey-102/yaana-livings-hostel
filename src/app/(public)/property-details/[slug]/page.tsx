import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Bed, Wind, Wifi, Dumbbell, Sparkles } from "lucide-react";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { PropertyShareButtons } from "@/components/property/PropertyShareButtons";
import { getBaseUrl } from "@/lib/site";
import { RENTAL_PROPERTIES, getPropertyBySlug } from "@/data/properties";
import { LavenderPairOneCorners } from "@/components/decor/LavenderPairOneCorners";
import { LavenderWallpaper } from "@/components/decor/LavenderWallpaper";

const SITE_URL = "https://yaanalivings.com";

const AMENITIES = [
  { icon: Bed, label: "Fully Furnished" },
  { icon: Wind, label: "Laundry" },
  { icon: Wifi, label: "High Speed WiFi" },
  { icon: Dumbbell, label: "Gym & Fitness" },
  { icon: Sparkles, label: "Daily Housekeeping" },
];

const LIFE_IMAGES = [
  "/assets/gallery/g1.jpg",
  "/assets/gallery/g2.jpg",
  "/assets/gallery/g3.webp",
  "/assets/gallery/g4.webp",
];


export async function generateStaticParams() {
  return RENTAL_PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export const dynamicParams = false;

function absoluteImageUrl(src: string) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  return `${SITE_URL}${src.startsWith("/") ? src : `/${src}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getPropertyBySlug(params.slug);
  if (!p) return { title: "Property | yaanalivings" };

  const canonicalUrl = `${SITE_URL}/property-details/${params.slug}`;
  const description = `${p.tagline}. ${p.positioning}`;

  return {
    title: `${p.name} | yaanalivings`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${p.name} | yaanalivings`,
      description,
      url: canonicalUrl,
      images: [absoluteImageUrl(p.img)],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} | yaanalivings`,
      description,
      images: [absoluteImageUrl(p.img)],
    },
  };
}

export default function HostelDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = getPropertyBySlug(params.slug);
  if (!p) notFound();

  const sideImages = ["/assets/gallery/g1.jpg", "/assets/gallery/g2.jpg"];
  const shareUrl = `${getBaseUrl()}/property-details/${params.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: p.name,
    description: `${p.tagline}. ${p.positioning}`,
    image: absoluteImageUrl(p.img),
    address: {
      "@type": "PostalAddress",
      streetAddress: p.loc,
      addressLocality: "Bengaluru",
      addressCountry: "IN",
    },
    url: `${SITE_URL}/property-details/${p.slug}`,
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b-- from-lavender-50 via-white to-lavender-50/40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LavenderWallpaper  />

      <section className="relative overflow-hidden bg-yaana-nearblack/95-- py-20 lg:py-28">
        <div className="absolute inset-0">
          {/* <Image
            src="/assets/hero-bg.webp"
            alt={p.name}
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          /> */}
          <LavenderWallpaper/>
          <div className="absolute inset-0 bg-gradient-to-br from-yaana-nearblack/95-- from-purple-200 via-purple-400 via-yaana-nearblack/85-- to-yaana-dark-lavender/70" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center text-black sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70-- text-black">
            Premium Student Living
          </p>
          <h1 className="mt-4 text-3xl font-semibold uppercase tracking-tight sm:text-4xl md:text-5xl">
            {p.name}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm text-white/90-- text-black sm:text-base md:text-lg">
            {p.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              {p.type}
            </span>
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              {p.room}
            </span>
            {p.rating && (
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
                Rated {p.rating}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="relative -mt-10 pb-12">
        {/* <LavenderWallpaper/> */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-lavender-200/70 bg-white/85 p-5 shadow-lg backdrop-blur sm:p-7">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <p className="flex items-start gap-2 text-sm text-yaana-charcoal/80 sm:text-base">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{p.loc}</span>
              </p>
              <PropertyShareButtons url={shareUrl} title={p.name} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>

              <div className="flex flex-col gap-4">
                {sideImages.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-lavender-50/60 p-4 md:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  Starting Price
                </p>
                <p className="mt-1 text-xl font-semibold text-yaana-charcoal">
                  {p.price}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  Room Options
                </p>
                <p className="mt-1 text-base font-medium text-yaana-charcoal">
                  {p.room}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-yaana-charcoal/60">
                  Utilities Included
                </p>
                <p className="mt-1 text-base font-medium text-yaana-charcoal">
                  {p.utilitiesIncluded.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* <LavenderWallpaper/> */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-lavender-200 bg-white/85 p-6 backdrop-blur lg:col-span-2">
            <h2 className="text-2xl font-semibold text-yaana-charcoal">
              About {p.name}
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-yaana-charcoal/90 sm:text-base">
              <p>{p.positioning}</p>
              <p>
                <span className="font-semibold text-yaana-charcoal">
                  Ideal audience:
                </span>{" "}
                {p.audience}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-lavender-200 bg-white/85 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold text-yaana-charcoal">
              Pricing and Charges
            </h3>
            <div className="mt-4 space-y-3 text-sm text-yaana-charcoal/90">
              {p.pricing.map((price) => (
                <p key={price.label}>
                  <span className="font-semibold">{price.label}:</span>{" "}
                  {price.amountPerMonth} / month
                </p>
              ))}
              <p>
                <span className="font-semibold">Deposit:</span> {p.deposit}
              </p>
              <p>
                <span className="font-semibold">Maintenance:</span>{" "}
                {p.maintenance}
              </p>
              <p>
                <span className="font-semibold">Food:</span> {p.food}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-yaana-charcoal">Amenities</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-xl border border-lavender-200 bg-white/85 p-4 text-center shadow-sm backdrop-blur"
            >
              <Icon className="mx-auto h-7 w-7 text-yaana-charcoal" />
              <p className="mt-2 text-sm font-medium text-yaana-charcoal">
                {label}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-2 rounded-2xl border border-lavender-200 bg-white/85 p-5 text-sm text-yaana-charcoal/90 backdrop-blur md:grid-cols-2">
          {p.facilities.map((facility) => (
            <li key={facility} className="flex items-start gap-2">
              <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-lavender-600" />
              <span>{facility}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-yaana-charcoal">
          Life at yaanalivings
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {LIFE_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-2xl border border-lavender-200 bg-white/70 backdrop-blur"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition duration-500 hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-yaana-charcoal">
          FAQs on Living at yaanalivings
        </h2>
        <div className="mt-6 space-y-4">
          {p.faqs.map(({ id,question, answer }) => (
            <div
              key={id}
              className="rounded-2xl border border-lavender-200 bg-white/85 p-5 backdrop-blur"
            >
              <p className="font-semibold text-yaana-charcoal">{question}</p>
              <p className="mt-2 text-sm text-yaana-charcoal/80">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-yaana-nearblack py-10">
        <p className="px-4 text-center text-lg text-white md:text-xl">
          Every story deserves a chapter called yaanalivings!
        </p>
      </section>

      <section className="relative bg-lavender-50 py-12">
        {/* <LavenderPairOneCorners /> */}
        <div className="relative z-10">
          <ContactPageContent mapUrl={p.map_url} />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-8">
          <Link
            href="/rental"
            className="inline-block rounded-btn bg-lavender-600 px-6 py-2.5 font-medium text-white hover:bg-lavender-700"
          >
            Back to all properties
          </Link>
        </div>
      </section>
    </div>
  );
}
