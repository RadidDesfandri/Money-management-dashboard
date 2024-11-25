import { IconType } from "react-icons";

interface BenefitProps {
  icon: IconType;
  tittle: string;
  description: string;
}

const CardBenefit: React.FC<BenefitProps> = ({
  icon: Icon,
  tittle,
  description,
}) => {
  return (
    <div className="rounded-xl border border-gray-400 px-4 py-7">
      <Icon
        size={30}
        className="hover:text-secondaryhover text-secondary transition-all duration-200"
      />
      <h1 className="mt-4 font-medium text-hitam">{tittle}</h1>
      <p className="text-[11px] text-gray-600">{description}</p>
    </div>
  );
};

export default CardBenefit;
