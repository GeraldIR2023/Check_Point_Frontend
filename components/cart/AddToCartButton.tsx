"use client";

import { useStore } from "@/src/store/store";
import { Product } from "@/src/schemas";

interface AddToCartProps {
    product: Product;
    quantity: number;
}

export function AddToCart({ product, quantity }: AddToCartProps) {
    const addToCart = useStore((state) => state.addToCart);
    const setCartOpen = useStore((state) => state.setCartOpen);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart(product, quantity);
        setCartOpen(true);
    };

    const isOutOfStock = !product.isPreOrder && product.inventory <= 0;

    return (
        <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex-1 bg-[#F47321] text-black text-lg font-black uppercase py-5 rounded-xl shadow-[0_6px_0_0_#b35418] transition-all duration-150 hover:bg-[#FF8534] hover:shadow-[0_4px_0_0_#b35418] hover:translate-y-0.5 active:translate-y-1.5 active:shadow-none disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
        >
            {product.isPreOrder ? "Confirm Pre-Order" : "Add to Cart"}
        </button>
    );
}
