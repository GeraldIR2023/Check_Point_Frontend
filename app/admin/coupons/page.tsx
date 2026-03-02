import { getCouponsAction } from "@/actions/get-coupons-action";
import CouponTable from "@/components/admin/coupons/CouponsTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function CouponsPage() {
    const coupons = await getCouponsAction();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-between items-start gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
                        Coupons <span className="text-[#F47321]">Control</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium mt-2">
                        Manage and create coupons for your customers
                    </p>
                </div>

                <Link
                    href="/admin/coupons/new"
                    className="flex items-center gap-2 shadow-xl shadow-orange-500/10 bg-[#1A181B] text-[#F47321] px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-[#F47321] hover:text-black transition-all"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Coupon
                </Link>
            </div>

            <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                <CouponTable coupon={coupons} />

                {coupons.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest">
                            No coupons found
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4 pb-10">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                    {coupons.length} coupons registered
                </p>
            </div>
        </div>
    );
}
