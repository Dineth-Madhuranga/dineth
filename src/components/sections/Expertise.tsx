import { Plus } from "lucide-react";
import { skills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Expertise() {
  return (
    <section
      id="expertise"
      className="expertise-section section container"
      aria-labelledby="expertise-title"
    >
      <div className="section-intro">
        <SectionHeading number="03" label="WHAT I BRING">
          <span id="expertise-title">
            The whole picture.
            <br />
            <em>Every layer.</em>
          </span>
        </SectionHeading>
        <p>
          From what people interact with
          <br />
          to what keeps everything running.
        </p>
      </div>
      <div className="expertise-list">
        {skills.map((skill, i) => (
          <Reveal key={skill.title}>
            <details className="expertise-row" open={i === 0}>
              <summary>
                <span className="mono">0{i + 1}</span>
                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.intro}</p>
                </div>
                <Plus className="expertise-icon" strokeWidth={1.2} />
              </summary>
              <div className="expertise-content">
                <p>{skill.description}</p>
                <div className="tag-list">
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
