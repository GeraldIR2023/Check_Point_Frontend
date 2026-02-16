"use client";

import { Product } from "@/src/schemas";
import { useStore } from "@/src/store/store";
import {
    formatCurrency,
    formatDate,
    getImagePath,
    isAvailable,
    isSoldOut,
} from "@/src/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
    const addToCart = useStore((state) => state.addToCart);
    const setCartOpen = useStore((state) => state.setCartOpen);

    const available = isAvailable(product.inventory, product.isPreOrder);
    const soldOut = isSoldOut(product.inventory, product.isPreOrder);
    const preOrder = product.isPreOrder && product.inventory <= 0;
    const dicount =
        product.discountPrice > 0 && product.discountPrice < product.price;

    //& Select a different text for the view button

    const handleAddClick = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product, 1);
        setCartOpen(true);
    };

    return (
        <div className="flex flex-col group bg-[#2D2A2E] border border-[#3E2723] rounded-xl overflow-hidden transition-all duration-300 h-full shadow-md hover:border-[#F47321]">
            <div
                className={`relative aspect-square w-full overflow-hidden bg-[#1A181B] ${soldOut ? "grayscale opacity-50" : ""}`}
            >
                <Image
                    src={getImagePath(product.image)}
                    alt={`${product.name} image`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/*Discount Percentage Badge */}
                {dicount && !soldOut && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-green-500 text-black text-[9px] px-1.5 py-0.5 rounded-sm font-black uppercase tracking-tighter shadow-md">
                            -$
                            {Math.round(
                                ((product.price - product.discountPrice) /
                                    product.price) *
                                    100,
                            )}
                        </span>
                    </div>
                )}

                {/*Pre-Order Badge*/}
                <div className="absolute top-2 right-2">
                    {product.isPreOrder && (
                        <span className="bg-blue-600/90 text-white text-[8px] px-2 py-1 rounded-sm font-black uppercase tracking-tighter shadow-lg">
                            Pre-Order
                        </span>
                    )}
                </div>

                {/*Sold Out Badge*/}
                {soldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <span className="bg-white text-black border border-black px-3 py-1 text-sm uppercase font-black rotate-[-5deg] shadow-xl">
                            Sold Out
                        </span>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="p-3 flex flex-col grow">
                <h3 className="text-sm font-bold text-[#F8F9FA] mb-1 h-10 line-clamp-2 leading-tight">
                    {product.name}
                </h3>

                {/*Product with discount*/}
                <div className="mb-3 flex flex-col justify-end min-h-10">
                    {dicount ? (
                        <>
                            <span className="text-zinc-500 text-[10px] line-through decoration-[#F47321]/40 leading-none">
                                {formatCurrency(product.price)}
                            </span>
                            <span className="text-lg font-black text-[#F47321] leading-tight">
                                {formatCurrency(product.discountPrice)}
                            </span>
                        </>
                    ) : (
                        <span className="text-lg font-black text-white leading-tight">
                            {formatCurrency(product.price)}
                        </span>
                    )}
                </div>

                {/*Product Available */}
                <div className="mt-auto">
                    {available ? (
                        <div className="flex flex-col gap-2 mt-4">
                            <Link
                                href={`/products/${product.id}`}
                                className="w-full bg-[#3E2723] text-[#F47321] py-2 rounded-lg font-bold uppercase border border-[#F47321]/30 text-center text-[10px] hover:bg-[#3E2723]/50 transation-colors"
                            >
                                view Product
                            </Link>
                            <button
                                onClick={handleAddClick}
                                className="w-full bg-[#F47321] text-black py-2 rounded-lg font-bold uppercase text-[10px] hover:bg-[#ff8534] transition-colors shadow-[0_4px_0_0_#b35418] active:translate-y-1 active:shadow-none"
                            >
                                {product.isPreOrder
                                    ? "Pre-order Now"
                                    : "Add to Cart"}
                            </button>

                            {preOrder && (
                                <p className="text-[8px] text-blue-400 text-center uppercase font-bold leading-none">
                                    Pre-order product. Release Date:{" "}
                                    {formatDate(product.addedAt)}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-500 py-2 rounded-lg font-bold uppercase text-[9px] text-center tracking-tighter">
                            Out of Stock
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
