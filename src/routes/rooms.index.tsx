import { createFileRoute } from "@tanstack/react-router";
import { PageTop, RoomCard } from "@/components/Content";
import { EnquiryCTA } from "@/components/SiteLayout";
import { rooms, imageryDisclosure } from "@/data/property";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/rooms/")({
  head: () =>
    pageHead(
      "Our Rooms",
      "Explore four-sharing, five-sharing and premium room concepts at Srisubham Ladies Hostel. Pricing and availability on enquiry.",
    ),
  component: RoomsPage,
});
function RoomsPage() {
  return (
    <>
      <PageTop
        eyebrow="Find your space"
        title="Your kind of comfort."
        description="Thoughtfully arranged rooms for different needs, different routines, and beautiful new beginnings."
      />
      <section className="section">
        <div className="site-width">
          <div className="room-grid">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
          <p className="sample-note mt-6">
            {imageryDisclosure} All room layouts are sample concepts. Actual capacities, facilities,
            rent and availability require owner confirmation.
          </p>
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
