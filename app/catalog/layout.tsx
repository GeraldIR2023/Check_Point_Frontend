// app/catalog/layout.tsx
import MainNav from "@/components/ui/MainNav";

export default function CatalogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authData = {
        isAuth: false,
        userTag: "Guest",
        isAdmin: false,
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#2D2A2E] text-white">
            <MainNav
                isAuth={authData.isAuth}
                userTag={authData.userTag}
                isAdmin={authData.isAdmin}
            />
            <main className="pt-16 lg:flex lg:h-screen lg:overflow-hidden md:pt-16">
                <div className="flex-1 h-full overflow-y-auto custom-scrollbar p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
