import Image from "next/image";


import Subtitle from "./subtitle";
import Title from "./title";

interface IWithImage {
  title: string;
  subtitle: string;
  imageSource: string;
  type: "textOnLeft" | "textOnRight";
}

const WithImage = ({ title, subtitle, imageSource, type }: IWithImage) => {
  return (
    <>
      {type === "textOnLeft" ? (
        <div className="my-4 flex flex-col items-center justify-normal gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-start gap-2">
            <Title className="text-left md:text-4xl">{title}</Title>
            <Subtitle className="text-left">{subtitle}</Subtitle>
          </div>
          <Image
            className="border-border w-full max-w-[500px] rounded-2xl border"
            alt="example"
            src={imageSource}
            width={1200}
            height={700}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-normal gap-4 lg:flex-row lg:justify-between">
          <Image
            className=" border-border order-2 w-full max-w-[500px] rounded-2xl border lg:order-1"
            alt="example"
            src={imageSource}
            width={1200}
            height={700}
          />
          <div className=" order-1 flex flex-col items-start gap-2 lg:order-2 lg:items-end">
            <Title className="text-left md:text-4xl lg:text-right">
              {title}
            </Title>
            <Subtitle className="text-left lg:text-right">{subtitle}</Subtitle>
          </div>
        </div>
      )}
    </>
  );
};

export default WithImage;
