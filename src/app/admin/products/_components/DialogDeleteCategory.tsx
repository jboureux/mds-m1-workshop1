"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    deleteCategory,
    getCategories,
} from "@/repositories/category.repository";
import { FormEvent } from "react";
import { toast } from "sonner";
import { useAdminCategories } from "../_providers/admin-categories-provider";
import { useCategoryDialog } from "../_providers/category-dialog-provider";

function DialogDeleteCategory() {
    const dialogContext = useCategoryDialog();
    const { setCategories } = useAdminCategories();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dialogContext.category) {
            try {
                await deleteCategory(dialogContext.category?.id);
            } catch (error) {
                toast.error(`${error}`);
            }
            toast.success("Console supprimée avec succès");
            dialogContext.setOpen(false);
            const newData = await getCategories();
            setCategories(newData);
        } else {
            toast.error(
                "Erreur, aucune console n'est associée a cette boite de dialogue"
            );
        }
    };
    return (
        <Dialog
            open={dialogContext.open && dialogContext.type === "delete"}
            onOpenChange={dialogContext.setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Supprimer une console</DialogTitle>
                    <DialogDescription>
                        Etes-vous sûr de vouloir supprimer la console{" "}
                        <strong>{dialogContext.category?.name}</strong> ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-row justify-end gap-4"
                    >
                        <Button variant={"secondary"}>
                            Retour a la liste des consoles
                        </Button>
                        <Button type="submit" variant={"destructive"} autoFocus>
                            Supprimer la console
                        </Button>
                    </form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DialogDeleteCategory;
