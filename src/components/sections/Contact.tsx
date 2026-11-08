import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { site } from "@/data/site";
import { contactConfiguration } from "@/lib/contact-config";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const config = contactConfiguration();
  return (
    <section id="contact" className="contact-section section" aria-labelledby="contact-title">
      <div className="container">
        <p className="eyebrow">
          <span className="section-number">06</span> LET’S START A CONVERSATION
        </p>
        <Reveal className="contact-heading">
          <h2 id="contact-title">
            Have something in mind?
            <br />
            <em>Let’s build it.</em>
          </h2>
          <ArrowUpRight className="contact-heading-arrow" strokeWidth={0.8} aria-hidden="true" />
        </Reveal>
        <div className="contact-grid">
          <div className="contact-details">
            <p>
              Have a project, a role, or an interesting problem?
              <br />
              I’d like to hear about it.
            </p>
            <a className="contact-email" href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={19} />
            </a>
            <div className="contact-direct">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} />
                WhatsApp <ArrowUpRight size={14} />
              </a>
              <a href={site.telephone}>
                <Phone size={17} />
                {site.phone}
              </a>
            </div>
            <div className="contact-social">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={13} />
              </a>
              {site.linkedinVerified && (
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowUpRight size={13} />
                </a>
              )}
              <a href={site.medium} target="_blank" rel="noopener noreferrer">
                Medium <ArrowUpRight size={13} />
              </a>
              <a href={site.frontendMentor} target="_blank" rel="noopener noreferrer">
                Frontend Mentor <ArrowUpRight size={13} />
              </a>
            </div>
            <p className="contact-location">
              <Mail size={15} /> Based in Sri Lanka. Open to conversations worldwide.
            </p>
          </div>
          <ContactForm configured={config.ready} testMode={config.testMode} />
        </div>
      </div>
    </section>
  );
}
