import AdminLink from "@/components/admin/AdminLink";
import {
    ArrowLeftEndOnRectangleIcon,
    ShoppingBagIcon,
    TicketIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-zinc-100">
            <aside className="w-64 bg-[#1A181B] text-white p-6 flex flex-col fixed h-full">
                <h1 className="font-(family-name:--font-bangers) text-2xl text-[#F47321] mb-10 tracking-widest">
                    Admin Panel
                </h1>

                <nav className="flex-1 space-y-2">
                    <AdminLink
                        href="/admin/products"
                        icon={<ShoppingBagIcon className="w-5 h-5" />}
                    >
                        Products
                    </AdminLink>
                    <AdminLink
                        href="/admin/users"
                        icon={<UsersIcon className="w-5 h-5" />}
                    >
                        Users
                    </AdminLink>
                    <AdminLink
                        href="/admin/coupons"
                        icon={<TicketIcon className="w-5 h-5" />}
                    >
                        Coupons
                    </AdminLink>
                </nav>
                <div className="pt-6 border-t border-zinc-800">
                    <AdminLink
                        href="/"
                        icon={
                            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                        }
                    >
                        Exit
                    </AdminLink>
                </div>
            </aside>

            <main className="flex-1 ml-64 p-10 text-zinc-900">{children}</main>
        </div>
    );
}
