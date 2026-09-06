import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Showreel } from "@/components/sections/Showreel";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Preloader } from "@/components/ui/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Marquee label="Selected clients" />
        <Showreel />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
