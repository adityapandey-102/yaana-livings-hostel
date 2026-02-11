import { Hero } from "@/components/sections/Hero";
import { WhyYaana } from "@/components/sections/WhyYaana";
import { Cities } from "@/components/sections/Cities";
import { HostelCards } from "@/components/sections/HostelCards";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs";
import { Perks } from "@/components/sections/Perks";
import { LifeAtYaana } from "@/components/sections/LifeAtYaana";
import { NotJustAPlace } from "@/components/sections/NotJustAPlace";
import { Contact } from "@/components/sections/Contact";
import { WorldOfYaana } from "@/components/sections/WorldOfYaana";
import { Spotlight } from "@/components/sections/Spotlight";
import { AppSection } from "@/components/sections/AppSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { RentalPageContent } from "@/components/rental/RentalPageContent";
import { RentalProperties } from "@/components/sections/RentalProperties";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <WhyYaana />
      {/* <Cities /> */}
      <RentalProperties/>
      {/* <HostelCards /> */}
      <FeaturedBlogs />
      <Perks />
      <LifeAtYaana />
      <NotJustAPlace />
      {/* <WorldOfYaana/> */}
      {/* <Spotlight/> */}
      {/* <AppSection/> */}
      <Contact />
      <Footer />
      <FloatingContactButtons />
    </>
  );
}
