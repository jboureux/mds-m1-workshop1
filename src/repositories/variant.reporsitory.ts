import { fetchFromAPI } from "@/lib/api-client";
import { Variant } from "@/models/variant.model";

export async function getVariantsforAccessoryId(
  accessoryId: string
): Promise<Variant[]> {
  const response = await fetchFromAPI<Variant[]>(
    `/variant/accessory/${accessoryId}`,
    "GET"
  );

  if (response.error) {
    throw response.error;
  }

  if (response.data === undefined) {
    response.data = [];
  }

  return response.data;
}

export async function addVariant(
  accessoryId: string,
  variant: Partial<Variant>
): Promise<Variant | undefined> {
  const response = await fetchFromAPI<Variant>("/variant/add", "POST", {
    ...variant,
    accessory_id: accessoryId,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export async function updateVariant(
  id: number,
  variant: Partial<Variant>
): Promise<Variant | undefined> {
  const response = await fetchFromAPI<Variant>(
    `/variant/${id}`,
    "PATCH",
    variant
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

// export async function deleteAccessory(
//   id: string
// ): Promise<Accessory | undefined> {
//   const response = await fetchFromAPI<Accessory>(`/accessory/${id}`, "DELETE");
//   console.log(response);
//   if (response.error) {
//     throw response.error;
//   }

//   return response.data;
// }
