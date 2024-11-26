"use client";

import { Accessory } from "@/models/accessory.model";
import React, { createContext, useContext, useState } from "react";
import { z } from "zod";

const dialogTypes = z.enum(["create", "update", "delete"]);

interface AccessoryDialogType {
  categoryId: number | undefined;
  accessory?: Accessory;
  setAccessory: React.Dispatch<React.SetStateAction<Accessory | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: z.infer<typeof dialogTypes> | undefined;
  openUpdate: (categoryId: number) => void;
  openDelete: () => void;
  openCreate: (categoryId: number) => void;
}

const AccessoryDialogContext = createContext<AccessoryDialogType | undefined>(
  undefined
);

export const useAccessoryDialog = () => {
  const context = useContext(AccessoryDialogContext);
  if (!context) {
    throw new Error(
      "useAccessoryDialog doit être utilisé à l'intérieur d'un AccessoryDialogProvider"
    );
  }
  return context;
};

export const AccessoryDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [accessory, setAccessory] = useState<Accessory | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<z.infer<typeof dialogTypes>>();

  const openUpdate = (categoryId: number) => {
    setCategoryId(categoryId);
    setType("update");
    setOpen(true);
  };

  const openCreate = (categoryId: number) => {
    setCategoryId(categoryId);
    setType("create");
    setOpen(true);
  };

  const openDelete = () => {
    setType("delete");
    setOpen(true);
  };

  return (
    <AccessoryDialogContext.Provider
      value={{
        categoryId: categoryId,
        accessory: accessory,
        setAccessory: setAccessory,
        open: open,
        setOpen: setOpen,
        type: type,
        openUpdate: openUpdate,
        openDelete: openDelete,
        openCreate: openCreate,
      }}
    >
      {children}
    </AccessoryDialogContext.Provider>
  );
};
