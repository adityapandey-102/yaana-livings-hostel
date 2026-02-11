import type { Metadata } from "next";
// import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";

export const metadata: Metadata = {
  title: "YAANA - Luxury Student Residences | Crafted for Students, Elevated by Luxury",
  description: "Experience unparalleled luxury student living at YAANA. Our premium residences across India offer state-of-the-art amenities, elegant design, and vibrant community spaces. 8+ Cities, 2500+ Beds, 30+ Hostels, 5000+ Students.",
  keywords: "luxury student housing, premium PG, student residences India, YAANA hostels, luxury hostel Mumbai, student accommodation",
  openGraph: {
    title: "YAANA - Luxury Student Residences",
    description: "Crafted for Students, Elevated by Luxury",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingContactButtons />
    </>
  );
}
