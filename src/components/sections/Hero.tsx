"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScheduleVisitModal } from "../modals/ScheduleVisitModal";

const HERO_IMAGES = [
  "/assets/hero-bg.webp",
  "/assets/hero-image-1.png",
  "/assets/hero-image-2.png",
  "/assets/hero-image-3.png",
  "/assets/hero-image-5.png",
];

export function Hero() {
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    HERO_IMAGES.forEach((src, index) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded((prev) => ({ ...prev, [index]: true }));
      };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[85vh]- lg:h-[90vh]- h-[100vh] lg:h-[100vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/100 via-black/80 to-black/100">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {imagesLoaded[currentIndex] && (
              <>
                <Image
                  src={HERO_IMAGES[currentIndex]}
                  alt="yaana"
                  fill
                  className="object-cover object-center"
                  priority={currentIndex === 0}
                  sizes="100vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {HERO_IMAGES.map((src, index) => (
          <div key={index} className="hidden">
            <Image
              src={src}
              alt=""
              width={1920}
              height={1080}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

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
            Crafted for Students, Elevated by Comfort
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

      <ScheduleVisitModal open={scheduleVisitOpen} onClose={() => setScheduleVisitOpen(false)} />
{/* 
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]" /> */}
    </section>
  );
}