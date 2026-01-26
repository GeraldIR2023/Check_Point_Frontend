import MainNav from "@/components/ui/MainNav";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import SlideCart from "@/components/cart/SlideCart";

interface JwtPayload {
    userTag: string;
    isAdmin: boolean;
    sub: number;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    let userData = null;

    if (token) {
        try {
            //*Decode token
            userData = jwtDecode<JwtPayload>(token);
        } catch (error) {
            console.error("Error decoding token:", error);
        }
    }

    console.log(userData);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-[#2D2A2E] text-white">
                <MainNav
                    isAuth={!!token}
                    userTag={userData?.userTag || ""}
                    isAdmin={userData?.isAdmin || false}
                />
                <SlideCart />
                <main className="pt-16 lg:flex lg:h-screen lg:overflow-hidden md:pt-16">
                    <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 md:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
