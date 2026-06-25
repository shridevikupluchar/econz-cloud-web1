import AmbientBackground from "@/components/effects/AmbientBackground";
import ScrollProgress from "@/components/effects/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ClientMarquee from "@/components/sections/ClientMarquee";
import Stats from "@/components/sections/Stats";
import Problems from "@/components/sections/Problems";
import ScrollZoom from "@/components/sections/ScrollZoom";
import WhatWeDo from "@/components/WhatWeDo/WhatWeDo";
import Values from "@/components/sections/Values";
import ClientVoices from "@/components/ClientVoices/ClientVoices";
import Partners from "@/components/sections/Partners";
import CtaBanner from "@/components/CtaBanner/CtaBanner";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <AmbientBackground />
      <Navbar />
      <main>
        <Hero />
        <ClientMarquee />
        <Stats />
        <Problems />
        <ScrollZoom />
        <WhatWeDo />
        <Values />
        <ClientVoices />
        <Partners />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
