import Benefit from "./components/Benefit";
import HeroSection from "./components/HeroSection";
import LoadingFormUser from "./components/LoadingFormUser";
import OtpForm from "./components/OtpForm";
import Testimonial from "./components/Testimonial";
import UserForm from "./components/UserForm";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-12">
      <HeroSection />
      <Benefit />
      <Testimonial />
      <OtpForm />
      <UserForm />
      <LoadingFormUser />
    </div>
  );
}
