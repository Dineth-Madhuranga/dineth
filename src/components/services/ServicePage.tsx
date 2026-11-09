import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { services, type Service } from "@/data/services";
import { site } from "@/data/site";
import { serviceSchema } from "@/lib/seo";
import "./services.css";

export function ServicePage({ service }: { service: Service }) {
  const related = services.find(({ path }) => path !== service.path)!;
  return (
    <>
      <StructuredData data={serviceSchema(service)} />
      <Header homePage={false} />
      <main id="main-content" className="service-page container">
        <nav className="service-breadcrumb mono" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{service.label}</span>
        </nav>
        <section className="service-hero" aria-labelledby="service-title">
          <p className="eyebrow">DINETH MADHURANGA / {service.label}</p>
          <h1 id="service-title">{service.heading}</h1>
          <div className="service-introduction">
            <p className="service-lead">{service.introduction}</p>
            <div>
              <p>{service.summary}</p>
              <Link className="button button-dark" href="/#contact">
                Discuss your project <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="service-section" aria-labelledby="capabilities-title">
          <div className="service-section-heading">
            <p className="eyebrow">01 / THE WORK</p>
            <h2 id="capabilities-title">What I can help you build.</h2>
          </div>
          <div className="service-capabilities">
            {service.capabilities.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="service-section" aria-labelledby="examples-title">
          <div className="service-section-heading">
            <p className="eyebrow">02 / SELECTED EXPERIENCE</p>
            <h2 id="examples-title">A closer look at the work.</h2>
          </div>
          <div className="service-examples">
            {service.examples.map((example, index) => (
              <article key={example.name}>
                <span className="mono">0{index + 1}</span>
                <div>
                  <h3>{example.name}</h3>
                  <p>{example.description}</p>
                </div>
                <a
                  className="text-link"
                  href={example.href}
                  {...(example.href.startsWith("https:")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {example.linkLabel} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <Link className="text-link" href="/#work">
            View the full portfolio <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>
        <section className="service-section" aria-labelledby="collaboration-title">
          <div className="service-section-heading">
            <p className="eyebrow">03 / REMOTE COLLABORATION</p>
            <h2 id="collaboration-title">
              Colombo, Anuradhapura, Kandy.
              <br />
              <em>Connected by the work.</em>
            </h2>
          </div>
          <p className="service-location-copy">
            I work remotely with clients in Colombo, Anuradhapura, Kandy, and elsewhere in Sri
            Lanka. Whether you need a new website or help with an application, email your
            requirements or use the contact form to start a conversation about scope, timing, and
            collaboration.
          </p>
          <ol className="service-process">
            {service.process.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="service-section" aria-labelledby="questions-title">
          <div className="service-section-heading">
            <p className="eyebrow">04 / BEFORE WE START</p>
            <h2 id="questions-title">A few useful answers.</h2>
          </div>
          <div className="service-questions">
            {service.questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="service-contact" aria-labelledby="next-step-title">
          <p className="eyebrow">YOUR NEXT STEP</p>
          <h2 id="next-step-title">Tell me what you’re working on.</h2>
          <p>Share the problem, the people it needs to help, and what you have in mind.</p>
          <div className="service-contact-links">
            <Link className="button button-dark" href="/#contact">
              Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a className="text-link" href={`mailto:${site.email}`}>
              Email Dineth directly <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <Link className="service-related text-link" href={related.path}>
            Explore {related.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer homePage={false} />
    </>
  );
}
