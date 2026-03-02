import { getTransactionsAction } from "@/actions/get-transactions-action";
import TransactionFilter from "@/components/admin/transactions/TransactionFilter";
import TransactionTable from "@/components/admin/transactions/TransactionsTable";
import { formatCurrency } from "@/src/utils/utils";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";

export default async function AdminTransactionsPage({
    searchParams,
}: {
    searchParams: Promise<{ date?: string }>;
}) {
    const { date } = await searchParams;

    const transactions = await getTransactionsAction(date);

    const totalRevenue = transactions.reduce(
        (acc, curr) => acc + curr.total,
        0,
    );
    const totalSales = transactions.length;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                        Sales <span className="text-[#F47321]">Analytics</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium mt-2">
                        {date
                            ? `Showing results for ${date}`
                            : "Real-time revenue and transaction history."}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="bg-[#1A181B] p-5 rounded-4xl border border-zinc-800 shadow-xl shadow-orange-500/10 min-w-50">
                        <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest mb-1 italic">
                            Total Revenue
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-white italic">
                                {formatCurrency(totalRevenue)}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-4xl border border-zinc-200 shadow-sm min-w-37.5">
                        <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1 italic">
                            Orders
                        </p>
                        <div className="flex items-center gap-2 text-zinc-900">
                            <span className="text-2xl font-black italic">
                                {totalSales}
                            </span>
                            <span className="text-[10px] font-bold uppercase text-zinc-400">
                                Products Sold
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between bg-zinc-100/50 p-2 rounded-2xl border border-zinc-200">
                <TransactionFilter initialDate={date} />
            </div>
            <div className="relative">
                <div className="absolute -top-10 -left-10 w-80 h-80 bg-orange-100 rounded-full blur-[100px] opacity-40 -z-10" />
                <div className="bg-white p-8 rounded-[3rem] border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="p-2 bg-orange-50 rounded-xl">
                            <PresentationChartLineIcon className="w-5 h-5 text-[#F47321]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest leading-none">
                                Performance
                            </p>
                            <h2 className="text-sm font-black uppercase text-zinc-900">
                                Revenue Flow
                            </h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden mb-10">
                        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                            <h3 className="text-xs font-black uppercase text-zinc-900 tracking-widest italic">
                                Recent Transactions
                            </h3>
                            <span className="text-[10px] font-bold text-zinc-400 uppercase">
                                Live Feed
                            </span>
                        </div>
                        <TransactionTable transactions={transactions} />
                    </div>
                </div>
            </div>
        </div>
    );
}
