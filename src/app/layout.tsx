import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const robotoRegular = localFont({
    src: "./fonts/Roboto-Regular.ttf",
    variable: "--font-roboto-regular",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Retrometroid",
    description: "Vente de consoles rétro personnalisées",
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
