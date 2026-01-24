"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GetInTouchModal } from "@/components/modals/GetInTouchModal";

export function Hero() {
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false);

  return (
    <section className="relative h-[85vh] lg:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-bg.webp"
          alt="yaanalivings luxury student residences"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white tracking-tighter leading-[1.1] mb-6">
            YAANA
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/95 tracking-luxury uppercase mb-10">
            Crafted for Students, Elevated by Luxury
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            asChild
            className="min-w-[180px] bg-white text-yaana-nearblack hover:bg-white/90 font-medium uppercase tracking-wide text-sm"
          >
            <Link href="/rental">View properties</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setScheduleVisitOpen(true)}
            className="min-w-[180px] border-2 border-white text-white bg-transparent hover:bg-white hover:text-yaana-nearblack font-medium uppercase tracking-wide text-sm"
          >
            Schedule a Visit
          </Button>
        </motion.div>
      </div>

      <GetInTouchModal open={scheduleVisitOpen} onClose={() => setScheduleVisitOpen(false)} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
  );
}
