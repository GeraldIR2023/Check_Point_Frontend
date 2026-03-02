"use client";

import { deleteCouponAction } from "@/actions/delete-coupon-action";
import { Coupon } from "@/src/schemas";
import { formatDate } from "@/src/utils/utils";
import {
    PencilSquareIcon,
    TicketIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";

export default function CouponTable({ coupon }: { coupon: Coupon[] }) {
    const handleDelete = async (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the coupon "${name}"?`)) {
            try {
                await deleteCouponAction(id);
                toast.success("Coupon deleted successfully");
            } catch (error) {
                toast.error("An error occurred while deleting the coupon");
            }
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Coupon Name
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-center">
                            Discount
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Expiration Date
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                    {coupon.map((c) => (
                        <tr
                            key={c.id}
                            className="hover:bg-zinc-50/50 transition-colors"
                        >
                            <td className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-100 rounded-lg text-zinc-400">
                                        <TicketIcon className="w-4 h-4" />
                                    </div>
                                    <span className="bg-[#1A181B] text-[#F47321] px-3 py-1.5 rounded-lg text-xs font-black border border-zinc-800 uppercase italic">
                                        {c.name}
                                    </span>
                                </div>
                            </td>

                            <td className="p-6 text-center">
                                <span className="text-sm font-black text-zinc-800">
                                    {c.percentage} %
                                </span>
                            </td>

                            <td className="p-6">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-zinc-600">
                                        {formatDate(c.expirationDate)}
                                    </span>
                                </div>
                            </td>

                            <td className="p-6">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/admin/coupons/${c.id}/edit`}
                                        className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(c.id, c.name)
                                        }
                                        className="p-2 text-zinc-400 rounded-xl hover:text-red-600 hover:bg-red-50 transition-all"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
