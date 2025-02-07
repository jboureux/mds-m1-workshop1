import { AccessoryDialogProvider } from "@/hooks/accessory-dialog-provider";
import { VariantDialogProvider } from "@/hooks/variant-dialog-provider";
import DialogCreateAccessory from "./_components/DialogCreateAccessory";
import DialogCreateVariant from "./_components/DialogCreateVariant";
import DialogDeleteAccessory from "./_components/DialogDeleteAccessory";
import DialogUpdateAccessory from "./_components/DialogUpdateAccessory";

const AccessoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AccessoryDialogProvider>
        <VariantDialogProvider>
          {children}
          <DialogCreateAccessory />
          <DialogUpdateAccessory />
          <DialogDeleteAccessory />
          <DialogCreateVariant />
        </VariantDialogProvider>
      </AccessoryDialogProvider>
    </>
  );
};

export default AccessoryLayout;
