import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { EngineeringProjects } from "@/components/sections/EngineeringProjects";
import { Contact } from "@/components/sections/Contact";
import { site, siteUrl } from "@/data/site";

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Software Engineer",
    url: siteUrl(),
    email: site.email,
    address: { "@type": "PostalAddress", addressCountry: "LK" },
    sameAs: [site.github, ...(site.linkedinVerified ? [site.linkedin] : [])],
    knowsAbout: ["Full-stack web development", "REST APIs", "Cloud deployment", "React", "Node.js"],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Header />
      <main id="main-content">
        <Hero />
        <SelectedWork />
        <About />
        <Expertise />
        <Experience />
        <EngineeringProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
