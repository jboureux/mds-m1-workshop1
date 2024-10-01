"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

function DialogCreateCategory() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md">
                    Ajouter un produit
                </Button>
            </DialogTrigger>
            <DialogContent className="w-fit">
                <DialogHeader>
                    <DialogTitle>Ajouter un produit</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations du produit ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm onSubmitSuccessful={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export default DialogCreateCategory;
