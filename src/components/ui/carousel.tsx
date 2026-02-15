import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement>
  api: any
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: any
  setApi?: (api: any) => void
  plugins?: any[]
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ opts = {}, setApi, plugins = [], className, children, ...props }, ref) => {
    const [carouselRef, setCarouselRef] = React.useState<HTMLDivElement | null>(null)
    const [api, setApiState] = React.useState<any>(null)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    React.useEffect(() => {
      if (!carouselRef) return

      const loadEmbla = async () => {
        try {
          const EmblaCarousel = (await import("embla-carousel")).default
          const embla = EmblaCarousel(carouselRef, opts, plugins)
          setApiState(embla)
          setApi?.(embla)

          const onSelect = () => {
            setCanScrollPrev(embla.canScrollPrev())
            setCanScrollNext(embla.canScrollNext())
          }

          embla.on("init", onSelect)
          embla.on("reInit", onSelect)
          embla.on("select", onSelect)
          onSelect()
        } catch (error) {
          console.error("Failed to load Embla Carousel:", error)
        }
      }

      loadEmbla()
    }, [carouselRef, opts, plugins, setApi])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: { current: carouselRef },
          api,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={cn("relative w-full", className)}
          {...props}
        >
          <div
            ref={setCarouselRef}
            className="overflow-hidden"
          >
            <div className="flex">{children}</div>
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex", className)}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { basis?: string }
>(({ className, basis = "100%", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0", className)}
    style={{ flex: `0 0 ${basis}` }}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 z-40 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-lavender-600 transition-colors disabled:opacity-50",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft className="h-6 w-6 text-yaana-nearblack" />
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 z-40 h-10 w-10 rounded-full bg-white shadow-lg hover:bg-lavender-600 transition-colors disabled:opacity-50",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight className="h-6 w-6 text-yaana-nearblack" />
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel }

