import { bebasNeue } from "@/app/fonts";
import { Accessory } from "@/models/accessory.model";
import { Category } from "@/models/category.model";
import { Variant } from "@/models/variant.model";
import { Metadata } from "next";
import CustomBanner from "./_components/CustomBanner";
import CustomConfigurator from "./_components/CustomConfigurator";
import InfoCard from "./_components/InfoCard";
import {
    ConfiguratorProvider,
    SelectedOption,
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
    const category: Category = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/slug/${params.consoleSlug}`
    ).then((res) => res.json());

    return {
        title: `${category.name} | Retrometroid`,
    };
}

const ConsolePage = async (props: ConsolePageProps) => {
    const categoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/slug/${props.params.consoleSlug}`
    ).then((res) => res.json());

    if (categoryResponse.error) {
        return <div>Error</div>;
    }

    const category = categoryResponse as Category;

    const accessoriesResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accessory/category/${category.id}`
    ).then((res) => res.json());

    if (accessoriesResponse.error) {
        category.accessories = [];
    } else {
        category.accessories = accessoriesResponse as Accessory[];
    }

    const selectedOptions: SelectedOption[] = [
        {
            accessoryId: "base",
            variant: {
                id: 0,
                name: "Sans",
            } as Variant,
        },
    ];
    if (category.accessories) {
        category.accessories.forEach((accessory) => {
            selectedOptions.push({
                accessoryId: accessory._id,
                variant: accessory.variants[0],
                isBase: accessory.isBase ?? false,
            });
        });
    } else {
        category.accessories = [];
    }

    return (
        <ConfiguratorProvider
            initValue={{ category: category, selectedOptions: selectedOptions }}
        >
            <div>
                <CustomBanner
                    consoleName={category.name}
                    basePrice={category.price}
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
