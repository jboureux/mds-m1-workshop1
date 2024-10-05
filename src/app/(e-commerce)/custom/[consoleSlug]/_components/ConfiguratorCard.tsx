"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import ConfiguratorPrice from "./ConfiguratorPrice";
import EditModeCard from "./EditModeCard";
import RecapModeCard from "./RecapModeCard";

const ConfiguratorCard = () => {
    const [editMode, setEditMode] = useState<boolean>(true);

    return (
        <Card className="w-fit h-fit mx-4 lg:m-0">
            {editMode ? <EditModeCard /> : <RecapModeCard />}
            <ConfiguratorPrice />
            <CardContent className="flex flex-col gap-2">
                <Button
                    variant={"outline"}
                    onClick={() => setEditMode(!editMode)}
                    className="w-full"
                >
                    <Settings2Icon className="mr-2 w-4 h-4" />
                    <span>
                        {editMode
                            ? `Voir le récapitulatif`
                            : `Modifier ma configuration`}
                    </span>
                </Button>
                <AddToCartButton />
            </CardContent>
        </Card>
    );
};

export default ConfiguratorCard;
