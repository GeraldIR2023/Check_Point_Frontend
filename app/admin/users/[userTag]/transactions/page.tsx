import { getUserTransactionsAction } from "@/actions/get-user-transactions-action";
import { getUserByUserTagAction } from "@/actions/get-usertag-action";
import { Transaction } from "@/src/schemas";
import { formatCurrency, formatDate } from "@/src/utils/utils";
import {
    ArrowLeftIcon,
    CalendarIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UsersTransactionsPage({
    params,
}: {
    params: Promise<{ userTag: string }>;
}) {
    const { userTag } = await params;

    const user = await getUserByUserTagAction(userTag);

    if (!user) notFound();

    const transactions: Transaction[] = await getUserTransactionsAction(
        user.id,
    );

    return (
        <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
            {/*Header*/}
            <header className="flex items-center gap-4">
                <Link
                    href="/admin/users"
                    className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-zinc-500" />
                </Link>
                <h1 className="text-4xl font-black uppercase tracking-tighter">
                    {user.userTag}'s{" "}
                    <span className="text-[#F47321]">Transactions</span>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
                        Check user's orders here
                    </p>
                </h1>
            </header>
            {/*Transactions List*/}
            {transactions.length === 0 ? (
                <div className="text-center py-24 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
                    <ShoppingBagIcon className="w-16 h-16 text-zinc-200 mx-auto mb-4" />
                    <p className="text-zinc-400 font-black uppercase text-sm tracking-widest">
                        No transactions found for this user
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {transactions.map((tran: Transaction) => (
                        <div
                            key={tran.id}
                            className="bg-white border border-zinc-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:border-zinc-300 transition-all"
                        >
                            {/*Orders Header*/}
                            <div className="bg-zinc-50/50 px-8 py-5 border-b border-zinc-100 flex justify-between items-center">
                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                            Order ID
                                        </p>
                                        <p className="font-bold text-zinc-900 font-mono">
                                            #TX-
                                            {tran.id
                                                .toString()
                                                .padStart(4, "0")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                                            <CalendarIcon className="w-3 h-3" />{" "}
                                            Date
                                        </p>
                                        <p className="font-bold text-zinc-600">
                                            {formatDate(tran.transactionDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                        Total
                                    </p>
                                    <p className="text-2xl font-black text-[#F47321]">
                                        {formatCurrency(tran.total)}
                                    </p>
                                </div>
                            </div>

                            {/*Products Details*/}
                            <div className="p-8">
                                <div className="space-y-3">
                                    {tran.contents.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center bg-zinc-50/30 p-3 rounded-2xl border border-zinc-50"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-zinc-900 text-[#F47321] w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs">
                                                    {item.quantity}x
                                                </div>
                                                <span className="font-black text-zinc-800 uppercase text-sm italic">
                                                    {item.product.name}
                                                </span>
                                            </div>
                                            <span className="font-bold text-zinc-500 text-sm">
                                                {formatCurrency(item.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/*Coupon*/}
                                {tran.coupon && (
                                    <div className="mt-6 flex justify-end items-center gap-3 pt-4 border-t border-dashed border-zinc-100">
                                        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
                                            Coupon:
                                        </span>
                                        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-orange-200">
                                            {tran.coupon} (-
                                            {formatCurrency(tran.discount)})
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
