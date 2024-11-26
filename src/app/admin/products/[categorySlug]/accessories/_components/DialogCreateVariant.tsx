"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useVariantDialog } from "@/hooks/variant-dialog-provider";
import VariantForm from "./VariantForm";

const DialogCreateVariant = () => {
  const dialogVariant = useVariantDialog();
  return (
    <Dialog
      open={dialogVariant.open && dialogVariant.type === "create"}
      onOpenChange={dialogVariant.setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une nouvelle variante</DialogTitle>
          <DialogDescription>
            {`Création d'une nouvelle variante pour cet accessoire`}
          </DialogDescription>
        </DialogHeader>
        <VariantForm
          accessoryId={dialogVariant.accessoryId}
          onSubmitSuccessful={() => dialogVariant.setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateVariant;
