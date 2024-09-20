import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";

export const robotoRegular = localFont({
    src: "./fonts/Roboto-Regular.ttf",
    variable: "--font-roboto-regular",
    weight: "100 900",
});
export const bebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-bebas-neue",
});
