"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfigurator } from "../_providers/configurator-provider";

interface AddToCartPayload {
    category_id: number;
    applyDiscount: boolean;
    options: {
        accessoryId: string;
        variantId: number;
    }[];
}

const AddToCartButton = () => {
    const { category, selectedOptions } = useConfigurator();
    const router = useRouter();
    const handleAddToCart = () => {
        const payload: AddToCartPayload = {
            category_id: category.id,
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }).then((res) => {
            if (res.ok) {
                res.text().then((data) => {
                    router.push(data);
                });
            }
        });
    };
    return (
        <Button onClick={handleAddToCart} className="w-full">
            <ShoppingCart className="mr-2 w-4 h-4" />
            <span>Ajouter au panier</span>
        </Button>
    );
};

export default AddToCartButton;
