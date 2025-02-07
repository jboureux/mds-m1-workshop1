"use client";

import { Variant } from "@/models/variant.model";
import React, { createContext, useContext, useState } from "react";
import { z } from "zod";

const dialogTypes = z.enum(["create", "update", "delete"]);

interface VariantDialogType {
  accessoryId: string | undefined;
  variant?: Variant;
  setVariant: React.Dispatch<React.SetStateAction<Variant | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: z.infer<typeof dialogTypes> | undefined;
  openUpdate: (accessoryId: string) => void;
  openDelete: () => void;
  openCreate: (accessoryId: string) => void;
}

const VariantDialogContext = createContext<VariantDialogType | undefined>(
  undefined
);

export const useVariantDialog = () => {
  const context = useContext(VariantDialogContext);
  if (!context) {
    throw new Error(
      "useVariantDialog doit être utilisé à l'intérieur d'un VariantDialogProvider"
    );
  }
  return context;
};

export const VariantDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [variant, setVariant] = useState<Variant | undefined>();
  const [accessoryId, setAccessoryId] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<z.infer<typeof dialogTypes>>();

  const openUpdate = (accessoryId: string) => {
    setAccessoryId(accessoryId);
    setType("update");
    setOpen(true);
  };

  const openCreate = (accessoryId: string) => {
    setAccessoryId(accessoryId);
    setType("create");
    setOpen(true);
  };

  const openDelete = () => {
    setType("delete");
    setOpen(true);
  };

  return (
    <VariantDialogContext.Provider
      value={{
        accessoryId: accessoryId,
        variant: variant,
        setVariant: setVariant,
        open: open,
        setOpen: setOpen,
        type: type,
        openUpdate: openUpdate,
        openDelete: openDelete,
        openCreate: openCreate,
      }}
    >
      {children}
    </VariantDialogContext.Provider>
  );
};
