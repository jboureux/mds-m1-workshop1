import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";

const robotoRegular = localFont({
  src: "./fonts/Roboto-Regular.ttf",
  variable: "--font-roboto-regular",
  weight: "100 900",
});
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const fonts = Object.freeze({ bebasNeue, robotoRegular });

export default fonts;
