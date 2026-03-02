"use client";

import { updateCouponAction } from "@/actions/update-coupon-actio";
import { Coupon, CreateCoupon, CreateCouponSchema } from "@/src/schemas";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { TicketIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditCouponForm({ coupon }: { coupon: Coupon }) {
    const [loading, setLoading] = useState(false);

    const formattedDate = new Date(coupon.expirationDate)
        .toISOString()
        .split("T")[0];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCoupon>({
        resolver: zodResolver(CreateCouponSchema),
        defaultValues: {
            name: coupon.name,
            percentage: coupon.percentage,
            expirationDate: formattedDate,
        },
    });

    const onSubmit = async (data: CreateCoupon) => {
        setLoading(true);
        try {
            const formattedData = {
                ...data,
                expirationDate: new Date(data.expirationDate).toISOString(),
            };

            await updateCouponAction(coupon.id, formattedData);
            toast.success("Coupon updated successfully");
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2 italic">
                        Coupon Name
                    </label>
                    <div className="relative">
                        <input
                            {...register("name")}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-4 outline-none font-black uppercase focus:border-[#F47321] transition-all placeholder:text-zinc-300"
                            placeholder="Coupon Name"
                        />
                        <TicketIcon className="w-5 h-5 text-zinc-300 absolute right-4 top-4" />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-[10px] font-bold uppercase italic ml-2">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2 italic">
                        Discount Percentage
                    </label>
                    <div className="relative">
                        <input
                            {...register("percentage", { valueAsNumber: true })}
                            type="number"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-4 outline-none focus:border-[#F47321] font-bold transition-all"
                        />
                        <ReceiptPercentIcon className="w-5 h-5 text-zinc-300 absolute right-4 top-4" />
                    </div>
                    {errors.percentage && (
                        <p className="text-red-500 text-[10px] font-bold uppercase italic ml-2">
                            {errors.percentage.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2 italic">
                    Expiration Date
                </label>
                <div className="relative">
                    <input
                        {...register("expirationDate")}
                        type="date"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-4 outline-none focus:border-[#F47321] font-bold transition-all text-zinc-600"
                    />
                    <CalendarDaysIcon className="w-5 h-5 text-zinc-400 absolute right-4 top-4 pointer-events-none" />
                </div>
                {errors.expirationDate && (
                    <p className="text-red-500 text-[10px] font-bold uppercase italic ml-2">
                        {errors.expirationDate.message}
                    </p>
                )}
            </div>
            <button
                disabled={loading}
                type="submit"
                className="w-full bg-zinc-900 text-[#F47321] py-5 rounded-4xl font-black uppercase tracking-widest text-xs hover:bg-[#F47321] hover:text-black transition-all disabled:opacity-50 shadow-lg active:scale-[0.98]"
            >
                {loading ? "Loading..." : "Update Coupon"}
            </button>
        </form>
    );
}
