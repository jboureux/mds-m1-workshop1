import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
    title: "Retrometroid",
    description: "Vente de consol   es rétro personnalisées",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${robotoRegular.variable} antialiased`}>
                <ThemeProvider defaultTheme="light" attribute="class">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
