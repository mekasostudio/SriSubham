import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { property } from "@/data/property";

import logoImg from "@/assets/logo-transparent.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/amenities", label: "Amenities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
] as const;
export function Brand({ className = "" }: { className?: string }) {
  return (
    <span className={`brand ${className}`}>
      <img
        src={logoImg}
        alt={`${property.name} logo`}
        className="brand-logo"
        width="160"
        height="56"
        loading="eager"
      />
    </span>
  );
}
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="sr-only focus:not-sr-only" href="#main-content">
        Skip to content
      </a>
      <div className="site-width nav-inner">
        <Link to="/" aria-label="Srisubham Ladies Hostel home" onClick={() => setOpen(false)}>
          <Brand />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button variant="hospitality" className="desktop-enquire" asChild>
          <Link to="/contact" search={{ intent: "enquiry", room: "undecided" }}>
            Enquire Now <ArrowUpRight />
          </Link>
        </Button>
        <Button
          className="mobile-toggle"
          variant="ghost"
          size="icon"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Button variant="hospitality" asChild>
            <Link
              to="/contact"
              search={{ intent: "enquiry", room: "undecided" }}
              onClick={() => setOpen(false)}
            >
              Enquire Now <ArrowUpRight />
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
}
export function EnquiryCTA() {
  return (
    <section className="cta-band">
      <div className="site-width cta-inner">
        <div>
          <p className="eyebrow mb-4">Your next chapter starts here</p>
          <h2 className="section-title">
            A space that feels like <em>you.</em>
          </h2>
          <p className="section-intro mt-4">Let’s find the right room for your everyday.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="hospitality" asChild>
            <Link to="/contact" search={{ intent: "enquiry", room: "undecided" }}>
              Find Your Space <ArrowRight />
            </Link>
          </Button>
          <Button variant="soft" asChild>
            <Link to="/contact" search={{ intent: "visit", room: "undecided" }}>
              Book a Visit <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="site-width">
        <div className="footer-grid">
          <div>
            <Link to="/" aria-label="Srisubham Ladies Hostel home">
              <Brand />
            </Link>
            <p className="section-intro mt-6 max-w-64">
              Your Space. Your Comfort.
              <br />
              Your Community.
            </p>
            <p className="sample-note mt-5">Thoughtful stays. Beautiful beginnings.</p>
          </div>
          <div>
            <p className="footer-heading">Explore Srisubham</p>
            <div className="footer-links">
              {nav.slice(1, 5).map((item) => (
                <Link key={item.to} to={item.to}>
                  {item.label}
                </Link>
              ))}
              <Link to="/faq">Frequently asked questions</Link>
            </div>
          </div>
          <div>
            <p className="footer-heading">Let’s connect</p>
            <div className="footer-links">
              <Link to="/contact" search={{ intent: "enquiry", room: "undecided" }}>
                {property.phone || "Phone to be provided"}
              </Link>
              <Link to="/contact" search={{ intent: "enquiry", room: "undecided" }}>
                {property.email || "Email to be provided"}
              </Link>
              <Link to="/location">{property.address || "Address to be provided"}</Link>
              <Link to="/contact" search={{ intent: "enquiry", room: "undecided" }}>
                WhatsApp · {property.whatsapp ? "Enquire" : "not configured"}
              </Link>
              {property.instagram ? (
                <a href={property.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="inline size-3 mr-2" />
                  Instagram
                </a>
              ) : (
                <span className="flex items-center gap-2">
                  <Instagram className="size-3" />
                  Instagram to be provided
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="footer-heading">Good to know</p>
            <div className="footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/house-rules">House Rules</Link>
              <Link to="/contact" search={{ intent: "visit", room: "undecided" }}>
                Schedule a Visit <ArrowUpRight className="inline size-3" />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Srisubham Ladies Hostel. All rights reserved.</span>
          <span>Client demo · Concept imagery · Property details awaiting confirmation.</span>
          <span>Made for your next chapter.</span>
        </div>
      </div>
    </footer>
  );
}
