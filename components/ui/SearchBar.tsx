"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SearchBar({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    //& Auto focus input when opened
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => inputRef.current?.focus(), 100);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    //& Close on ESC key
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("search")?.toString().trim();

        if (query) {
            router.push(`/catalog?search=${encodeURIComponent(query)}`);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 bg-[#1A181B]/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
            <div className="flex justify-end p-6">
                <button
                    onClick={onClose}
                    className="text-zinc-500 hover:text-white transition-colors"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-start pt-20 px-6">
                <form
                    onSubmit={handleSearch}
                    className="w-full max-w-2xl relative"
                >
                    <input
                        ref={inputRef}
                        type="text"
                        name="search"
                        placeholder="Search games, consoles, accesories"
                        className="w-full bg-transparent border-b-2 border-[#3E2723] py-4 text-2xl font-(family-name:--font-bangers) text-white uppercase outline-none focus:border-[#F47321] transition-all placeholder:text-zinc-800 md:text-4xl"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                    >
                        <MagnifyingGlassIcon className="w-8 h-8 text-[#F47321]" />
                    </button>
                </form>
                <p className="mt-4 text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                    Press Enter to search
                </p>
            </div>
        </div>
    );
}
