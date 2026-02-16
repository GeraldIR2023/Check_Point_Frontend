"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/src/store/store";

export default function CouponForm() {
    const applyCoupon = useStore((state) => state.applyCoupon);
    const removeCoupon = useStore((state) => state.removeCoupon);
    const coupon = useStore((state) => state.coupon);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const couponName = formData.get("coupon_name")?.toString();
        if (!couponName) return;

        setIsLoading(true);
        await applyCoupon(couponName);

        form.reset();
        setIsLoading(false);
    };

    return (
        <div className="space-y-3 p-4 bg-[#2D2A2E]/50 rounded-xl border border-[#3E2723]">
            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">
                ¿Do you have a coupon?
            </p>

            {coupon.percentage > 0 ? (
                <div className="flex items-center justify-between bg-[#F47321]/10 border border-[#F47321]/20 p-3 rounded-lg">
                    <div>
                        <p className="text-[10px] font-black text-[#F47321] uppercase">
                            {coupon.name} Active
                        </p>
                        <p className="text-[9px] text-zinc-500 font-bold">
                            -{coupon.percentage} %
                        </p>
                    </div>
                    <button
                        onClick={removeCoupon}
                        className="text-[9px] font-black text-zinc-400 uppercase underline hover:text-red-500 transition-colors"
                    >
                        Remove Coupon
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter your coupon here"
                        name="coupon_name"
                        className="flex-1 bg-[#1A181B] border border-[#3E2723] rounded-lg px-3 py-2 text-xs uppercase font-bold text-white outline-none focus:border-[#F47321] transition-all placeholder:text-zinc-700"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#3E2723] text-[#F47321] px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-[#F47321] hover:text-black transition-all disabled:opacity-50"
                    >
                        {isLoading ? "..." : "Apply"}
                    </button>
                </form>
            )}
        </div>
    );
}
