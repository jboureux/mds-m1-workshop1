import AdminTitle from "@/components/typography/AdminTitle";
import { CategoryDialogProvider } from "../../../hooks/category-dialog-provider";
import { DataTableCategories } from "./_components/DataTableCategories";
import DialogDeleteCategory from "./_components/DialogDeleteCategory";
import DialogUpdateCategory from "./_components/DialogUpdateCategory";

async function PageProduct() {
  return (
    <div>
      <div className="pt-9">
        <AdminTitle text="Consoles 🎮​" />
      </div>

      <CategoryDialogProvider>
        <DataTableCategories />
        <DialogUpdateCategory />
        <DialogDeleteCategory />
      </CategoryDialogProvider>
    </div>
  );
}

export default PageProduct;
