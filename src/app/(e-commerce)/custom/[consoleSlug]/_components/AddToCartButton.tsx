"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useConfigurator } from "../_providers/configurator-provider";

interface AddToCartPayload {
    category: number;
    applyDiscount: boolean;
    options: {
        accessoryId: string;
        variantId: number;
    }[];
}

const AddToCartButton = () => {
    const { category, selectedOptions } = useConfigurator();
    const handleAddToCart = () => {
        const payload: AddToCartPayload = {
            category: category.id,
            applyDiscount: selectedOptions.some(
                (option) =>
                    option.accessoryId === "base" && option.variant.id === -1
            ),
            options: selectedOptions
                .filter((option) => option.accessoryId !== "base")
                .map((option) => ({
                    accessoryId: option.accessoryId,
                    variantId: option.variant.id,
                })),
        };
        console.log(payload);
    };
    return (
        <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 w-4 h-4" />
            <span>Ajouter au panier</span>
        </Button>
    );
};

export default AddToCartButton;
