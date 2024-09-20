"use client";

import React, { createContext, useContext, useState } from "react";

export interface ConfiguratorState {
    id: number;
    slug: string;
    basePrice: number;
    deviceReduction: number;
    currency: string;
    accessories: Accessories[];
}

export interface SelectedOption {
    accessoryId: string;
    isBase?: boolean;
    variant: Variant;
}

interface Accessories {
    id: string;
    name: string;
    isBase: boolean;
    description?: string;
    variants: Variant[];
}

export interface Variant {
    id: number;
    hexcode?: string;
    name: string;
    default?: boolean;
    images?: {
        FRONT?: string;
        BACK?: string;
        SIDE?: string;
    };
    price?: number;
    isTransparent?: boolean;
}

interface ConfiguratorContextType {
    category: ConfiguratorState;
    setCategory: React.Dispatch<React.SetStateAction<ConfiguratorState>>;
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
        category: ConfiguratorState;
        selectedOptions: SelectedOption[];
    };
}> = ({ children, initValue }) => {
    const [category, setCategory] = useState<ConfiguratorState>(
        initValue.category
    );
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
