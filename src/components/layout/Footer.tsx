import { ArrowUp, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export function Footer() {
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
        <div className="footer-bottom">
          <a href="#home" className="wordmark" aria-label="Dineth Madhuranga, back to top">
            dm<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Dineth Madhuranga</p>
          <span className="footer-note mono">THOUGHTFULLY BUILT. DOWN TO THE LAST DETAIL.</span>
          <a className="back-top" href="#home">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
