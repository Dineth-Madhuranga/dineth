import { experience } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section
      id="experience"
      className="experience-section section container"
      aria-labelledby="experience-title"
    >
      <div className="experience-layout">
        <SectionHeading number="04" label="THE JOURNEY">
          <span id="experience-title">
            Built through
            <br />
            <em>experience.</em>
          </span>
        </SectionHeading>
        <div className="timeline">
          {experience.map((job) => (
            <Reveal className="timeline-item" key={job.role}>
              <p className="eyebrow">{job.dates}</p>
              <h3>{job.role}</h3>
              <p className="company">
                {job.company} <span>{job.detail}</span>
              </p>
              <p className="job-description">{job.description}</p>
              <div className="tag-list">
                {job.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </Reveal>
          ))}
          <Reveal className="education">
            <p className="eyebrow">EDUCATION / 2023 — PRESENT</p>
            <h3>
              BT (Hons) in Information and
              <br className="desktop-break" /> Communication Technology
            </h3>
            <p>General Sir John Kotelawala Defence University</p>
            <span className="mono">DEGREE IN PROGRESS</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
