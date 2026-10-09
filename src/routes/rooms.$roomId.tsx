import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Users, BedDouble } from "lucide-react";
import { rooms, imageryDisclosure } from "@/data/property";
import { PageTop } from "@/components/Content";
import { Button } from "@/components/ui/button";
import { EnquiryCTA } from "@/components/SiteLayout";
import { pageHead } from "@/lib/metadata";
export const Route = createFileRoute("/rooms/$roomId")({
  head: ({ params }) =>
    pageHead(
      rooms.find((r) => r.id === params.roomId)?.name || "Room not found",
      "Discover the room layout, sharing arrangement and enquiry options at Srisubham Ladies Hostel.",
    ),
  component: RoomDetail,
});
function RoomDetail() {
  const { roomId } = Route.useParams();
  const room = rooms.find((r) => r.id === roomId);
  if (!room)
    return (
      <div className="site-width section">
        <h1 className="section-title">Room not found</h1>
        <Button variant="soft" asChild>
          <Link to="/rooms">Back to rooms</Link>
        </Button>
      </div>
    );
  return (
    <>
      <PageTop
        eyebrow="Your personal corner of Srisubham"
        title={room.name}
        description={room.description}
      />
      <section className="section">
        <div className="site-width">
          <Button variant="link" className="mb-6" asChild>
            <Link to="/rooms">
              <ArrowLeft />
              All rooms
            </Link>
          </Button>
          <div className="editorial">
            <div>
              <img
                src={room.image}
                width={1536}
                height={1024}
                alt={`${room.name} — generated concept`}
                className="w-full rounded-lg"
              />
              <p className="sample-note mt-4">{imageryDisclosure}</p>
            </div>
            <div>
              <span className="eyebrow">Sample room category</span>
              <h2 className="section-title mt-4">
                Make yourself
                <br />
                <em>at home.</em>
              </h2>
              <p className="detail-line mt-6">
                <Users className="size-4" />
                {room.capacity} residents · sample capacity
              </p>
              <p className="detail-line mt-3">
                <BedDouble className="size-4" />
                {room.arrangement}
              </p>
              <ul className="room-features">
                {room.features.map((f) => (
                  <li key={f}>
                    <Check className="size-3" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="price-row">
                <div>
                  <p className="sample-note">Monthly rent</p>
                  <strong>{room.monthlyRent || "Price on enquiry"}</strong>
                </div>
                <p className="sample-note">{room.availability || "Availability to be confirmed"}</p>
              </div>
              <p className="sample-note mb-6">
                Amenities shown in the concept are not verified property facilities. Deposit,
                inclusions and house rules are awaiting owner confirmation.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="hospitality" asChild>
                  <Link to="/contact" search={{ intent: "enquiry", room: room.id }}>
                    Enquire About This Room <ArrowUpRight />
                  </Link>
                </Button>
                <Button variant="soft" asChild>
                  <Link to="/contact" search={{ intent: "visit", room: room.id }}>
                    Book a Visit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EnquiryCTA />
    </>
  );
}
