import { Variant } from "./variant.model";

export interface Accessory {
    _id: string;
    name: string;
    isBase: boolean;
    description: string;
    variants: Variant[];
}
