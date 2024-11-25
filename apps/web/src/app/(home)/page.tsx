import Benefit from "./components/Benefit";
import HeroSection from "./components/HeroSection";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-12">
      <HeroSection />
      <Benefit />
      <Testimonial />
    </div>
  );
}
