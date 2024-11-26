"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/models/category.model";
import { Plus } from "lucide-react";
import { useAccessoryDialog } from "../../../../../../hooks/accessory-dialog-provider";

interface CreateAccessoryButtonProps {
  icon: boolean;
  category: Category;
}

const CreateAccessoryButton = (props: CreateAccessoryButtonProps) => {
  const dialogAccessory = useAccessoryDialog();
  return (
    <Button
      variant={"creation"}
      className="w-fit"
      onClick={() => dialogAccessory.openCreate(props.category.id)}
    >
      {props.icon && <Plus className="w-5 h-5 mr-4" />}
      <span>Créer un accessoire</span>
    </Button>
  );
};

export default CreateAccessoryButton;
