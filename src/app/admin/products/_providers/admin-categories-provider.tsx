"use client";

import { Category } from "@/models/category.model";
import React, { createContext, useContext, useState } from "react";

interface AdminCategoriesType {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const AdminCategoriesContext = createContext<AdminCategoriesType | undefined>(
    undefined
);

export const useAdminCategories = () => {
    const context = useContext(AdminCategoriesContext);
    if (!context) {
        throw new Error(
            "useAdminCategories doit être utilisé à l'intérieur d'un AdminCategoriesProvider"
        );
    }
    return context;
};

export const AdminCategoriesProvider: React.FC<{
    children: React.ReactNode;
    initValue: {
        categories: Category[];
    };
}> = ({ children, initValue }) => {
    const [categories, setCategories] = useState<Category[]>(
        initValue.categories
    );

    return (
        <AdminCategoriesContext.Provider
            value={{
                categories: categories,
                setCategories: setCategories,
            }}
        >
            {children}
        </AdminCategoriesContext.Provider>
    );
};
