import AdminSidebar from "@/components/admin/AdminSideBar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-zinc-100 md:flex-row">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <main className="flex-1 p-6 md:p-12 text-zinc-900 max-w-400 mx-auto w-full">
                    {children}
                </main>

                <footer className="p-6 text-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                    Check Point &copy; {new Date().getFullYear()} - Admin
                    Dashboard
                </footer>
            </div>
        </div>
    );
}
