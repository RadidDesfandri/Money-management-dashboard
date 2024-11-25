import { Footer } from "@/components/Footer";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-50">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
