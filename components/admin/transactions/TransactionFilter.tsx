"use client";

import { ArrowPathIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function TransactionFilter({
    initialDate,
}: {
    initialDate?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (date: string) => {
        if (date) {
            router.push(`${pathname}?date=${date}`);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-zinc-200 p-2 rounded-2xl shadow-sm">
                <CalendarIcon className="w-4 h-4 text-zinc-400 ml-2" />
                <input
                    type="date"
                    defaultValue={initialDate}
                    className="text-xs font-black uppercase outline-none bg-transparent text-zinc-600 cursor-pointer"
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>

            {initialDate && (
                <Link
                    href={pathname}
                    className="text-[10px] font-black uppercase text-[#F47321] hover:text-black transition-colors px-4 flex items-center gap-1"
                >
                    <ArrowPathIcon className="w-3 h-3" />
                    Clear Filter
                </Link>
            )}
        </div>
    );
}
