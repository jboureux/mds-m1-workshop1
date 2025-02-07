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

const DialogUpdateAccessory = () => {
  const dialogAccessory = useAccessoryDialog();
  return (
    <Dialog
      open={dialogAccessory.open && dialogAccessory.type === "update"}
      onOpenChange={dialogAccessory.setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier un accessoire</DialogTitle>
          <DialogDescription>
            {`Modification d'un accessoire pour cette console`}
          </DialogDescription>
        </DialogHeader>
        <AccessoryForm
          categoryId={dialogAccessory.categoryId}
          accessory={dialogAccessory.accessory}
          onSubmitSuccessful={() => dialogAccessory.setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateAccessory;
