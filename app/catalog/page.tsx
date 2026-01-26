import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { Product } from "@/src/schemas";
import { isValidPage } from "@/src/utils/utils";
import { redirect } from "next/navigation";

async function getProducts(take: number, skip: number, platform: string) {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products?take=${take}&skip=${skip}&categoryId=1&category_id=1`;

    if (platform) {
        url += `&platform=${platform}`;
    }

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return { products: [], total: 0 };

    const data = await res.json();

    return {
        products: data.products as Product[],
        total: data.total as number,
    };
}

type SearchParams = Promise<{ platform: string; page: string }>;

export default async function Catalog({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { platform, page } = await searchParams;
    if (!isValidPage(+page)) {
        const redirectPath = platform
            ? `/catalog?platform=${platform}&page=1`
            : "/catalog?page=1";
        redirect(redirectPath);
    }

    const productsPerPage = 12;
    const skip = (+page - 1) * productsPerPage;

    const { products, total } = await getProducts(
        productsPerPage,
        skip,
        platform,
    );
    const totalPages = Math.ceil(total / productsPerPage);

    if (totalPages > 0 && +page > totalPages) {
        redirect(
            `/catalog?page=${totalPages}${platform ? `&platform=${platform}` : ""}`,
        );
    }
    const baseUrl = platform ? `/catalog?platform=${platform}` : "/catalog";

    return (
        <main className="max-w-7xl mx-auto min-h-screen px-4 pb-20">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-2 bg-[#F47321] rounded-full" />
                    <h1 className="text-5xl md:text-6xl font-(family-name:--font-luckiest) text-white uppercase tracking-tighter">
                        {platform ? `${platform}` : "Catalog"}
                    </h1>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-[#3E2723] rounded-2xl bg-[#1A181B]/50">
                        <p className="text-zinc-600 font-black uppercase tracking-widest text-sm italic">
                            No equipment found in this sector.
                        </p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-16 border-t border-[#3E2723]/30">
                    <Pagination
                        page={+page}
                        totalPages={totalPages}
                        baseUrl={baseUrl}
                    />
                </div>
            )}
        </main>
    );
}
