import { useTestimonial } from "@/hooks/useCardItems";
import CardTestimonial from "./CardTestimonial";

const Testimonial = () => {
  const testimoni = useTestimonial();

  return (
    <div className="py-16">
      <div className="flex justify-center">
        <h1 className="text-center text-2xl font-semibold md:w-[700px] md:text-3xl">
          Bergabung dengan Ratusan Pengguna yang Sudah Merasakan Manfaatnya
        </h1>
      </div>

      <div className="scrollbar-none mt-3 w-full space-x-4 overflow-x-auto">
        <div className="flex gap-x-4 p-5">
          {testimoni.map((card) => (
            <CardTestimonial
              key={card.name}
              name={card.name}
              image={card.image}
              testi={card.testi}
              rating={card.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
