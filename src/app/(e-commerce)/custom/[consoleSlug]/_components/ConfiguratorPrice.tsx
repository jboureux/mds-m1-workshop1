"use client";

import { bebasNeue } from "@/app/fonts";
import { HandCoins } from "lucide-react";
import { useConfigurator } from "../_providers/configurator-provider";
import AddToCartButton from "./AddToCartButton";

const ConfiguratorPrice = () => {
    const { category, selectedOptions } = useConfigurator();
    const optionsPrice = selectedOptions.reduce((acc, option) => {
        return acc + (option.variant?.price ?? 0);
    }, 0);
    const hasDeviceReduction = selectedOptions.some(
        (option) =>
            option.accessoryId === "base" && option.variant.name === "Avec"
    );
    const totalPrice =
        category.price +
        optionsPrice -
        (hasDeviceReduction ? category.deviceDiscount : 0);
    return (
        <>
            <div className="flex flex-col items-center my-4">
                <p className="text-xs text-gray-500 text-center">Prix total</p>
                <p
                    className={`text-6xl text-black ${bebasNeue.className} text-center`}
                >
                    {totalPrice.toFixed(2) + " €"}
                </p>
                <div className="text-xs text-gray-500 text-center flex">
                    <HandCoins className="mr-2 w-4 h-4" />
                    <span>{`Acompte: ${(totalPrice * 0.3).toFixed(2)} €`}</span>
                </div>
            </div>
            <AddToCartButton />
        </>
    );
};

export default ConfiguratorPrice;
