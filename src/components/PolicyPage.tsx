import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageTop } from "@/components/Content";
import { Button } from "@/components/ui/button";
import { property } from "@/data/property";
export function PolicyPage({
  kind,
  title,
}: {
  kind: "privacy" | "terms" | "rules";
  title: string;
}) {
  return (
    <>
      <PageTop
        eyebrow="Clear details, thoughtful living"
        title={title}
        description="Please review the owner-approved information before making a room or visit request."
      />
      <section className="section">
        <div className="site-width max-w-3xl">
          <h2 className="display text-3xl mb-5">
            {property.legal[kind] ? "Property information" : "Awaiting property owner’s policy"}
          </h2>
          <p className="section-intro max-w-none whitespace-pre-line">
            {property.legal[kind] ||
              "The property owner has not supplied this policy. This page is a template placeholder, not a binding accommodation policy. No deposit, refund, visitor, or contractual terms are implied."}
          </p>
          {kind === "privacy" && (
            <p className="section-intro max-w-none mt-5">
              In the current demo, enquiry information is processed only within this page and is not
              stored in a database or sent to the owner. Downloading a request saves it on your
              device. Sharing through WhatsApp, when configured, sends the information you choose to
              share to WhatsApp. Do not enter sensitive identity documents.
            </p>
          )}
          <Button variant="soft" className="mt-7" asChild>
            <Link to="/contact" search={{ intent: "enquiry", room: "undecided" }}>
              Ask about this policy <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
