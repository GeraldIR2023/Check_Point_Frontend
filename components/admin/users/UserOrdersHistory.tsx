"use client";

import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function UserOrdersHistory({
    transactions,
    userTag,
    onClose,
}: any) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end">
            <div className="w-full max-w-md bg-white h-full p-8 overflow-y-auto animate-in slide-in-from-right">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">
                        Orders for{" "}
                        <span className="text-[#F47321]">@{userTag}</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 rounded-full"
                    >
                        <XMarkIcon className="w-6 h-6 text-zinc-500" />
                    </button>
                </div>

                {transactions.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingCartIcon className="w-12 h-12 text-zinc-200 mx-auto mb-4" />
                        <p className="text-zinc-400 font-bold uppercase text-xs">
                            No transactions found
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {transactions.map((tran: any) => (
                            <div
                                key={tran.id}
                                className="border-b border-zinc-100 pb-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-zinc-400">
                                            Order ID: #{tran.id}
                                        </p>
                                        <p className="text-xs font-bold text-zinc-500">
                                            {new Date(
                                                tran.transactionDate,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <p className="text-lg font-black text-zinc-900">
                                        ${tran.total}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {tran.contents.map((item: any) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-xs"
                                        >
                                            <span className="text-zinc-600 font-medium">
                                                {item.quantity}x{" "}
                                                {item.product.name}
                                            </span>
                                            <span className="text-zinc-400">
                                                ${item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
