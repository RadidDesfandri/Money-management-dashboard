import Image from "next/image";
import CardBenefit from "./CardBenefit";
import { useBenefit } from "@/hooks/useCardItems";

const Benefit = () => {
  const benefit = useBenefit();
  const leftBenefit = benefit.slice(0, 2);
  const rightBenefit = benefit.slice(2, 4);

  return (
    <div className="py-16">
      <h1 className="text-center text-2xl font-semibold md:text-3xl">
        Optimalkan Pengelolaan Tabungan Anda
      </h1>
      <div className="flex justify-center">
        <p className="mt-4 w-80 text-center text-[11px] text-gray-700 md:w-96 md:text-xs">
          Atur dan kelola tabungan dengan lebih efisien untuk mencapai tujuan
          jangka pendek dan panjang.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 space-y-4 md:grid-cols-3 md:space-x-4 md:space-y-0">
        <div className="flex flex-col space-y-4">
          {leftBenefit.map((benefit) => {
            return (
              <CardBenefit
                key={benefit.tittle}
                icon={benefit.icon}
                tittle={benefit.tittle}
                description={benefit.description}
              />
            );
          })}
        </div>

        <div className="bg-secondaryhover hidden overflow-hidden rounded-xl md:block">
          <Image
            alt="Benefit"
            width={400}
            height={200}
            src={"/holdingphone.jpg"}
            className="h-[337px] object-cover"
          />
        </div>

        <div className="flex flex-col space-y-4">
          {rightBenefit.map((benefit) => {
            return (
              <CardBenefit
                key={benefit.tittle}
                icon={benefit.icon}
                tittle={benefit.tittle}
                description={benefit.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefit;
