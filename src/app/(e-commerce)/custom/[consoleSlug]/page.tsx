import { bebasNeue } from "@/app/fonts";
import { Metadata } from "next";
import CustomBanner from "./_components/CustomBanner";
import CustomConfigurator from "./_components/CustomConfigurator";
import InfoCard from "./_components/InfoCard";
import {
    ConfiguratorProvider,
    ConfiguratorState,
    SelectedOption,
    Variant,
} from "./_providers/configurator-provider";

interface ConsolePageProps {
    params: {
        consoleSlug: string;
    };
}

export async function generateMetadata({
    params,
}: {
    params: ConsolePageProps["params"];
}): Promise<Metadata> {
    // fetch data
    //const product = await fetch(`https://.../${id}`).then((res) => res.json())

    return {
        title: `${params.consoleSlug} | Retrometroid`,
    };
}

const ConsolePage = async (props: ConsolePageProps) => {
    const category: ConfiguratorState = {
        id: 0,
        slug: props.params.consoleSlug,
        basePrice: 12,
        deviceReduction: -5,
        currency: "€",
        accessories: [
            {
                id: "1",
                name: "Coque",
                description: "Comprend coque avant et arrière",
                isBase: true,
                variants: [
                    {
                        id: 0,
                        hexcode: "#000000",
                        name: "Noir",
                        default: true,
                        images: {
                            FRONT: "GB-Front-GB-GB_FRONT_SHELL_Black0023.jpg",
                            SIDE: "GB-Side-GB_SIDE_Black0024.jpg",
                        },
                    },
                    {
                        id: 1,
                        hexcode: "#ff0000",
                        name: "Clear Red",
                        price: 10,
                        images: {
                            FRONT: "GB-Front-GB-GB_FRONT_SHELL_ClearRed0023.jpg",
                            SIDE: "GB-Side-GB_SIDE_ClearRed0024.jpg",
                        },
                        isTransparent: true,
                    },
                ],
            },
            {
                id: "1ezfze",
                name: "Coque arrière",
                description: "Coque arrière différente",
                isBase: false,
                variants: [
                    {
                        id: 0,
                        name: "Sans",
                        default: true,
                    },
                    {
                        id: 1,
                        hexcode: "#FFA500",
                        name: "Orange",
                        default: true,
                        images: {
                            SIDE: "GB-Side-GB_SIDE_ClearOrange0024DUAL.png",
                        },
                    },
                    {
                        id: 2,
                        hexcode: "#40E0D0",
                        name: "Ghost",
                        price: 10,
                        images: {
                            SIDE: "GB-Side-GB_SIDE_GHOT0024DUAL.png",
                        },
                        isTransparent: true,
                    },
                ],
            },
            {
                id: "2",
                name: "Boutons",
                isBase: false,
                variants: [
                    {
                        id: 0,
                        hexcode: "#00FF00",
                        name: "Clear Green",
                        default: true,
                        images: {
                            FRONT: "GB-Front-GB_FRONT_BUTTON_ClearGreen0023.png",
                            SIDE: "GB-Side-GB_SIDE_BUTTON_Clear_Green0023.png",
                        },
                        isTransparent: true,
                    },
                    {
                        id: 1,
                        hexcode: "#ff0000",
                        name: "Orange",
                        images: {
                            FRONT: "GB-Front-GB_FRONT_BUTTON_Orange0023.png",
                            SIDE: "GB-Side-GB_SIDE_BUTTON_Orange0023.png",
                        },
                    },
                ],
            },
            {
                id: "3",
                name: "Ecran IPS",
                description: "Ecran avec retro-eclairage",
                isBase: false,
                variants: [
                    {
                        id: 0,
                        name: "DMG",
                        hexcode: "#999999",
                        default: true,
                        images: {
                            FRONT: "GB-Front-GB_FRONT_IPS_DMG.png",
                            SIDE: "GB-Side-GB-SIDE-IPS_DMG.png",
                        },
                    },
                    {
                        id: 1,
                        name: "Black",
                        hexcode: "#000000",
                        images: {
                            FRONT: "GB-Front-GB_FRONT_IPS_Black.png",
                            SIDE: "GB-Side-GB-SIDE-IPS_Black.png",
                        },
                    },
                ],
            },
            {
                id: "5",
                name: "USB-C",
                description: "Comprend port USB-C et écouteur",
                isBase: false,
                variants: [
                    {
                        id: 0,
                        name: "Sans",
                    },
                    {
                        id: 1,
                        name: "Avec",
                        price: 10,
                        images: {
                            FRONT: "GB-Front-Front_USBC-02.png",
                            SIDE: "GB-Side-USBC-02.png",
                        },
                    },
                ],
            },
        ],
    };
    const selectedOptions: SelectedOption[] = [
        {
            accessoryId: "base",
            variant: {
                id: 0,
                name: "Sans",
            } as Variant,
        },
    ];

    category.accessories.forEach((accessory) => {
        selectedOptions.push({
            accessoryId: accessory.id,
            variant: accessory.variants[0],
            isBase: accessory.isBase ?? false,
        });
    });

    return (
        <ConfiguratorProvider
            initValue={{ category: category, selectedOptions: selectedOptions }}
        >
            <div>
                <CustomBanner
                    consoleName={props.params.consoleSlug}
                    basePrice={category.basePrice}
                    currency="€"
                />
                <CustomConfigurator />
                <InfoCard />
                <div className="bg-[#F8F8F8] pb-12">
                    <h2
                        className={`text-4xl pt-12 px-24 ${bebasNeue.className}`}
                    >
                        Inspiration
                    </h2>
                    <p className="text-center">je suis pas trop inspiré</p>
                </div>
            </div>
        </ConfiguratorProvider>
    );
};

export default ConsolePage;
