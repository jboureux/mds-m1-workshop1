"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccessoryDialog } from "@/hooks/accessory-dialog-provider";
import AccessoryForm from "./AccessoryForm";

const DialogCreateAccessory = () => {
  const dialogAccessory = useAccessoryDialog();
  return (
    <Dialog
      open={dialogAccessory.open && dialogAccessory.type === "create"}
      onOpenChange={dialogAccessory.setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un nouvel accessoire</DialogTitle>
          <DialogDescription>
            {`Création d'un nouvel accessoire pour cette console`}
          </DialogDescription>
        </DialogHeader>
        <AccessoryForm
          categoryId={dialogAccessory.categoryId}
          onSubmitSuccessful={() => dialogAccessory.setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateAccessory;
