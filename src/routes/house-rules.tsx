import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/house-rules")({
  head: () =>
    pageHead(
      "House Rules",
      "House rules and visitor arrangements for Srisubham Ladies Hostel are awaiting owner confirmation.",
    ),
  component: () => <PolicyPage kind="rules" title="A considerate shared home." />,
});
