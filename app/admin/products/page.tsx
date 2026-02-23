import { getAdminProducts } from "@/actions/get-admin-products-action";
import CategoryFilter from "@/components/admin/products/CategoryFilter";
import ProductsTable from "@/components/admin/products/ProductsTable";
import SearchProduct from "@/components/admin/products/SearchProduct";
import Pagination from "@/components/ui/Pagination";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function AdminProductPage({
    searchParams,
}: {
    searchParams: Promise<{
        search?: string;
        category_id?: string;
        page?: string;
    }>;
}) {
    const params = await searchParams;
    const search = params.search || "";
    const category_id = params.category_id || "";
    const currentPage = Number(params.page) || 1;
    const take = 10;
    const skip = (currentPage - 1) * take;

    const { products, total } = await getAdminProducts({
        search,
        category_id,
        take,
        skip,
    });

    const totalPages = Math.ceil(total / take);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-between items-start gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
                        Products <span className="text-[#F47321]">Control</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-medium">
                        Manage your stock, categories and featured products.
                    </p>
                </div>

                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 shadow-xl shadow-orange-500/10 bg-[#1A181B] text-[#F47321] px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-[#F47321] hover:text-black transition-all"
                >
                    <PlusIcon className="w-5 h-5" />
                    New Product
                </Link>
            </div>

            {/*Search Bar & Filters*/}
            <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm md:grid-cols-4">
                <div className="md:col-span-3">
                    <SearchProduct defaultValue={search} />
                </div>
                <div className="md:col-span-1">
                    <CategoryFilter defaultValue={category_id} />
                </div>
            </div>

            {/*Products Grid*/}
            <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
                <ProductsTable products={products} />
                {products.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest">
                            No products found matching your criteria.
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-4 pb-10">
                <Pagination totalPages={totalPages} page={currentPage} />
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                    Showing {products.length} of {total} results
                </p>
            </div>
        </div>
    );
}
