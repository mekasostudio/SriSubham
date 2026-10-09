import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Flower2, Check, Rotate3D } from "lucide-react";
import { Button } from "@/components/ui/button";
import fallback from "@/assets/room-cutaway.jpg";
const RoomScene = lazy(() => import("./RoomScene"));
function StaticRoom() {
  return (
    <img
      src={fallback}
      width={1536}
      height={1024}
      className="hero-static"
      alt="Concept architectural cutaway of a four-sharing room with two bunk-bed units"
    />
  );
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? <StaticRoom /> : this.props.children;
  }
}
function RoomExperience() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => {
      const canvas = document.createElement("canvas");
      setEnabled(media.matches && !!canvas.getContext("webgl2"));
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return enabled ? (
    <SceneBoundary>
      <Suspense fallback={<StaticRoom />}>
        <RoomScene />
      </Suspense>
    </SceneBoundary>
  ) : (
    <StaticRoom />
  );
}
export function Hero() {
  return (
    <section className="hero">
      <div className="site-width hero-inner">
        <div className="hero-canvas">
          <ClientOnly fallback={<StaticRoom />}>
            <RoomExperience />
          </ClientOnly>
          <span className="room-label label-study">Study Space</span>
          <span className="room-label label-storage">Personal Storage</span>
          <span className="room-label label-beds">Comfortable Beds</span>
        </div>
        <div className="hero-copy reveal">
          <span className="pill-eyebrow">
            <Flower2 className="size-3" /> A little away. A lot like home.
          </span>
          <p className="eyebrow mt-6">Srisubham Ladies Hostel · PG & Hostel for Women</p>
          <h1>
            Feel at home.
            <br />
            Even when
            <br />
            you’re <em>away.</em>
          </h1>
          <p>
            Thoughtfully designed stays for students and working women. Find your space, your
            comfort and your community.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Button variant="hospitality" asChild>
              <Link to="/rooms">
                Explore Rooms <ArrowRight />
              </Link>
            </Button>
            <Button variant="soft" asChild>
              <Link to="/contact" search={{ intent: "visit", room: "undecided" }}>
                Book a Visit <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="hero-trust">
            <Check className="size-3" />
            <span>Comfortable Living</span>
            <span>·</span>
            <span>Secure Access*</span>
            <span>·</span>
            <span>Study-Friendly Spaces</span>
          </div>
          <p className="sample-note mt-2">*Access arrangements to be confirmed by the owner.</p>
        </div>
        <span className="hero-image-note flex items-center gap-2">
          <Rotate3D className="size-3" /> Architectural concept · Not the actual property
        </span>
      </div>
    </section>
  );
}
