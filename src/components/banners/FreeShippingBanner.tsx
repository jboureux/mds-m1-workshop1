import { Truck } from "lucide-react";

interface FreeShippingBannerProps {
    price: number;
    currency: string;
    company: string;
}

const FreeShippingBanner = async (props: FreeShippingBannerProps) => {
    return (
        <div className="bg-black text-white p-2 text-xs text-center flex items-center justify-center gap-2">
            <Truck className="w-4 h-4" />
            <span>{`Livraison offerte dès ${props.price} ${props.currency} avec ${props.company}`}</span>
        </div>
    );
};

export default FreeShippingBanner;
