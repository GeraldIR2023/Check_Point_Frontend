"use client";

import { deleteProductAction } from "@/actions/delete-product-action";
import { Product } from "@/src/schemas";
import { getImagePath } from "@/src/utils/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { tr } from "zod/locales";

export default function ProductsTable({ products }: { products: Product[] }) {
    const handleDelete = async (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteProductAction(id);
                toast.success("Product deleted successfully");
            } catch (error) {
                toast.error("Failed to delete product");
            }
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                        <th className="px-6 py-4">Image</th>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Platform</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Stock</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className="hover:bg-zinc-50/50 transition-colors group"
                        >
                            <td className="px-6 py-4">
                                <div className="w-12 h-12 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200 relative">
                                    <Image
                                        src={getImagePath(product.image)}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        onError={(e) =>
                                            (e.currentTarget.src =
                                                "/default.svg")
                                        }
                                    />
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-zinc-900 group-hover:text-[#F47321] transition-colors line-clamp-1">
                                        {product.name}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-2 py-1 rounded-md uppercase">
                                    {product.platform}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-black text-zinc-900">
                                        ${product.price}
                                    </span>
                                    {product.discountPrice > 0 && (
                                        <span className="text-[10px] text-orange-500 font-bold italic">
                                            Sale: ${product.discountPrice}
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`text-xs font-black ${product.inventory < 5 ? "text-red-500" : "text-zinc-600"}`}
                                >
                                    {product.inventory}{" "}
                                    <span className="text-[10px] text-zinc-400">
                                        Units
                                    </span>
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-1">
                                    {product.isPreOrder && (
                                        <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-blue-100">
                                            Pre-Order
                                        </span>
                                    )}
                                    {product.isFeatured && (
                                        <span className="bg-yellow-50 text-yellow-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase border border-yellow-100">
                                            Featured
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="p-2 bg-zinc-100 text-zinc-600 rounded-lg hover:bg-[#F47321] hover:text-white transition-all shadow-sm"
                                        title="Edit Product"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product.id,
                                                product.name,
                                            )
                                        }
                                        className="p-2 bg-zinc-100 text-zinc-600 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                        title="Delete Product"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
