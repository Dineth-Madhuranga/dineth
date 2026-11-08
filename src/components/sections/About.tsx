import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CvLink } from "@/components/ui/CvLink";

export function About() {
  return (
    <section id="about" className="about-section section" aria-labelledby="about-title">
      <div className="container">
        <div className="about-top">
          <p className="eyebrow">
            <span className="section-number">02</span> A LITTLE ABOUT ME
          </p>
          <span className="mono">THE PERSON BEHIND THE PIXELS</span>
        </div>
        <Reveal className="about-grid">
          <div className="about-portrait">
            <Image
              src="/images/profilep.jpg"
              alt="Dineth Madhuranga working at his desk"
              fill
              sizes="(max-width: 499px) 270px, 36vw"
            />
          </div>
          <div className="about-copy">
            <h2 id="about-title">
              An eye for the detail.
              <br />
              <em>A mind for the system.</em>
            </h2>
            <p className="about-lead">
              I enjoy the space where clean interfaces meet reliable engineering.
            </p>
            <p>
              I’m a full-stack software engineer based in Sri Lanka, building and deploying
              applications for businesses, agencies, and organizational workflows. I work across the
              frontend, backend, and the journey into production.
            </p>
            <p>
              At Media Asia Networks, I help turn complex requirements into practical applications.
              Alongside my engineering role, I work with freelance clients on websites, commerce,
              and custom software.
            </p>
            <div className="about-actions">
              <a className="text-link" href="#experience">
                My experience <ArrowUpRight size={16} />
              </a>
              <CvLink />
            </div>
          </div>
        </Reveal>
        <div className="about-principles">
          <span>Thoughtful by design.</span>
          <span>Dependable by engineering.</span>
          <span>Considered in every detail.</span>
        </div>
      </div>
    </section>
  );
}
