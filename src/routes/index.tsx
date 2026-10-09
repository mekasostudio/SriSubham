import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Heart } from "lucide-react";
import { Hero } from "@/components/Hero";
import {
  PromiseStrip,
  RoomsSection,
  Reveal,
  AmenitiesGrid,
  SafetySection,
  FAQList,
  Reviews,
} from "@/components/Content";
import { EnquiryCTA } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { lounge, study, storage, four, imageryDisclosure } from "@/data/property";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Srisubham Ladies Hostel — Girls’ PG & Hostel",
      "Thoughtfully designed stays for students and working women. Your Space. Your Comfort. Your Community.",
    ),
  component: Index,
});
function Index() {
  return (
    <>
      <Hero />
      <PromiseStrip />
      <RoomsSection />
      <section className="section bg-muted">
        <div className="site-width">
          <Reveal className="editorial">
            <div className="editorial-media">
              <img
                src={lounge}
                width={1536}
                height={1024}
                loading="lazy"
                alt="AI-generated concept of a welcoming common lounge"
              />
              <div className="editorial-caption">
                <Heart className="size-6 text-primary" />
                <div>
                  <p className="display text-2xl">More than a place to stay.</p>
                  <p className="sample-note">
                    A little space. A little connection. A lot of possibility.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-5">Welcome to your next chapter</p>
              <h2 className="section-title">
                Your own space.
                <br />
                Your <em>next chapter.</em>
              </h2>
              <p className="section-intro mt-5">
                New city. New beginnings. A place to settle in and be yourself. Srisubham Ladies
                Hostel brings a thoughtful approach to women’s shared accommodation.
              </p>
              <div className="border-t border-border pt-5 mt-6 flex gap-4">
                <BookOpen className="size-5 text-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold">Make room for what matters</p>
                  <p className="section-intro mt-2">
                    A quiet study corner, organised storage, or a shared cup of tea. Comfort lives
                    in the everyday details.
                  </p>
                </div>
              </div>
              <Button variant="soft" className="mt-6" asChild>
                <Link to="/gallery" search={{ category: "All spaces" }}>
                  Get to know our spaces <ArrowUpRight />
                </Link>
              </Button>
              <p className="sample-note mt-4">{imageryDisclosure}</p>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="site-width">
          <div className="text-center">
            <p className="eyebrow mb-4">Everyday ease, thoughtfully considered</p>
            <h2 className="section-title">
              The details that make a <em>difference.</em>
            </h2>
            <p className="section-intro mx-auto mt-4">
              An at-a-glance checklist for your stay. Property facilities are awaiting owner
              confirmation.
            </p>
          </div>
          <AmenitiesGrid />
          <div className="text-center mt-5">
            <Button variant="link" asChild>
              <Link to="/amenities">
                View amenities & policies <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <SafetySection />
      <section className="section">
        <div className="site-width">
          <div className="flex flex-wrap justify-between items-end gap-5 mb-9">
            <div>
              <p className="eyebrow mb-4">A closer look at Srisubham</p>
              <h2 className="section-title">
                Room to feel <em>at home.</em>
              </h2>
            </div>
            <Button variant="link" asChild>
              <Link to="/gallery" search={{ category: "All spaces" }}>
                Explore the gallery <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <Reveal className="gallery-preview">
            {[
              { image: four, alt: "Four-sharing room" },
              { image: study, alt: "Study space" },
              { image: storage, alt: "Personal storage" },
            ].map((i) => (
              <Link to="/gallery" search={{ category: "All spaces" }} key={i.alt}>
                <img
                  src={i.image}
                  width={1536}
                  height={1024}
                  loading="lazy"
                  alt={`${i.alt} — generated concept`}
                />
              </Link>
            ))}
          </Reveal>
          <p className="sample-note mt-4">{imageryDisclosure}</p>
        </div>
      </section>
      <Reviews />
      <section className="section bg-muted">
        <div className="site-width editorial">
          <div>
            <p className="eyebrow mb-4">A few things you might be wondering</p>
            <h2 className="section-title">
              Good questions.
              <br />
              <em>Clear answers.</em>
            </h2>
            <Button variant="link" className="mt-5" asChild>
              <Link to="/faq">
                All frequently asked questions <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <FAQList limit={4} />
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
