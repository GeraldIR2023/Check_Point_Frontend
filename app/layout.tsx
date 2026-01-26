import type { Metadata } from "next";
import { Luckiest_Guy, Bangers } from "next/font/google";
import "./globals.css";

const lukiestGuy = Luckiest_Guy({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-luckiest",
});
const bangers = Bangers({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-bangers",
});

export const metadata: Metadata = {
    title: "Check Point Video Games",
    description: "Check Point Video Games",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${lukiestGuy.variable} ${bangers.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
