"use client";

import {
    ArrowLeftEndOnRectangleIcon,
    Bars3Icon,
    ShoppingBagIcon,
    TicketIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import AdminLink from "./AdminLink";

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <header className="bg-[#1A181B] text-white px-8 p-4 flex items-center justify-between sticky top-0 z-40 border-b border-zinc-800 md:hidden">
                <h1 className="font-(family-name:--font-bangers) text-xl text-[#F47321] tracking-widest">
                    Admin Panel
                </h1>
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors"
                >
                    <Bars3Icon className="w-6 h-6 text-[#F47321]" />
                </button>
            </header>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1A181B] text-white p-6 flex flex-col transition-transform duration-300 ease-in-out shadow-2xl
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 md:sticky md:top-0 md:h-screen md:shadow-none
                `}
            >
                <div className="flex items-center justify-between mb-10">
                    <h1 className="font-(family-name:--font-bangers) text-2xl text-[#F47321] tracking-widest">
                        Check Point <span className="text-white">Admin</span>
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="text-zinc-400 md:hidden hover:text-white"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav
                    className="flex-1 space-y-2"
                    onClick={() => setIsOpen(false)}
                >
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
        </>
    );
}
