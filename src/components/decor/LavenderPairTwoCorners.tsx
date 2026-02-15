import Image from "next/image";

type Props = {
  className?: string;
};

export function LavenderPairTwoCorners({ className = "" }: Props) {
  return (
    <>
      <Image
        src="/assets/flower-cutouts/lavender2-topLeft-corner.png"
        alt=""
        aria-hidden="true"
        width={768}
        height={768}
        className={`absolute top-0 left-0 z-0 w-52 md:w-56 lg:w-80 h-auto opacity-60-- pointer-events-none select-none ${className}`}
      />
      <Image
        src="/assets/flower-cutouts/lavender2-bottomRight-corner.png"
        alt=""
        aria-hidden="true"
        width={768}
        height={768}
        className={`absolute bottom-0 right-0 z-0 w-52 md:w-56 lg:w-80 h-auto opacity-60-- pointer-events-none select-none ${className}`}
      />
    </>
  );
}
