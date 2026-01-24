"use client";

import Image from "next/image";
import { SectionFade } from "@/components/ui/section-fade";

export function AppSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <SectionFade className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="leaf-accent" />
        <h2 className="text-2xl md:text-3xl font-serif text-yaana-charcoal text-center mb-4">
          KEEP yaanalivings AT YOUR FINGERTIPS
        </h2>
        <p className="text-center text-yaana-charcoal/80 mb-4 font-medium">
          Express yourself, effortlessly.
        </p>
        <p className="max-w-2xl mx-auto text-center text-yaana-charcoal/90">
          Need assistance, have feedback, or want to make a suggestion? Reach out through our app&apos;s support and real-time feedback feature. We&apos;re here to listen, improve, and make your experience even better.
        </p>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a href="#" aria-label="Google Play" className="block transition hover:opacity-90">
            <Image src="/assets/google-play.webp" alt="Google Play" width={160} height={52} className="h-12 w-auto object-contain" sizes="160px" />
          </a>
          <a href="#" aria-label="App Store" className="block transition hover:opacity-90">
            <Image src="/assets/app-store.webp" alt="App Store" width={160} height={52} className="h-12 w-auto object-contain" sizes="160px" />
          </a>
        </div>
      </SectionFade>
    </section>
  );
}
