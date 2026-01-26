"use client";

import { useStore } from "@/src/store/store";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export function CartIcon() {
    const items = useStore((state) => state.contents);
    const setCartOpen = useStore((state) => state.setCartOpen);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div
            className="relative cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setCartOpen(true)}
        >
            <ShoppingCartIcon className=" h-6 w-6 text-white" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#F47321] text-black text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </div>
    );
}
