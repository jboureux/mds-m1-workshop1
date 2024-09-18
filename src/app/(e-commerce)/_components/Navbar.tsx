import { bebasNeue } from "@/app/layout";
import { navbar } from "@/config/navbar";

import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
    return (
        <nav className="bg-white p-4 sticky top-0 border-b border-gray-200">
            <div className="container mx-auto grid grid-cols-[1fr_auto_1fr]">
                <div>
                    <Link href={"/"} className="w-fit block">
                        <Image
                            src="/img/logo-RM-2024-1.webp"
                            alt="Retrometroid"
                            width={150}
                            height={150}
                        />
                    </Link>
                </div>

                <ul className="flex space-x-4">
                    {navbar.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${bebasNeue.className} font-bebas-neue tracking-wide text-xl`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
