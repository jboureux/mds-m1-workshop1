"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccessoryDialog } from "@/hooks/accessory-dialog-provider";
import { Accessory } from "@/models/accessory.model";
import { Settings } from "lucide-react";

interface AccessorySettingsProps {
  accessory: Accessory;
  categoryId: number;
}

const AccessorySettings = (props: AccessorySettingsProps) => {
  const { openUpdate, openDelete, setAccessory } = useAccessoryDialog();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings className="w-5 h-5 stroke-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="focus:bg-green-600 focus:text-white"
          onSelect={() => {
            setAccessory(props.accessory);
            openUpdate(props.categoryId);
          }}
        >
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-destructive focus:text-destructive-foreground"
          onSelect={() => {
            setAccessory(props.accessory);
            openDelete();
          }}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessorySettings;
