import { bebasNeue } from "@/app/layout";
import { Metadata } from "next";
import CustomBanner from "./_components/CustomBanner";
import CustomConfigurator from "./_components/CustomConfigurator";
import InfoCard from "./_components/InfoCard";

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
    return (
        <div>
            <CustomBanner
                consoleName={props.params.consoleSlug}
                basePrice={10}
                currency="€"
            />
            <CustomConfigurator />
            <InfoCard />
            <div className="bg-[#F8F8F8] pb-12">
                <h2 className={`text-4xl pt-12 px-24 ${bebasNeue.className}`}>
                    Inspiration
                </h2>
                <p className="text-center">je suis pas trop inspiré</p>
            </div>
        </div>
    );
};

export default ConsolePage;
