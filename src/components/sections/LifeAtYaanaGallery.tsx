"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type GalleryImage = {
  src: string;
};

type Gallery = {
  id: string;
  title: string;
  images: GalleryImage[];
};

type Props = {
  galleries: Gallery[];
};

const INITIAL_COUNT = 6;
const LOAD_STEP = 6;

export function LifeAtYaanaGallery({ galleries }: Props) {
  const initialCounts = useMemo(
    () =>
      galleries.reduce<Record<string, number>>((acc, gallery) => {
        acc[gallery.id] = Math.min(INITIAL_COUNT, gallery.images.length);
        return acc;
      }, {}),
    [galleries],
  );
  const [visibleCounts, setVisibleCounts] = useState(initialCounts);

  return (
    <>
      <div className="sticky top-4 z-20 mb-10 flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/40 bg-white/80 px-4 py-3 text-center shadow-lg backdrop-blur">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`#${gallery.id}`}
            className="inline-flex items-center justify-center rounded-full border border-yaana-charcoal/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-yaana-charcoal transition hover:bg-yaana-charcoal hover:text-white"
          >
            {gallery.title}
          </Link>
        ))}
      </div>

      <div className="space-y-16 md:space-y-20">
        {galleries.map((gallery) => {
          const visibleCount = visibleCounts[gallery.id] ?? INITIAL_COUNT;
          const isComplete = visibleCount >= gallery.images.length;

          return (
            <div
              key={gallery.id}
              id={gallery.id}
              className="scroll-mt-24"
              style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1200px" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-yaana-charcoal uppercase tracking-tight">
                  {gallery.title}
                </h3>
                <span className="text-xs uppercase tracking-[0.35em] text-yaana-charcoal/70">
                  {visibleCount} / {gallery.images.length}
                </span>
              </div>

              <div className="columns-1 sm:columns-2 md:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
                {gallery.images.slice(0, visibleCount).map(({ src }, i) => (
                  <div key={src} className="mb-4 md:mb-6 break-inside-avoid">
                    <div className="relative w-full overflow-hidden rounded-card">
                      <Image
                        src={src}
                        alt={`${gallery.title} ${i + 1}`}
                        width={800}
                        height={600}
                        quality={70}
                        loading="lazy"
                        className="h-auto w-full object-cover transition duration-700 hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {!isComplete ? (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCounts((prev) => ({
                        ...prev,
                        [gallery.id]: Math.min(
                          prev[gallery.id] + LOAD_STEP,
                          gallery.images.length,
                        ),
                      }))
                    }
                    className="inline-flex items-center justify-center rounded-full border border-yaana-charcoal/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.35em] text-yaana-charcoal transition hover:bg-yaana-charcoal hover:text-white"
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
