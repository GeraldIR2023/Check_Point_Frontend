"use client";

import { getUserTransactionsAction } from "@/actions/get-user-transactions-action";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function UserTransactionsPanel({
    userId,
    userTag,
    onClose,
}: {
    userId: number;
    userTag: string;
    onClose: () => void;
}) {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserTransactionsAction(userId).then((data) => {
            setTransactions(data);
            setLoading(false);
        });
    }, [userId]);

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">
                        History:{" "}
                        <span className="text-[#F47321]">@{userTag}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 rounded-full"
                    >
                        <XMarkIcon className="w-6 h-6 text-zinc-500" />
                    </button>
                </div>

                {loading ? (
                    <p className="text-center py-10 text-zinc-400 font-bold uppercase text-xs animate-pulse">
                        Loading Orders
                    </p>
                ) : transactions.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-zinc-100 rounded-3xl">
                        <ShoppingBagIcon className="w-12 h-12 text-zinc-200 mx-auto mb-2" />
                        <p className="text-zinc-400 font-bold uppercase text-[10px]">
                            No transactions found
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {transactions.map((tran) => (
                            <div
                                key={tran.id}
                                className="p-4 border border-zinc-100 rounded-2xl bg-zinc-50 hover:border-orange-200 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black uppercase text-zinc-400">
                                        Order #{tran.id}
                                    </span>
                                    <span className="font-black text-[#F47321]">
                                        ${tran.total}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-zinc-600">
                                    Status: {tran.status}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
