"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ReturnToConsolesListButtonProps {
    icon?: boolean;
}

const ReturnToConsolesListButton = (props: ReturnToConsolesListButtonProps) => {
    const router = useRouter();
    return (
        <Button
            variant={"secondary"}
            className="w-fit"
            onClick={() => {
                router.push("/admin/products");
            }}
        >
            {props.icon && <ArrowLeft className="w-5 h-5 mr-4" />}
            <span>Retourner à la liste des consoles</span>
        </Button>
    );
};

export default ReturnToConsolesListButton;
