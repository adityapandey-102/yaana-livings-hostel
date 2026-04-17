"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  title: string;
  previewImages: string[];
  images: string[];
};

function uniqByValue(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function PropertyImageGallery({ title, previewImages, images }: Props) {
  const isDev = process.env.NODE_ENV === "development";
  const preview = useMemo(() => previewImages.slice(0, 3), [previewImages]);
  const allImages = useMemo(
    () => uniqByValue([...(images ?? []), ...(previewImages ?? [])]),
    [images, previewImages],
  );

  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeSrc = activeIndex === null ? null : allImages[activeIndex] ?? null;

  useEffect(() => {
    if (activeIndex === null || allImages.length === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev - 1 + allImages.length) % allImages.length;
        });
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((prev) => {
          if (prev === null) return prev;
          return (prev + 1) % allImages.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, allImages.length]);

  const openAtSrc = (src: string | undefined) => {
    if (!src) return;
    const idx = allImages.indexOf(src);
    setActiveIndex(idx >= 0 ? idx : 0);
  };

  const openAtIndex = (index: number) => {
    if (allImages.length === 0) return;
    setActiveIndex(((index % allImages.length) + allImages.length) % allImages.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {preview[0] ? (
          <button
            type="button"
            onClick={() => openAtSrc(preview[0])}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-2"
            aria-label="Open photo viewer"
          >
            <Image
              src={preview[0]}
              alt={title}
              fill
              className={[
                "object-cover transition duration-500 group-hover:scale-105",
                loadedBySrc[preview[0]] ? "opacity-100" : "opacity-0",
              ].join(" ")}
              sizes="(max-width: 768px) 100vw, 66vw"
              onLoadingComplete={() =>
                setLoadedBySrc((prev) =>
                  prev[preview[0]] ? prev : { ...prev, [preview[0]]: true },
                )
              }
              unoptimized={isDev}
            />
          </button>
        ) : null}

        <div className="flex flex-col gap-4">
          {preview.slice(1).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => openAtSrc(src)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              aria-label="Open photo viewer"
            >
              <Image
                src={src}
                alt=""
                fill
                className={[
                  "object-cover transition duration-500 group-hover:scale-105",
                  loadedBySrc[src] ? "opacity-100" : "opacity-0",
                ].join(" ")}
                sizes="(max-width: 768px) 100vw, 33vw"
                onLoadingComplete={() =>
                  setLoadedBySrc((prev) => (prev[src] ? prev : { ...prev, [src]: true }))
                }
                unoptimized={isDev}
              />

              {i === 1 && allImages.length > preview.length ? (
                <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/35 text-sm font-semibold uppercase tracking-[0.25em] text-white">
                  View more
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {allImages.length > preview.length ? (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => openAtIndex(0)}
            className="inline-flex items-center justify-center rounded-btn bg-yaana-charcoal px-6 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-yaana-charcoal/90"
          >
            View more photos
          </button>
        </div>
      ) : null}

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <DialogContent
          onClose={() => setActiveIndex(null)}
          className="max-w-[min(95vw,1100px)] border-white/10 bg-black/90 p-3 sm:p-4"
        >
          {activeSrc ? (
            <div className="relative">
              <DialogHeader className="sr-only">
                <DialogTitle>Photo viewer</DialogTitle>
                <DialogDescription>
                  View property photos. Use previous and next buttons or left and right arrow keys
                  to navigate. Press escape to close.
                </DialogDescription>
              </DialogHeader>

              <div className="mb-3 flex items-center justify-between gap-3 pr-10">
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                    {title}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                    {activeIndex! + 1} / {allImages.length}
                  </p>
                </div>
              </div>

              <div className="relative h-[70vh] w-full overflow-hidden rounded-lg bg-black/40">
                <Image
                  src={activeSrc}
                  alt={`${title} ${activeIndex! + 1}`}
                  fill
                  priority
                  quality={90}
                  unoptimized={isDev}
                  className="object-contain"
                  sizes="(max-width: 768px) 95vw, 1100px"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => {
                    if (prev === null) return prev;
                    return (prev - 1 + allImages.length) % allImages.length;
                  })
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/90 backdrop-blur transition hover:bg-black/70"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  setActiveIndex((prev) => {
                    if (prev === null) return prev;
                    return (prev + 1) % allImages.length;
                  })
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 p-2 text-white/90 backdrop-blur transition hover:bg-black/70"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

