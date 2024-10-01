"use client";

import { Category } from "@/models/category.model";
import React, { createContext, useContext, useState } from "react";
import { z } from "zod";

const dialogTypes = z.enum(["update", "delete"]);

interface CategoryDialogType {
    category?: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: z.infer<typeof dialogTypes> | undefined;
    openUpdate: () => void;
    openDelete: () => void;
}

const CategoryDialogContext = createContext<CategoryDialogType | undefined>(
    undefined
);

export const useCategoryDialog = () => {
    const context = useContext(CategoryDialogContext);
    if (!context) {
        throw new Error(
            "useCategoryDialog doit être utilisé à l'intérieur d'un CategoryDialogProvider"
        );
    }
    return context;
};

export const CategoryDialogProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [category, setCategory] = useState<Category | undefined>();
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<z.infer<typeof dialogTypes>>();

    const openUpdate = () => {
        setType("update");
        setOpen(true);
    };

    const openDelete = () => {
        setType("delete");
        setOpen(true);
    };

    return (
        <CategoryDialogContext.Provider
            value={{
                category: category,
                setCategory: setCategory,
                open: open,
                setOpen: setOpen,
                type: type,
                openUpdate: openUpdate,
                openDelete: openDelete,
            }}
        >
            {children}
        </CategoryDialogContext.Provider>
    );
};
