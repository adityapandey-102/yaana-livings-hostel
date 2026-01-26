import { Hero } from "@/components/sections/Hero";
import { WhyYaana } from "@/components/sections/WhyYaana";
import { Cities } from "@/components/sections/Cities";
import { HostelCards } from "@/components/sections/HostelCards";
import { Perks } from "@/components/sections/Perks";
import { LifeAtYaana } from "@/components/sections/LifeAtYaana";
import { NotJustAPlace } from "@/components/sections/NotJustAPlace";
import { Contact } from "@/components/sections/Contact";
import { WorldOfYaana } from "@/components/sections/WorldOfYaana";
import { Spotlight } from "@/components/sections/Spotlight";
import { AppSection } from "@/components/sections/AppSection";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyYaana />
      <Cities />
      <HostelCards />
      <Perks />
      <LifeAtYaana />
      <NotJustAPlace />
      <WorldOfYaana/>
      <Spotlight/>
      {/* <AppSection/> */}
      <Contact />
    </>
  );
}
