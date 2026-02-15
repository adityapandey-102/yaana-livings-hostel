import Link from "next/link";

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-serif text-yaana-charcoal mb-8">Refund Policy</h1>
      <p className="text-yaana-charcoal/90 mb-6">Refund policy content placeholder.</p>
      <Link href="/" className="text-lavender-700 font-semibold hover:underline">â† Back to Home</Link>
    </div>
  );
}

