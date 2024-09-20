import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { toast } from "sonner";

function DialogDeleteItem({
    children,
    id,
}: {
    children: React.ReactNode;
    id: string;
}) {
    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
                {
                    method: "DELETE",
                }
            );
            if (response.ok) {
                toast.success("Produit supprimé avec succès");
            } else {
                console.error(
                    "Erreur lors de la suppression:",
                    await response.json()
                );
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Supprimer un produit</DialogTitle>
                    <DialogDescription>
                        Etes vous sur de supprimer le produit ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="submit"
                        className="bg-red-600"
                        onClick={handleDelete}
                    >
                        Supprimer le produit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogDeleteItem;
