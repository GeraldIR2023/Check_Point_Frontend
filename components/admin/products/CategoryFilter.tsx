"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CategoryFilter({
    defaultValue,
}: {
    defaultValue: string;
}) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleFilter = (id: string) => {
        const params = new URLSearchParams(searchParams);

        if (id) {
            params.set("category_id", id);
        } else {
            params.delete("category_id");
        }

        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <select
            defaultValue={defaultValue}
            onChange={(e) => handleFilter(e.target.value)}
            className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-[#F47321] transition-all text-sm font-bold uppercase"
        >
            <option value="">All</option>
            <option value="1">Games</option>
            <option value="2">Consoles</option>
            <option value="3">Accessories</option>
        </select>
    );
}
