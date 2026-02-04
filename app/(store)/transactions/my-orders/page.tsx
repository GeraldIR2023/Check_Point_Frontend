"use client";

import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "@/src/utils/utils";
import { toast } from "sonner";
import { getOrders } from "@/actions/get-orders-action";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

    //&Load orders
    const loadOrders = useCallback(async (date?: string) => {
        setIsLoading(true);

        try {
            const data = await getOrders(date);
            setOrders(data);
        } catch (error) {
            toast.error("Failed to load orders.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    //&Date change handler
    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        loadOrders(date);
    };

    const toggleOrder = (id: number) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#1A181B] text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                {/*filters*/}
                <aside className="w-full lg:w-1/3">
                    <div className="bg-[#2D2A2E]/50 border border-[#3E2723] p-6 rounded-2xl sticky top-24">
                        <h2 className="font-(family-name:--font-bangers) text-2xl mb-4 text-[#F47321] uppercase">
                            Date filter
                        </h2>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => handleDateChange(e.target.value)}
                            className="w-full bg-[#1A181B] border border-[#3E2723] rounded-xl p-3 text-sm focus:border-[#F47321] outline-none transition-all"
                        />
                        {selectedDate && (
                            <button
                                onClick={() => {
                                    setSelectedDate("");
                                    loadOrders();
                                }}
                                className="mt-4 w-full text-[10px] text-zinc-500 uppercase font-black hover:text-[#F47321]"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>
                </aside>
                {/*Orders List*/}
                <main className="w-full space-y-4 lg:w-2/3">
                    <header className="mb-8">
                        <h1 className="text-5xl font-(family-name:--font-bangers) uppercase tracking-tighter">
                            Order{" "}
                            <span className="text-[#F47321]">History</span>
                        </h1>
                    </header>
                    {isLoading ? (
                        <div className="py-20 text-center animate-pulse text-zinc-500 uppercase font-black">
                            Loading...
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="py-20 text-center border-2 border-dashed border-[#3E2723] rounded-2xl">
                            <ArchiveBoxIcon className="w-12 h-12 mx-auto text-zinc-700 mb-4" />
                            <p className="text-zinc-500 uppercase font-bold text-xs">
                                No orders found
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const isExpanded = expandedOrder === order.id;
                                return (
                                    <div
                                        key={order.id}
                                        className={`group bg-[#2D2A2E]/20 border transition-all duration-300 rounded-2xl overflow-hidden ${
                                            isExpanded
                                                ? "border-[#F47321] bg-[#2D2A2E]/40 shadow-[0_0_20px_rgba(244,115,33,0.05)]"
                                                : "border-[#3E2723] hover:border-[#F47321]/30"
                                        }`}
                                    >
                                        <button
                                            onClick={() =>
                                                toggleOrder(order.id)
                                            }
                                            className="w-full p-5 flex justify-between items-center transition-colors text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`p-2.5 rounded-xl transition-all ${isExpanded ? "bg-[#F47321] text-black scale-110" : "bg-[#1A181B] text-[#F47321] border border-[#3E2723]"}`}
                                                >
                                                    <ArchiveBoxIcon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-white text-lg leading-none mb-1">
                                                        Order #{order.id}
                                                    </h4>
                                                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-tighter">
                                                        {new Date(
                                                            order.transactionDate,
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                dateStyle:
                                                                    "long",
                                                            },
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right hidden sm:block">
                                                    <p
                                                        className={`text-2xl font-(family-name:--font-bangers) transition-colors ${isExpanded ? "text-white" : "text-[#F47321]"}`}
                                                    >
                                                        {formatCurrency(
                                                            order.total,
                                                        )}
                                                    </p>
                                                    <p className="text-[9px] text-zinc-600 uppercase font-black">
                                                        Quantity:{" "}
                                                        {order.contents?.length}
                                                    </p>
                                                </div>
                                                <ChevronDownIcon
                                                    className={`w-5 h-5 text-[#F47321] transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
                                                />
                                            </div>
                                        </button>
                                        {/*Details*/}
                                        <div
                                            className={`transition-all duration-500 ease-in-out ${isExpanded ? "max-h-250 border-t border-[#3E2723]/50" : "max-h-0"}`}
                                        >
                                            <div className="p-6 bg-[#1A181B]/60 space-y-4">
                                                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest flex items-center gap-2">
                                                    <PuzzlePieceIcon className="w-3 h-3" />{" "}
                                                    Contents
                                                </p>
                                                <div className="grid gap-2">
                                                    {order.contents?.map(
                                                        (content: any) => (
                                                            <div
                                                                key={content.id}
                                                                className="flex justify-between items-center bg-[#2D2A2E]/40 p-4 rounded-xl border border-[#3E2723]/30 hover:bg-[#2D2A2E]/60 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <span className="text-sm font-black text-[#F47321] bg-[#1A181B] w-8 h-8 flex items-center justify-center rounded-lg border border-[#3E2723]">
                                                                        {
                                                                            content.quantity
                                                                        }
                                                                    </span>
                                                                    <div>
                                                                        <p className="text-sm font-bold text-zinc-100 uppercase italic tracking-tight">
                                                                            {
                                                                                content
                                                                                    .product
                                                                                    .name
                                                                            }
                                                                        </p>
                                                                        <p className="text-[10px] text-zinc-600 font-medium">
                                                                            Unit:{" "}
                                                                            {formatCurrency(
                                                                                content.price,
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm font-bold text-white font-mono">
                                                                    {formatCurrency(
                                                                        content.price *
                                                                            content.quantity,
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                                {order.coupon && (
                                                    <div className="mt-4 pt-4 border-t border-[#3E2723]/30 flex justify-between items-center">
                                                        <span className="text-[10px] text-green-500 uppercase font-black bg-green-500/10 px-2 py-1 rounded">
                                                            Coupon:{" "}
                                                            {order.coupon}
                                                        </span>
                                                        <span className="text-sm text-green-400 font-bold">
                                                            -
                                                            {formatCurrency(
                                                                order.discount,
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
