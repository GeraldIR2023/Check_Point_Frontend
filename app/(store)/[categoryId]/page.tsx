import ProductCard from "@/components/products/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { Product } from "@/src/schemas";
import { redirect } from "next/navigation";

type CategoryPageProps = {
    params: Promise<{ categoryId: string }>;
    searchParams: Promise<{ page?: string }>;
};

export default async function CategoryPage({
    params,
    searchParams,
}: CategoryPageProps) {
    const { categoryId } = await params;
    const { page } = await searchParams;

    const currentPage = Number(page) || 1;
    if (currentPage < 1) redirect(`/categories/${categoryId}?page=1`);

    const productsPerPage = 12;
    const skip = (currentPage - 1) * productsPerPage;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}?products=true&take=${productsPerPage}&skip=${skip}`,
        {
            cache: "no-store",
        },
    );

    const category = await res.json();
    const baseUrl = `/${categoryId}`;

    const totalProducts = category.totalProducts || 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    console.log({
        totalProducts: category.totalProducts,
        receivedProducts: category.products?.length,
        totalPages: totalPages,
    });

    if (totalPages > 0 && currentPage > totalPages) {
        redirect(`/categories/${categoryId}?page=${totalPages}`);
    }
    return (
        <main className="max-w-7xl mx-auto">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-2 bg-[#F47321] rounded-full" />
                    <h1 className="text-5xl md:text-6xl font-(family-name:--font-luckiest) text-white uppercase tracking-tighter">
                        {category.name}
                    </h1>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                {category.products?.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-16">
                    <Pagination
                        page={currentPage}
                        totalPages={totalPages}
                        baseUrl={baseUrl}
                    />
                </div>
            )}
        </main>
    );
}
