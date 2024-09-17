import Link from "next/link";

const EcommerceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold">Retrometroid</div>
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
                                href="/custom"
                                className="text-white hover:text-gray-300"
                            >
                                Personnalisation
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/limited-editions"
                                className="text-white hover:text-gray-300"
                            >
                                Éditions Limitées
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className="text-white hover:text-gray-300"
                            >
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
};

export default EcommerceLayout;
