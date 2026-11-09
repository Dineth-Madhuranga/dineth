import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { internationalServices } from "@/data/services";

export function Services() {
  return (
    <section
      id="services"
      className="services-section section container"
      aria-labelledby="services-title"
    >
      <div className="section-intro">
        <div>
          <p className="eyebrow">WORKING TOGETHER</p>
          <h2 id="services-title">
            Websites &amp; software.
            <br />
            <em>Built around your business.</em>
          </h2>
        </div>
        <p>
          Remote web development and software engineering worldwide. Based in Sri Lanka, I welcome
          projects from the USA, UK, Canada, Australia, Germany, and beyond.
        </p>
      </div>
      <div className="service-links">
        {internationalServices.map((service, index) => (
          <Link className="service-link" href={service.path} key={service.path}>
            <span className="mono">
              0{index + 1} / {index === 0 ? "WEBSITES & STOREFRONTS" : "APPLICATIONS & APIS"}
            </span>
            <h3>{service.label}</h3>
            <p>
              {index === 0
                ? "Business websites, e-commerce stores, and responsive React or Next.js interfaces."
                : "Custom web applications, REST APIs, dashboards, and the systems behind them."}
            </p>
            <span className="text-link">
              Explore the service <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
