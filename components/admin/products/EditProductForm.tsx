"use client";

import { useForm } from "react-hook-form";
import { updateProductAction } from "@/actions/update-product-action";
import { Product, ProductFormSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product }: { product: Product }) {
    const router = useRouter();

    //*Using React Hook Form with Zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(ProductFormSchema.partial()),
        defaultValues: {
            ...product,
            categoryId: String(product.categoryId),
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const formattedData = {
                ...data,
                price: Number(data.price),
                discountPrice:
                    data.discountPrice === "" ? 0 : Number(data.discountPrice),
                inventory: data.inventory === "" ? 0 : Number(data.inventory),
                categoryId: Number(data.categoryId),
                isPreOrder: Boolean(data.isPreOrder),
                isFeatured: Boolean(data.isFeatured),
            };

            await updateProductAction(product.id, formattedData);
            toast.success("Product updated successfully");
        } catch (error: any) {
            if (error.message !== "NEXT_REDIRECT") {
                toast.error(error.message || "Failed to update product");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-8 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm md:grid-cols-2"
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                        Product Name
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[10px] mt-1 font-bold">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        rows={5}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all resize-none"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-[10px] mt-1 font-bold">
                            {errors.description.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                            Price
                        </label>
                        <input
                            {...register("price")}
                            type="number"
                            step="0.01"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-[10px] mt-1 font-bold">
                                {errors.price.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                            Discount Price
                        </label>
                        <input
                            {...register("discountPrice")}
                            type="number"
                            step="0.01"
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black uppercase text-zinc-500 mb-1">
                        Inventory
                    </label>
                    <input
                        {...register("inventory")}
                        type="number"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3"
                    />
                </div>

                <div className="flex gap-6 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            {...register("isPreOrder")}
                            type="checkbox"
                            className="w-5 h-5 accent-[#F47321]"
                        />
                        <span className="text-xs font-bold uppercase text-zinc-700">
                            Pre-Order
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            {...register("isFeatured")}
                            type="checkbox"
                            className="w-5 h-5 accent-[#F47321]"
                        />
                        <span className="text-xs font-bold uppercase text-zinc-700">
                            Featured Product
                        </span>
                    </label>
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#1A181B] text-[#F47321] py-4 rounded-xl font-black uppercase hover:bg-[#F47321] hover:text-black transition-all shadow-lg shadow-orange-500/10"
                >
                    {isSubmitting ? "Loading..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
