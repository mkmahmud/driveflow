import type { Metadata } from "next";

import "../globals.css";

import Navbar from "@/components/shared/navbar/navbar";
import Footer from "@/components/shared/footer/footer";



export const metadata: Metadata = {
    title: "DriveFlow | Premium Car Rental",
    description: "Rent your dream car today",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div className="container mx-auto">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>

    );
}