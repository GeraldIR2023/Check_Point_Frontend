import { getProductById } from "@/actions/get-product-action";
import EditProductForm from "@/components/admin/products/EditProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
    params: {
        id: string;
    };
}

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { id } = params;

    const product = await getProductById(Number(id));

    if (!product) notFound();

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
                    Edit <span className="text-[#F47321]">Product</span>
                </h1>
            </header>

            <div className="max-w-4xl">
                <EditProductForm product={product} />
            </div>
        </div>
    );
}
