import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import Link from "next/link";
import { services } from "@/data/services";

export function Footer({ homePage = true }: { homePage?: boolean }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-title">
          <a href={`mailto:${site.email}`}>
            LET’S MAKE
            <br />
            SOMETHING <em>WORK.</em>
            <ArrowUpRight strokeWidth={0.8} aria-hidden="true" />
          </a>
        </div>
        <nav className="footer-services" aria-label="Development services">
          {services.map((service) => (
            <Link key={service.path} href={service.path}>
              {service.label} {service.audience === "worldwide" ? "worldwide" : "in Sri Lanka"}{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="footer-bottom">
          <a
            href={homePage ? "#home" : "/"}
            className="wordmark"
            aria-label="Dineth Madhuranga, home"
          >
            dm<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Dineth Madhuranga</p>
          <span className="footer-note mono">THOUGHTFULLY BUILT. DOWN TO THE LAST DETAIL.</span>
          <a className="back-top" href={homePage ? "#home" : "#main-content"}>
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
