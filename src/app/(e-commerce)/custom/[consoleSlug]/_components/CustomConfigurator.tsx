"use client";

import { bebasNeue } from "@/app/fonts";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useConfigurator } from "../_providers/configurator-provider";
import ConfiguratorCard from "./ConfiguratorCard";
import ConsolePreview from "./ConsolePreview";
import CustomConfiguratorWrapper from "./CustomConfiguratorWrapper";

const CustomConfigurator = () => {
    const { category, selectedOptions } = useConfigurator();
    const views = ["frontViewUrl", "sideViewUrl", "backViewUrl"];
    return (
        <div className="flex flex-col items-center justify-center bg-[#F8F8F8] pb-12 h-fit lg:px-32">
            <h1
                className={`w-full text-center lg:text-left text-2xl tracking-wide my-6 ${bebasNeue.className}`}
            >
                Personnalisez votre console
            </h1>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-16 gap-8 w-full h-fit">
                <CustomConfiguratorWrapper>
                    <Carousel className="w-full max-w-sm">
                        <CarouselContent>
                            {views.map((view) => (
                                <CarouselItem key={view}>
                                    <div className="flex aspect-square items-center justify-center p-6">
                                        <ConsolePreview
                                            view={view}
                                            console={category.slug}
                                            selectedOptions={selectedOptions}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="lg:ml-0 ml-16" />
                        <CarouselNext className="lg:mr-0 mr-16" />
                    </Carousel>
                </CustomConfiguratorWrapper>
                <ConfiguratorCard />
            </div>
        </div>
    );
};

export default CustomConfigurator;
