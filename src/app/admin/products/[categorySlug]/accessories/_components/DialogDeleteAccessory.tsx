"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccessoryDialog } from "@/hooks/accessory-dialog-provider";
import { deleteAccessory } from "@/repositories/accessory.repository";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "sonner";

function DialogDeleteAccessory() {
  const dialogContext = useAccessoryDialog();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dialogContext.accessory) {
      try {
        await deleteAccessory(dialogContext.accessory?._id);
      } catch (error) {
        toast.error(`${error}`);
      }
      toast.success("Accessoire supprimé avec succès");
      dialogContext.setOpen(false);
      router.refresh();
    } else {
      toast.error(
        "Erreur, aucun accessoire n'est associé a cette boite de dialogue"
      );
    }
  };
  return (
    <Dialog
      open={dialogContext.open && dialogContext.type === "delete"}
      onOpenChange={dialogContext.setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer un accessoire</DialogTitle>
          <DialogDescription>
            {"Etes-vous sûr de vouloir supprimer l'accessoire "}
            <strong>{dialogContext.accessory?.name}</strong> ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <form
            onSubmit={handleSubmit}
            className="flex flex-row justify-end gap-4"
          >
            <Button variant={"secondary"}>
              Retour a la liste des accessoire
            </Button>
            <Button type="submit" variant={"destructive"} autoFocus>
              {"Supprimer l'accessoire"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogDeleteAccessory;
