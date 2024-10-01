"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useCategoryDialog } from "../_providers/category-dialog-provider";
import CategoryForm from "./CategoryForm";

function DialogUpdateCategory() {
    const dialogContext = useCategoryDialog();
    return (
        <Dialog
            open={dialogContext.open && dialogContext.type === "update"}
            onOpenChange={dialogContext.setOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modifier un produit</DialogTitle>
                    <DialogDescription>
                        Modifier les informations du produit ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm
                    category={dialogContext.category}
                    onSubmitSuccessful={() => dialogContext.setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}

export default DialogUpdateCategory;
