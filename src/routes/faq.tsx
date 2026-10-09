import { createFileRoute } from "@tanstack/react-router";
import { FAQList, PageTop } from "@/components/Content";
import { EnquiryCTA } from "@/components/SiteLayout";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "Frequently Asked Questions",
      "Questions about rent, meals, visits, laundry, documents and accommodation policies at Srisubham Ladies Hostel.",
    ),
  component: FAQPage,
});
function FAQPage() {
  return (
    <>
      <PageTop
        eyebrow="Good to know"
        title="Let’s clear things up."
        description="The details matter. Find answers to common questions before choosing your next home."
      />
      <section className="section">
        <div className="site-width max-w-4xl">
          <p className="sample-note mb-6">
            Property answers are awaiting owner confirmation. No unconfirmed inclusions, fees or
            policies apply.
          </p>
          <FAQList />
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
