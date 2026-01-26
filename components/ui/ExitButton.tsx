"use client";

import { useRouter } from "next/navigation";

export default function ExitButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="px-8 bg-[#1A181B] text-white font-bold uppercase py-5 rounded-xl border-2 border-[#3E2723] hover:border-[#F47321] transition-colors"
        >
            Exit
        </button>
    );
}
