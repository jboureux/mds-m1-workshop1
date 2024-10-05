"use client";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfigurator } from "../_providers/configurator-provider";

const RecapModeCard = () => {
    const { category, selectedOptions } = useConfigurator();

    return (
        <>
            <CardHeader>
                <CardTitle>Options séléctionnées</CardTitle>
            </CardHeader>
            <CardContent>
                {selectedOptions.map((option) => {
                    const accessory = category.accessories.find(
                        (acces) => acces._id === option.accessoryId
                    );

                    let price = "";

                    if (option.variant.price) {
                        price = `(+${option.variant.price}€)`;
                    }

                    if (
                        option.accessoryId === "base" &&
                        option.variant.id === -1
                    ) {
                        price = `(-${category.deviceDiscount}€)`;
                    }

                    return (
                        <p key={option.accessoryId}>
                            <strong>
                                {option.accessoryId === "base"
                                    ? "Base console"
                                    : accessory?.name}
                            </strong>
                            :{` ${option.variant.name} ${price}`}
                        </p>
                    );
                })}
            </CardContent>
        </>
    );
};

export default RecapModeCard;
