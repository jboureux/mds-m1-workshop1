import { bebasNeue } from "@/app/layout";

interface CustomBannerProps {
    consoleName: string;
    basePrice: number;
    currency: string;
}

const CustomBanner = (props: CustomBannerProps) => {
    return (
        <div className="bg-gray-900 pb-4 pt-12 px-12">
            <p className="text-gray-400">
                A partir de {props.basePrice} {props.currency}
            </p>
            <h1
                className={`text-6xl font-bold tracking-wide text-white ${bebasNeue.className}`}
            >
                {props.consoleName}
            </h1>
        </div>
    );
};

export default CustomBanner;
