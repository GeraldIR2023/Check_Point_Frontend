"use client";

import { Transaction } from "@/src/schemas";
import { formatCurrency, formatDate } from "@/src/utils/utils";
import { TagIcon } from "@heroicons/react/24/solid";

export default function TransactionTable({
    transactions,
}: {
    transactions: Transaction[];
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Transaction ID
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Products Details
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-center">
                            Date
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-right">
                            Financials
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                    {transactions.map((tran) => (
                        <tr
                            key={tran.id}
                            className="hover:bg-zinc-50/50 transition-colors group"
                        >
                            <td className="p-6">
                                <span>{tran.id}</span>
                            </td>

                            <td className="p-6">
                                <div className="flex flex-col gap-1">
                                    {tran.contents.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="text-[10px] font-black text-[#F47321] bg-orange-50 px-1.5 py-0.5 rounded">
                                                {item.quantity}x
                                            </span>
                                            <span className="text-xs font-bold text-zinc-600 truncate max-w-50">
                                                {item.product.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </td>

                            <td className="p-6 text-center">
                                <span className="text-xs font-bold text-zinc-500 uppercase">
                                    {formatDate(tran.transactionDate)}
                                </span>
                            </td>

                            <td className="p-6 text-right">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-black text-zinc-900">
                                        {formatCurrency(tran.total)}
                                    </span>
                                    {tran.discount > 0 && (
                                        <div className="flex items-center gap-1 mt-1 text-[9px] font-black text-[#F47321] uppercase italic">
                                            <TagIcon className="w-3 h-3" />
                                            Saved $
                                            {formatCurrency(tran.discount)} (
                                            {tran.coupon})
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
