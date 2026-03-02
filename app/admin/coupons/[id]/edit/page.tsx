import { getCouponById } from "@/actions/get-coupon-action";
import EditCouponForm from "@/components/admin/coupons/EditCouponForm";
import { formatDate } from "@/src/utils/utils";
import { ArrowLeftIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCouponPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const coupon = await getCouponById(+id);

    if (!coupon) notFound();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-center">
                <div>
                    <Link
                        href="/admin/coupons"
                        className="group flex items-center gap-2 text-zinc-500 hover:text-[#F47321] transition-colors mb-2 w-fit"
                    >
                        <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs font-black uppercase tracking-widest">
                            Back to Coupons
                        </span>
                    </Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
                        Edit <span className="text-[#F47321]">Coupon</span>
                    </h1>
                </div>

                <div className="bg-zinc-200/50 p-4 rounded-2xl border border-zinc-200">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">
                        Current Expiration
                    </p>
                    <div className="flex items-center gap-2 text-zinc-600">
                        <CalendarIcon className="w-3 h-3 text-[#F47321]" />
                        <span className="text-xs font-bold uppercase italic">
                            {formatDate(coupon.expirationDate)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />
                <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm shadow-zinc-100 relative z-10 md:p-12">
                    <EditCouponForm coupon={coupon} />
                </div>
            </div>
            <p className="text-center mt-8 text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">
                Editing Coupon ID: {coupon.id}
            </p>
        </div>
    );
}
