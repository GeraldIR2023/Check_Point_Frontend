"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchProduct({
    defaultValue,
}: {
    defaultValue: string;
}) {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }

        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <input
            type="text"
            placeholder="Search game, console or accesory..."
            className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-[#F47321] transition-all"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={defaultValue}
        />
    );
}
