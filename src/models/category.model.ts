import { Accessory } from "./accessory.model";

export interface Category {
    id: number;
    slug: string;
    name: string;
    price: number;
    deviceDiscount: number;
    accessories: Accessory[];
}
