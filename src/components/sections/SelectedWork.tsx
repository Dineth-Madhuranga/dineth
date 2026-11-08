import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import previews from "@/data/preview-status.json";
import { ProjectPreview, type PreviewAssets } from "@/components/projects/ProjectPreview";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SelectedWork() {
  const assets: Record<string, PreviewAssets> = previews;
  return (
    <section id="work" className="work-section section container" aria-labelledby="work-title">
      <div className="section-intro">
        <SectionHeading number="01" label="SELECTED WORK">
          <span id="work-title">
            Good on the surface.
            <br />
            <em>Solid underneath.</em>
          </span>
        </SectionHeading>
        <p>
          A selection of websites and digital products.
          <br />
          Built for people. Engineered for the real world.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((project, i) => (
          <Reveal key={project.id} className={`project ${i === 0 ? "project-featured" : ""}`}>
            <ProjectPreview project={project} assets={assets[project.id]} featured={i === 0} />
            <div className="project-info">
              <div className="project-title-row">
                <span className="project-index mono">0{i + 1}</span>
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <h3>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.name}
                    </a>
                  </h3>
                </div>
                <a
                  className="project-arrow"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.name} website`}
                >
                  <ArrowUpRight strokeWidth={1.5} />
                </a>
              </div>
              <div className="project-details">
                <p>{project.description}</p>
                <div className="tag-list">
                  {(project.stack || project.focus).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    className="text-link visit-link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website <ArrowUpRight size={15} />
                  </a>
                  {project.repository && (
                    <a
                      className="text-link visit-link"
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View code <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
