"use client";

import { createProductAction } from "@/actions/create-product-action";
import { ProductFormSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import UploadProductImage from "./UploadProductImage";

export default function AddProductForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            discountPrice: 0,
            inventory: 0,
            categoryId: "",
            platform: "",
            image: "",
            isPreOrder: false,
            isFeatured: false,
            addedAt: new Date().toISOString().split("T")[0],
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const formattedData = {
                ...data,
                price: Number(data.price),
                discountPrice: Number(data.discountPrice) || 0,
                inventory: Number(data.inventory),
                categoryId: Number(data.categoryId),
                addedAt: new Date(data.addedAt).toISOString(),
            };
            await createProductAction(formattedData);
            toast.success("Product created successfully!");
        } catch (error: any) {
            if (error.message !== "NEXT_REDIRECT") {
                toast.error(error.message);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-sm border border-zinc-200 rounded-2xl p-8 space-y-8"
        >
            <UploadProductImage
                onImageUpload={(url) => setValue("image", url)}
            />
            {errors.image && (
                <p className="text-red-500 text-xs font-bold">
                    {errors.image.message}
                </p>
            )}
            <input type="hidden" {...register("image")} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Product Name
                    </label>
                    <input
                        {...register("name")}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all"
                        type="text"
                        placeholder="Insert product name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[10px] font-bold uppercase">
                            {errors.name.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Category
                    </label>
                    <select
                        {...register("categoryId")}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all appearance-none"
                    >
                        <option value="">Select Category</option>
                        <option value="1">Games</option>
                        <option value="2">Consoles</option>
                        <option value="3">Accessories</option>
                    </select>
                    {errors.categoryId && (
                        <p className="text-red-500 text-[10px] font-bold uppercase">
                            {errors.categoryId.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Platform
                    </label>
                    <div className="relative">
                        <select
                            {...register("platform")}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all appearance-none cursor-pointer"
                        >
                            <option value="">Select Platform</option>
                            <option value="PS5">PlayStation 5</option>
                            <option value="Xbox">Xbox Series X/S</option>
                            <option value="Nintendo">Nintendo Switch</option>
                            <option value="Multi">Multiplatform</option>
                        </select>
                    </div>
                    {errors.platform && (
                        <p className="text-red-500 text-[10px] font-bold uppercase">
                            {errors.platform.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Price
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price")}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all"
                    />
                    {errors.price && (
                        <p className="text-red-500 text-[10px] font-bold uppercase">
                            {errors.price.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Discount Price (Optional)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("discountPrice")}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Available Stock
                    </label>
                    <input
                        type="number"
                        {...register("inventory")}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all"
                    />
                    {errors.inventory && (
                        <p className="text-red-500 text-[10px] font-bold uppercase">
                            {errors.inventory.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Entry Date
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            {...register("addedAt")}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all text-zinc-700 font-medium"
                        />
                    </div>
                    {errors.addedAt && (
                        <p className="text-red-500 text-[10px] font-bold uppercase">
                            {errors.addedAt.message?.toString()}
                        </p>
                    )}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-black uppercase text-zinc-500 tracking-widest">
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        rows={5}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 outline-none focus:border-[#F47321] transition-all resize-none"
                        placeholder="Product detailed description..."
                    />
                </div>

                <div className="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            {...register("isFeatured")}
                            className="w-5 h-5 accent-[#F47321]"
                        />
                        <span className="text-xs font-bold uppercase text-zinc-700">
                            Featured
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            {...register("isPreOrder")}
                            className="w-5 h-5 accent-[#F47321]"
                        />
                        <span className="text-xs font-bold uppercase text-zinc-700">
                            Pre-Order
                        </span>
                    </label>
                </div>
            </div>

            <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-[#1A181B] text-[#F47321] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#F47321] hover:text-black transition-all shadow-lg shadow-orange-500/10 disabled:opacity-50"
            >
                {isSubmitting ? "Creating..." : "Save Product"}
            </button>
        </form>
    );
}
