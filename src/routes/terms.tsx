import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/PolicyPage";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead(
      "Terms & Conditions",
      "Owner-approved accommodation terms for Srisubham Ladies Hostel are awaiting confirmation.",
    ),
  component: () => <PolicyPage kind="terms" title="Terms & Conditions" />,
});
