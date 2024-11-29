import Image from "next/image";
import { IoStar } from "react-icons/io5";

interface TestimonialProps {
  name: string;
  rating: number;
  image: string;
  testi: string;
}

const CardTestimonial: React.FC<TestimonialProps> = ({
  name,
  rating,
  image,
  testi,
}) => {
  const ratingIcon = Array.from({ length: rating }, () => ({
    icon: IoStar,
  }));

  return (
    <div
      key={name}
      className="min-w-[250px] max-w-xs flex-shrink-0 rounded-lg border bg-white p-4 transition-all duration-300 hover:border hover:border-secondary hover:shadow-md"
    >
      <p className="text-xs text-gray-900">{testi}</p>
      <div className="mt-4 flex gap-x-2">
        <Image
          src={image}
          alt="Profile-testimoni"
          width={30}
          height={30}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{name}</h3>
          <div className="flex">
            {ratingIcon.map((rating, idx) => (
              <rating.icon key={`Rating-${idx}`} size={15} className="text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTestimonial;
