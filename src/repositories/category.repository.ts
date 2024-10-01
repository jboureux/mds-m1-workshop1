import { fetchFromAPI } from "@/lib/api-client";
import { Category } from "@/models/category.model";

export async function getCategories(): Promise<Category[]> {
    const response = await fetchFromAPI<Category[]>("/category/all", "GET");

    if (response.error) {
        throw response.error;
    }

    if (response.data === undefined) {
        response.data = [];
    }

    return response.data;
}

export async function addCategory(
    category: Partial<Category>
): Promise<Category | undefined> {
    const response = await fetchFromAPI<Category>(
        "/category/add",
        "POST",
        category
    );

    if (response.error) {
        throw response.error;
    }

    return response.data;
}

export async function updateCategory(
    id: number,
    category: Partial<Category>
): Promise<Category | undefined> {
    const response = await fetchFromAPI<Category>(
        `/category/${id}`,
        "PATCH",
        category
    );

    if (response.error) {
        throw response.error;
    }

    return response.data;
}

export async function deleteCategory(
    id: number
): Promise<Category | undefined> {
    const response = await fetchFromAPI<Category>(`/category/${id}`, "DELETE");
    console.log(response);
    if (response.error) {
        throw response.error;
    }

    return response.data;
}
