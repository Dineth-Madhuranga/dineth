import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CvLink } from "@/components/ui/CvLink";

export function Hero() {
  return (
    <section id="home" className="hero container" aria-labelledby="hero-title">
      <Reveal className="hero-top">
        <p className="eyebrow">
          <span className="small-cross" aria-hidden="true">
            +
          </span>{" "}
          SOFTWARE ENGINEER / FULL-STACK DEVELOPER
        </p>
      </Reveal>
      <Reveal delay={0.1} className="hero-title-wrap">
        <h1 id="hero-title">
          <span>I build what you see.</span>
          <span className="hero-serif">And what makes</span>
          <span className="hero-last">
            <span>
              it work<span className="copper">.</span>
            </span>
            <ArrowDownRight className="hero-arrow" strokeWidth={0.8} aria-hidden="true" />
          </span>
        </h1>
        <div className="hero-stamp" aria-hidden="true">
          <div className="stamp-orbit">
            <span>dm.</span>
          </div>
          <p>
            DESIGN MINDED.
            <br />
            ENGINEERING DRIVEN.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.2} className="hero-bottom">
        <a href="#work" className="scroll-marker">
          <span>
            <ArrowDown size={18} />
          </span>
          <span className="mono">
            SCROLL TO
            <br />
            EXPLORE
          </span>
        </a>
        <p>
          I’m Dineth, a software engineer connecting thoughtful interfaces with dependable systems.
          From the first interaction to the infrastructure behind it.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#work">
            Explore selected work <ArrowUpRight size={19} />
          </a>
          <CvLink />
        </div>
      </Reveal>
      <div className="hero-footnote mono">
        <span>FRONTEND. BACKEND. EVERYTHING BETWEEN.</span>
      </div>
    </section>
  );
}
