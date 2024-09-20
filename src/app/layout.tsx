import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { robotoRegular } from "./fonts";
import "./globals.css";

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
                    <TooltipProvider>{children}</TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
