import ProductActions from "@/components/products/ProductActions";
import { Product } from "@/src/schemas";
import { formatCurrency, getImagePath } from "@/src/utils/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: string): Promise<Product | null> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
            cache: "no-store",
        },
    );
    if (!res.ok) return null;
    return res.json();
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) return notFound();

    const discount =
        product.discountPrice > 0 && product.discountPrice < product.price;

    return (
        <main className="max-w-7xl mx-auto px-4 pt-10 pb-20">
            <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-2">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-linear-to-r from-[#F47321] to-[#3E2723] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#1A181B] border border-[#3E2723] md:aspect-4/5">
                        <Image
                            src={getImagePath(product.image)}
                            alt={`${product.name} image`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="flex flex-col space-y-8">
                    <header>
                        <span className="text-[#F47321] font-bold tracking-[0.2em] uppercase text-sm">
                            {product.isPreOrder ? "Pre-order" : "Available Now"}
                        </span>
                        <h1 className="text-5xl font-(family-name:--font-luckiest) text-white uppercase leading-none mt-2 md:text-7xl">
                            {product.name}
                        </h1>
                    </header>

                    <div className="flex flex-col bg-[#3E2723]/10 p-6 rounded-2xl border border-[#3E2723]/30">
                        <p className="text-[#F47321] text-xs font-black uppercase tracking-[0.3em] mb-2">
                            Current Price
                        </p>
                        <div className="flex items-baseline gap-4">
                            {discount ? (
                                <>
                                    <div className="flex flex-col">
                                        <span className="text-zinc-500 text-2xl line-through decoration-[#F47321]/40 leading-none">
                                            {formatCurrency(product.price)}
                                        </span>
                                        <span className="text-6xl font-(family-name:--font-luckiest) text-[#F47321] drop-shadow-[0_4px_0_rgba(244,115,33,0.4)] md:text-7xl">
                                            {formatCurrency(
                                                product.discountPrice,
                                            )}
                                        </span>
                                    </div>
                                    <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-sm font-black uppercase self-center">
                                        offer!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-6xl font-(family-name:--font-luckiest) text-white drop-shadow-[0_4px_0_rgba(255,255,255,0.1)] md:text-7xl">
                                        {formatCurrency(product.price)}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-[#F47321] uppercase font-black tracking-widest text-xs border-b border-[#3E2723] pb-2">
                            Description
                        </h3>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            {product.description ||
                                "No description available gear up for the action."}
                        </p>
                    </div>
                    <div className="pt-4">
                        <ProductActions product={product} />
                    </div>
                </div>
            </div>
        </main>
    );
}
