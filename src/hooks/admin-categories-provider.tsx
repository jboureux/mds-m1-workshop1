"use client";

import { Category } from "@/models/category.model";
import React, { createContext, useContext, useState } from "react";

interface AdminCategoriesType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  currentCategory: Category | undefined;
  setCurrentCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
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
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(
    undefined
  );

  return (
    <AdminCategoriesContext.Provider
      value={{
        categories: categories,
        setCategories: setCategories,
        currentCategory: currentCategory,
        setCurrentCategory: setCurrentCategory,
      }}
    >
      {children}
    </AdminCategoriesContext.Provider>
  );
};
