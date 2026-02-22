"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLinkProps {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export default function AdminLink({ href, icon, children }: AdminLinkProps) {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive
                    ? "bg-[#F47321] text-black"
                    : "text-zinc-400 hover:bg-[#2D2A2E] hover:text-white"
            }`}
        >
            <span className={isActive ? "text-black" : "text-[#F47321]"}>
                {icon}
            </span>
            {children}
        </Link>
    );
}
