import { fetchFromAPI } from "@/lib/api-client";
import { Accessory } from "@/models/accessory.model";

export async function getAccesoriesForCategoryId(
  categoryId: number
): Promise<Accessory[]> {
  const response = await fetchFromAPI<Accessory[]>(
    `/accessory/category/${categoryId}`,
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

export async function addAccessory(
  categoryId: number,
  accessory: Partial<Accessory>
): Promise<Accessory | undefined> {
  const response = await fetchFromAPI<Accessory>("/accessory/add", "POST", {
    ...accessory,
    category_id: categoryId,
  });

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export async function updateAccessory(
  id: string,
  accessory: Partial<Accessory>
): Promise<Accessory | undefined> {
  const response = await fetchFromAPI<Accessory>(
    `/accessory/${id}`,
    "PATCH",
    accessory
  );

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export async function deleteAccessory(
  id: string
): Promise<Accessory | undefined> {
  const response = await fetchFromAPI<Accessory>(`/accessory/${id}`, "DELETE");
  console.log(response);
  if (response.error) {
    throw response.error;
  }

  return response.data;
}
