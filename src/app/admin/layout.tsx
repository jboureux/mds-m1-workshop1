import { Toaster } from "@/components/ui/sonner";
import { AdminCategoriesProvider } from "@/hooks/admin-categories-provider";
import { Category } from "@/models/category.model";
import { getCategories } from "@/repositories/category.repository";
import Link from "next/link";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const categories: Category[] = await getCategories();
  return (
    <AdminCategoriesProvider initValue={{ categories: categories }}>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white font-bold">Admin Panel</div>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-white hover:text-gray-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="text-white hover:text-gray-300"
                >
                  Produits
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex-1">{children}</div>
        <Toaster richColors theme="light" position="top-center" closeButton />
      </div>
    </AdminCategoriesProvider>
  );
};

export default AdminLayout;
