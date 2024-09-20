"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings2Icon } from "lucide-react";
import { useState } from "react";
import ConfiguratorPrice from "./ConfiguratorPrice";
import EditModeCard from "./EditModeCard";

const ConfiguratorCard = () => {
    const [editMode, setEditMode] = useState<boolean>(true);

    return (
        <Card className="w-fit h-fit mx-4 lg:m-0">
            {editMode ? (
                <EditModeCard handleModeChange={setEditMode} />
            ) : (
                <>
                    <Button
                        variant={"outline"}
                        onClick={() => setEditMode(true)}
                        className="w-full"
                    >
                        <Settings2Icon className="mr-2 w-4 h-4" />
                        <span>Modifier ma configuration</span>
                    </Button>
                    <ConfiguratorPrice />
                </>
            )}
        </Card>
    );
};

export default ConfiguratorCard;
