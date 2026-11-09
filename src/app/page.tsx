import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { EngineeringProjects } from "@/components/sections/EngineeringProjects";
import { Contact } from "@/components/sections/Contact";
import { Services } from "@/components/sections/Services";
import { StructuredData } from "@/components/seo/StructuredData";
import { homeSchema } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <StructuredData data={homeSchema()} />
      <Header />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <About />
        <Expertise />
        <Services />
        <Experience />
        <EngineeringProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
