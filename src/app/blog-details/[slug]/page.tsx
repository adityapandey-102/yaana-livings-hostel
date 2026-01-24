import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Post | yaanalivings",
  description: "yaanalivings – Your Rented Home. Wherever you want; Whenever you need.",
};

export default function BlogDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="leaf-accent" />
      <Link href="/blog" className="inline-block text-yaana-forest font-semibold hover:underline mb-8">← Our reviews</Link>
      <h1 className="text-3xl font-serif text-yaana-charcoal mb-4">yaanalivings</h1>
      <p className="text-yaana-charcoal/90 mb-6">
        Yaana Living provides a wide range of options from hostels, PGs to studio apartments to fully furnished flats. Discover the real experiences that make yaanalivings more than just a place to stay. From cozy comforts to a strong sense of community.
      </p>
      <p className="mb-8">
        <Link href="/rental" className="text-yaana-forest font-semibold hover:underline mr-4">View properties</Link>
        <Link href="/contact" className="text-yaana-forest font-semibold hover:underline">Contact us</Link>
      </p>
    </div>
  );
}
