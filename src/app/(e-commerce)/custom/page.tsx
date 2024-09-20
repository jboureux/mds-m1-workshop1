import { buttonVariants } from "@/components/ui/button";
import { Category } from "@/models/category.model";
import Link from "next/link";

const CustomPage = async () => {
    const data: Category[] = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/all`
    ).then((res) => res.json());

    return (
        <div>
            <h1>Custom</h1>
            {data.map((category) => (
                <Link
                    key={category.id}
                    className={buttonVariants({ variant: "outline" })}
                    href={`/custom/${category.slug}`}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
};

export default CustomPage;
