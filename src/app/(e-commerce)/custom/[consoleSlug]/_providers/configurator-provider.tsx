"use client";

import { Category } from "@/models/category.model";
import { Variant } from "@/models/variant.model";
import React, { createContext, useContext, useState } from "react";

export interface SelectedOption {
    accessoryId: string;
    isBase?: boolean;
    variant: Variant;
}

interface ConfiguratorContextType {
    category: Category;
    setCategory: React.Dispatch<React.SetStateAction<Category>>;
    selectedOptions: SelectedOption[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOption[]>>;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(
    undefined
);

export const useConfigurator = () => {
    const context = useContext(ConfiguratorContext);
    if (!context) {
        throw new Error(
            "useConfigurator doit être utilisé à l'intérieur d'un ConfiguratorProvider"
        );
    }
    return context;
};

export const ConfiguratorProvider: React.FC<{
    children: React.ReactNode;
    initValue: {
        category: Category;
        selectedOptions: SelectedOption[];
    };
}> = ({ children, initValue }) => {
    const [category, setCategory] = useState<Category>(initValue.category);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>(
        initValue.selectedOptions
    );

    return (
        <ConfiguratorContext.Provider
            value={{
                category: category,
                setCategory: setCategory,
                selectedOptions: selectedOptions,
                setSelectedOptions: setSelectedOptions,
            }}
        >
            {children}
        </ConfiguratorContext.Provider>
    );
};
