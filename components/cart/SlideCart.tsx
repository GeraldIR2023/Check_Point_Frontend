"use client";

import { useStore } from "@/src/store/store";
import { formatCurrency, getImagePath } from "@/src/utils/utils";
import Image from "next/image";
import CouponForm from "./CouponForm";

export default function SlideCart() {
    const isCartOpen = useStore((state) => state.isCartOpen);
    const setCartOpen = useStore((state) => state.setCartOpen);

    const {
        contents,
        total,
        removeFromCart,
        updateQuantity,
        discount,
        coupon,
    } = useStore();

    const totalWithoutDiscount = contents.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );

    const productDiscount = contents.reduce((acc, item) => {
        const currentPrice = item.discountPrice || item.price;
        return acc + (item.price - currentPrice) * item.quantity;
    }, 0);

    const totalDiscounts = productDiscount + discount;

    const existsDiscount = totalDiscounts > 0;

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setCartOpen(false)}
            />

            <div className="relative w-full max-w-md bg-[#1A181B] border-l border-[#3E2723] h-full shadow-2xl flex flex-col">
                <header className="p-6 border-b border-[#3E2723] flex justify-between items-center">
                    <h2 className="text-2xl font-(family-name:--font-bangers) text-white uppercase">
                        Your Cart
                    </h2>
                    <button
                        onClick={() => setCartOpen(false)}
                        className="text-zinc-500 text-2xl hover:text-white"
                    >
                        X
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {contents.length === 0 ? (
                        <p className="text-center text-zinc-500 py-10 uppercase font-bold text-xs">
                            Your cart is empty.
                        </p>
                    ) : (
                        contents.map((item) => (
                            <div
                                key={item.productId}
                                className="flex gap-4 bg-[#2D2A2E]/50 p-3 rounded-xl border border-[#3E2723]"
                            >
                                <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden">
                                    <Image
                                        src={getImagePath(item.image)}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white text-sm font-bold line-clamp-1">
                                        {item.name}
                                    </h4>
                                    <p className="text-[#F47321] font-black text-sm">
                                        {formatCurrency(
                                            item.discountPrice || item.price,
                                        )}
                                    </p>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center border border-[#3E2723] rounded-md">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        Math.max(
                                                            1,
                                                            item.quantity - 1,
                                                        ),
                                                    )
                                                }
                                                className="px-2 text-white"
                                            >
                                                -
                                            </button>
                                            <span className="px-2 text-xs text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.productId,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="px-2 text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeFromCart(item.productId)
                                            }
                                            className="text-[10px] text-red-500 uppercase font-bold"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <footer className="p-6 border-t border-[#3E2723] bg-[#1A181B] space-y-4">
                    <CouponForm />
                    <div className="space-y-2 pt-2 border-t border-[#3E2723]/30">
                        {!existsDiscount ? (
                            <div className="flex justify-between items-center text-[11px] uppercase font-bold text-zinc-500">
                                <span className="text-zinc-500 uppercase text-xs font-black">
                                    Total
                                </span>
                                <span className="text-3xl font-(family-name:--font-bangers) text-white">
                                    {formatCurrency(total)}
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center text-[11px] uppercase font-bold text-zinc-500">
                                    <span>Subtotal</span>
                                    <span>
                                        -{formatCurrency(totalWithoutDiscount)}
                                    </span>
                                </div>

                                {productDiscount > 0 && (
                                    <div className="flex justify-between items-center text-[11px] uppercase font-bold text-orange-400/80">
                                        <span>Product Discount</span>
                                        <span>
                                            -{formatCurrency(productDiscount)}
                                        </span>
                                    </div>
                                )}

                                {discount > 0 && (
                                    <div className="flex justify-between items-center text-[11px] uppercase font-black text-green-500">
                                        <span>
                                            Coupon: {coupon.name} (
                                            {coupon.percentage}%)
                                        </span>
                                        <span>-{formatCurrency(discount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-2 border-t border-[#3E2723]/30">
                                    <span className="text-zinc-400 uppercase text-xs font-black">
                                        Total
                                    </span>
                                    <span className="text-3xl font-(family-name:--font-bangers) text-[#F47321]">
                                        {formatCurrency(total)}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                    <button className="w-full bg-[#F47321] text-black font-black uppercase py-4 rounded-xl shadow-[0_4px_0_0_#b35418] active:translate-y-1 active:shadow-none hover:bg-[#FF8534] transition-all">
                        Checkout
                    </button>
                </footer>
            </div>
        </div>
    );
}
