export interface Variant {
    id: number;
    hexcode?: string;
    name: string;
    default?: boolean;
    images?: [
        {
            frontViewUrl?: string;
            sideViewUrl?: string;
            backViewUrl?: string;
        }
    ];
    price?: number;
    isTransparent?: boolean;
}
