import { Category } from "@/models/category.model";
import { getCategories } from "@/repositories/category.repository";
import { DataTableCategories } from "./_components/DataTableCategories";
import DialogDeleteCategory from "./_components/DialogDeleteCategory";
import DialogUpdateCategory from "./_components/DialogUpdateCategory";
import { AdminCategoriesProvider } from "./_providers/admin-categories-provider";
import { CategoryDialogProvider } from "./_providers/category-dialog-provider";

async function PageProduct() {
    const categories: Category[] = await getCategories();

    return (
        <div>
            <h2 className="flex items-center justify-center pt-9 text-4xl">
                Consoles 🎮​
            </h2>
            <AdminCategoriesProvider initValue={{ categories: categories }}>
                <CategoryDialogProvider>
                    <DataTableCategories />
                    <DialogUpdateCategory />
                    <DialogDeleteCategory />
                </CategoryDialogProvider>
            </AdminCategoriesProvider>
        </div>
    );
}

export default PageProduct;
