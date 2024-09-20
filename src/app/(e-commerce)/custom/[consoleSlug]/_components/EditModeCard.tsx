"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import ColorCircle from "@/components/ui/color-circle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Variant } from "@/models/variant.model";
import { ScrollTextIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useConfigurator } from "../_providers/configurator-provider";
import ConfiguratorPrice from "./ConfiguratorPrice";

interface EditModeCardProps {
    handleModeChange: Dispatch<SetStateAction<boolean>>;
}

const EditModeCard = (props: EditModeCardProps) => {
    const { category, selectedOptions, setSelectedOptions } = useConfigurator();
    const handleOptionChange = (accessoryId: string, variant: Variant) => {
        if (
            !selectedOptions.some(
                (option) =>
                    option.accessoryId === accessoryId &&
                    option.variant.id === variant.id
            )
        ) {
            setSelectedOptions(
                selectedOptions.map((option) =>
                    option.accessoryId === accessoryId
                        ? { ...option, variant }
                        : option
                )
            );
        }
    };
    return (
        <Tabs defaultValue={"base"} className="w-full h-full">
            <CardHeader>
                <TabsList className="flex flex-wrap h-fit">
                    <TabsTrigger value="base">
                        <div className="flex items-center">
                            <span>Base console</span>
                        </div>
                    </TabsTrigger>
                    {category.accessories.map((accessory) => (
                        <TabsTrigger key={accessory._id} value={accessory._id}>
                            {accessory.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </CardHeader>
            <CardContent className="h-full">
                <TabsContent value="base">
                    <div className="flex flex-col h-full">
                        <p className="text-xs text-gray-500">
                            Vous pouvez customiser votre propre console
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center items-center h-full my-4">
                            <Button
                                variant={"outline"}
                                onClick={() =>
                                    handleOptionChange("base", {
                                        id: 0,
                                        name: "Sans",
                                        price: 0,
                                    })
                                }
                                className={cn(
                                    "rounded-full",
                                    selectedOptions.some(
                                        (option) =>
                                            option.accessoryId === "base" &&
                                            option.variant.id === 0
                                    )
                                        ? "border-2 border-gray-500 "
                                        : ""
                                )}
                            >
                                Sans
                            </Button>
                            <Button
                                variant={"outline"}
                                onClick={() =>
                                    handleOptionChange("base", {
                                        id: -1,
                                        name: "Avec",
                                        price: 0,
                                    })
                                }
                                className={cn(
                                    "rounded-full",
                                    selectedOptions.some(
                                        (option) =>
                                            option.accessoryId === "base" &&
                                            option.variant.id === -1
                                    )
                                        ? "border-2 border-gray-500 "
                                        : ""
                                )}
                            >
                                {`Avec (${category.deviceDiscount} €)`}
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                {category.accessories.map((accessory) => (
                    <TabsContent key={accessory._id} value={accessory._id}>
                        <div className="flex flex-col h-full">
                            {accessory.description ? (
                                <p className="text-xs text-gray-500">
                                    {accessory.description}
                                </p>
                            ) : null}
                            {accessory.variants ? (
                                <div className="flex flex-wrap gap-4 justify-center items-center h-full my-4">
                                    {accessory.variants
                                        .sort(
                                            (a, b) =>
                                                (a.price ?? 0) - (b.price ?? 0)
                                        )
                                        .map((variant) => (
                                            <div
                                                key={variant.name}
                                                className="flex items-center"
                                            >
                                                {variant.hexcode ? (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant={
                                                                    "ghost"
                                                                }
                                                                onClick={() =>
                                                                    handleOptionChange(
                                                                        accessory._id,
                                                                        variant
                                                                    )
                                                                }
                                                                className={cn(
                                                                    "w-fit h-fit rounded-full p-0",
                                                                    selectedOptions.some(
                                                                        (
                                                                            option
                                                                        ) =>
                                                                            option.accessoryId ===
                                                                                accessory._id &&
                                                                            option
                                                                                .variant
                                                                                .name ===
                                                                                variant.name
                                                                    )
                                                                        ? "border-2 border-gray-500"
                                                                        : ""
                                                                )}
                                                            >
                                                                <ColorCircle
                                                                    color={
                                                                        variant.hexcode
                                                                    }
                                                                    isTransparent={
                                                                        variant.isTransparent
                                                                    }
                                                                />
                                                            </Button>
                                                        </TooltipTrigger>

                                                        <TooltipContent>
                                                            <p>
                                                                {variant.name}
                                                                {variant.price
                                                                    ? ` (${variant.price} $€)`
                                                                    : ""}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ) : (
                                                    <Button
                                                        variant={"outline"}
                                                        onClick={() =>
                                                            handleOptionChange(
                                                                accessory._id,
                                                                variant
                                                            )
                                                        }
                                                        className={cn(
                                                            "rounded-full",
                                                            selectedOptions.some(
                                                                (option) =>
                                                                    option.accessoryId ===
                                                                        accessory._id &&
                                                                    option
                                                                        .variant
                                                                        .name ===
                                                                        variant.name
                                                            )
                                                                ? "border-2 border-gray-500 "
                                                                : ""
                                                        )}
                                                    >
                                                        {variant.name}
                                                        {variant.price
                                                            ? ` (${variant.price} €)`
                                                            : ""}
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ) : null}
                        </div>
                    </TabsContent>
                ))}
                <div>
                    <Button
                        variant={"outline"}
                        onClick={() => props.handleModeChange(false)}
                        className="w-full"
                    >
                        <ScrollTextIcon className="mr-2 w-4 h-4" />
                        <span>Voir le récapitulatif</span>
                    </Button>
                    <ConfiguratorPrice />
                </div>
            </CardContent>
        </Tabs>
    );
};

export default EditModeCard;
