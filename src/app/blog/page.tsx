import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Reviews | yaanalivings",
  description: "Discover the real experiences that make yaanalivings more than just a place to stay. From cozy comforts to a strong sense of community.",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="leaf-accent" />
      <Link href="/" className="inline-block text-yaana-forest font-semibold hover:underline mb-8">← Back to Home</Link>
      <h1 className="text-3xl font-serif text-yaana-charcoal mb-4">Our reviews!</h1>
      <p className="text-yaana-charcoal/90 mb-8">
        Discover the real experiences that make yaanalivings more than just a place to stay. From cozy comforts to a strong sense of community, hear firsthand from those who call yaanalivings their home. Our residents share stories of connection, support, and all the reasons yaanalivings is the perfect blend of comfort and convenience for a fulfilling journey away from home.
      </p>
      <p className="text-yaana-charcoal/90 mb-8">
        Stay updated with the latest news, events, and activities happening at yaanalivings. Discover the excitement and energy within our vibrant community.
      </p>
      <Link href="/contact" className="text-yaana-forest font-semibold hover:underline">Share your experience / View All Reviews →</Link>
    </div>
  );
}
