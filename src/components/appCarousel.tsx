import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

interface IAppCarouselProps {
  label: string;
  appList: APP_INFO[];
}

const AppCarousel = ({ label, appList }: IAppCarouselProps) => {
  return (
    <div className="w-full flex flex-col gap-3 pt-[1%] pb-[1.5%]">
      <h2 className="w-full pl-[4%]">
        <span className="text-[1.4vw] font-medium drop-shadow-jumbotron-text">
          {label}
        </span>
      </h2>
      <Carousel className="w-full overflow-hidden">
        <CarouselContent className="mx-auto w-full pl-[4%]">
          {[...appList].map((link, index) => (
            <CarouselItem key={index} className="basis-[16%] pl-2">
              <div
                className="relative aspect-[16/9] flex flex-col justify-between items-center rounded-[4px] overflow-hidden p-1"
                style={{
                  background: `url(${link.jumbotron_image}) no-repeat center center fixed`,
                  backgroundSize: "cover",
                }}
              >
                {/* Upper region */}
                <div className="w-full flex items-center justify-between h-[14%]">
                  {/* <span>test</span>
                  <span>test</span> */}
                </div>
                {/* Lower region */}
                <div className="w-full flex items-center justify-center h-[10%]">
                  {/* <span>test</span> */}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default AppCarousel;
