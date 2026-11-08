import { ArrowUpRight, Layers3, Workflow } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/data/site";

export function EngineeringProjects() {
  return (
    <section className="engineering-section section" aria-labelledby="engineering-title">
      <div className="container">
        <div className="section-intro">
          <SectionHeading number="05" label="BEYOND THE INTERFACE">
            <span id="engineering-title">
              More than
              <br />
              <em>meets the eye.</em>
            </span>
          </SectionHeading>
          <p>
            Application engineering for real workflows.
            <br />A closer look at the systems behind the screen.
          </p>
        </div>
        <div className="engineering-grid">
          <Reveal className="engineering-card">
            <div className="engineering-card-top">
              <Layers3 size={30} strokeWidth={1} />
              <span className="mono">01 / MANAGEMENT PLATFORM</span>
            </div>
            <h3>
              Central Province
              <br />
              Tourism Registry
            </h3>
            <p>
              A tourism management platform supporting foreign visitor registration, tourism data
              analysis, and role-based dashboards for relevant stakeholders.
            </p>
            <div className="architecture" aria-label="Application layers">
              <span>React interface</span>
              <span>REST APIs</span>
              <span>Spring Boot</span>
            </div>
            <div className="tag-list">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>React</span>
              <span>REST APIs</span>
            </div>
          </Reveal>
          <Reveal className="engineering-card">
            <div className="engineering-card-top">
              <Workflow size={30} strokeWidth={1} />
              <span className="mono">02 / REPORTING PLATFORM</span>
            </div>
            <h3>
              Community Crime
              <br />
              Incident Reporting
            </h3>
            <p>
              An incident reporting platform with submission workflows, mapping, community
              awareness, and controlled access for different user roles.
            </p>
            <div className="architecture" aria-label="Application layers">
              <span>React interface</span>
              <span>FastAPI</span>
              <span>MongoDB</span>
            </div>
            <div className="tag-list">
              <span>React</span>
              <span>Python</span>
              <span>FastAPI</span>
              <span>MongoDB</span>
            </div>
          </Reveal>
        </div>
        <div className="engineering-footer">
          <p>Architecture and workflow summaries. Public demos are not available.</p>
          <a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">
            Explore my GitHub <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
