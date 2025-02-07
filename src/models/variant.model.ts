export interface Variant {
  id: number;
  hexcode?: string;
  name: string;
  isDefault?: boolean;
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
