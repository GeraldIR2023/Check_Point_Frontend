"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
    page: number;
    totalPages: number;
};

export default function Pagination({ page, totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const buildUrl = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        return `${pathname}?${params.toString()}`;
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center gap-2 py-10">
            {page > 1 && (
                <Link
                    href={buildUrl(page - 1)}
                    className="flex items-center justify-center w-10 h-10 text-white bg-[#1A181B] border border-[#3E2723] rounded-lg hover:border-[#F47321] hover:text-[#F47321] transition-all duration-300"
                >
                    &laquo;
                </Link>
            )}

            {pages.map((currentPage) => (
                <Link
                    key={currentPage}
                    href={buildUrl(currentPage)}
                    className={`flex items-center justify-center w-10 h-10 text-sm font-bold rounded-lg border transition-all duration-300 ${
                        page === currentPage
                            ? "bg-[#F47321] text-black border-[#F47321] shadow-[0_0_10px_rgba(244,115,33,0.5)] scale-105 z-10"
                            : "bg-[#1A181B] text-zinc-400 border-[#3E2723] hover:border-zinc-500 hover:text-white"
                    }`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={buildUrl(page + 1)}
                    className="flex items-center justify-center w-10 h-10 text-white bg-[#1A181B] border border-[#3E2723] rounded-lg hover:border-[#F47321] hover:text-[#F47321] transition-all duration-300"
                >
                    &raquo;
                </Link>
            )}
        </nav>
    );
}
