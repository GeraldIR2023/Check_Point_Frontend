import ConsoleCards from "@/components/home/ConsoleCards";
import { Hero } from "@/components/home/Hero";
import ProductCarrousel from "@/components/home/ProductCarrousel";
import { getProducts } from "@/src/api";
import { Product } from "@/src/schemas";

export default async function Home() {
    const { products } = await getProducts(40, 0);

    const featured = products.filter((product: Product) => product.isFeatured);
    const preOrder = products.filter((product: Product) => product.isPreOrder);
    const discount = products.filter(
        (product: Product) =>
            product.discountPrice > 0 && product.discountPrice < product.price,
    );
    return (
        <main className="min-h-screen pb-20">
            <Hero />

            <div className="max-w-7xl mx-auto flex flex-col gap-16 mt-12">
                <ConsoleCards />
            </div>

            <ProductCarrousel title="Featured Games" products={featured} />
            <ProductCarrousel title="Coming Soon" products={preOrder} />
            <ProductCarrousel title="Special Deals" products={discount} />
        </main>
    );
}
