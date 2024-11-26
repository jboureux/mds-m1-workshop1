import AdminTitle from "@/components/typography/AdminTitle";
import { getAccesoriesForCategoryId } from "@/repositories/accessory.repository";
import { getCategoryBySlug } from "@/repositories/category.repository";
import AccesoryList from "./_components/AccesoryList";
import CreateAccessoryButton from "./_components/CreateAccessoryButton";
import ReturnToConsolesListButton from "./_components/ReturnToConsolesListButton";

interface AdminCategoryAccessoriesProps {
  params: {
    categorySlug: string;
  };
}

const AdminCategoryAccessories = async (
  props: AdminCategoryAccessoriesProps
) => {
  const category = await getCategoryBySlug(props.params.categorySlug);

  if (category === undefined) {
    throw new Error("Erreur, category non trouvée");
  }

  try {
    category.accessories = await getAccesoriesForCategoryId(category.id);
  } catch (e) {
    return (
      <div className="w-full pt-12 flex flex-col justify-center gap-6 items-center">
        <span>Aucun accessoire trouvé pour la console {category.name}</span>
        <div className="flex flex-col md:flex-row gap-2">
          <ReturnToConsolesListButton />
          <CreateAccessoryButton icon category={category} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-0 mt-9">
        <div className="h-full w-full flex justify-center items-center">
          <ReturnToConsolesListButton icon />
        </div>
        <AdminTitle text={`Accessoires de ${category.name}`} />

        <div className="h-full w-full flex justify-center items-center">
          <CreateAccessoryButton icon category={category} />
        </div>
      </div>
      <AccesoryList category={category} />
    </div>
  );
};

export default AdminCategoryAccessories;
