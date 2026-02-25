"use client";

import { getUserTransactionsAction } from "@/actions/get-user-transactions-action";
import { Transaction } from "@/src/schemas";
import { formatDate } from "@/src/utils/utils";
import {
    CalendarIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface UserTransactionsPanelProps {
    userId: number;
    userTag: string;
    onClose: () => void;
}

export default function UserTransactionsPanel({
    userId,
    userTag,
    onClose,
}: UserTransactionsPanelProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getUserTransactionsAction(userId)
            .then((data) => setTransactions(data))
            .catch(() => setTransactions([]))
            .finally(() => setLoading(false));
    }, [userId]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity">
            {/*Overlay to close when click outside*/}
            <div className="absolute inset-0" onClick={onClose}>
                <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
                    {/*Header*/}
                    <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-4">
                        <h2 className="text-2xl font-black uppercase tracking-tighter">
                            {userTag}'s{" "}
                            <span className="text-[#F47321]">Transactions</span>
                        </h2>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            Orders History
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                    >
                        <XMarkIcon className="w-6 h-6 text-zinc-500" />
                    </button>
                </div>

                {/*Content Area*/}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-zinc-200 border-t-[#F47321] rounded-full animate-spin mb-4" />
                        <p className="text-zinc-400 font-black uppercase text-[10px] animate-pulse">
                            Loading Transactions
                        </p>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-4xl">
                        <ShoppingBagIcon className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                        <p className="text-zinc-400 font-bold uppercase text-xs tracking-tight">
                            No transactions found
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {transactions.map((tran) => (
                            <div
                                key={tran.id}
                                className="border border-zinc-100 rounded-3xl p-5 bg-zinc-50/50 hover:border-orange-200 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-400">
                                            Order Id: #
                                            {tran.id
                                                .toString()
                                                .padStart(4, "0")}
                                        </p>
                                        <div className="flex items-center gap-1 text-zinc-500">
                                            <CalendarIcon className="w-3 h-3" />
                                            <p className="text-[10px] font-bold">
                                                {formatDate(
                                                    tran.transactionDate,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xl font-black text-zinc-900 group-hover:text-[#F47321] transition-colors">
                                        $ {tran.total.toFixed(2)}
                                    </p>
                                </div>

                                <div className="space-y-2 pt-3 border-t border-zinc-100">
                                    {tran.contents?.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center text-[11px]"
                                        >
                                            <span className="text-zinc-600 font-bold uppercase tracking-tight">
                                                <span className="text-[#F47321] mr-1">
                                                    {item.quantity}x
                                                </span>
                                                {item.product.name}
                                            </span>
                                            <span className="text-zinc-400 font-mono">
                                                $ {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {tran.coupon && (
                                    <div className="mt-3 flex justify-end">
                                        <span className="text-[9px] font-black uppercase bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md">
                                            Coupon: {tran.coupon}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
