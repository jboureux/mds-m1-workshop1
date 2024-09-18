import Link from "next/link";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold">Admin Panel</div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                href="/"
                                className="text-white hover:text-gray-300"
                            >
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className="text-white hover:text-gray-300"
                            >
                                Tableau de bord
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
            {children}
        </div>
    );
};

export default AdminLayout;
