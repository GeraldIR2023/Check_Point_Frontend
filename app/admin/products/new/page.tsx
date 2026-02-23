import AddProductForm from "@/components/admin/products/AddProductFrom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col justify-between gap-4 mb-10 md:flex-row md:items-center">
                <div>
                    <Link
                        href="/admin/products"
                        className="group flex items-center gap-2 text-zinc-500 hover:text-[#F47321] transition-colors mb-2 w-fit"
                    >
                        <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs font-black uppercase tracking-widest">
                            Back to Inventory
                        </span>
                    </Link>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
                        New <span className="text-[#F47321]">Product</span>
                    </h1>
                </div>

                <div className="bg-zinc-200/50 p-4 rounded-2xl border border-zinc-200">
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">
                        Status
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase">
                            Draft Mode
                        </span>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />
                <AddProductForm />
            </div>
        </div>
    );
}
