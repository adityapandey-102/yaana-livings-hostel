import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | yaanalivings",
  description: "Refund policy and cancellation terms for yaanalivings services and bookings.",
  alternates: {
    canonical: '/refund',
  },
  openGraph: {
    title: "Refund Policy | yaanalivings",
    description: "Refund policy and cancellation terms for yaanalivings services and bookings.",
    url: '/refund',
  },
};

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-yaana-charcoal mb-8">Refund Policy</h1>
      <p className="text-yaana-charcoal/90 mb-6">Refund policy content placeholder.</p>
      <Link href="/" className="text-lavender-700 font-semibold hover:underline">← Back to Home</Link>
    </div>
  );
}

