import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Privacy Policy",
      "Privacy information and demo enquiry handling for Srisubham Ladies Hostel.",
    ),
  component: () => <PolicyPage kind="privacy" title="Privacy Policy" />,
});
