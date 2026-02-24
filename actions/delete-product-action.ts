"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteProductAction(id: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) {
        throw new Error("You are not authenticated as an Admin");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;

    try {
        const req = await fetch(url, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (!req.ok) {
            const errorData = await req.json();
            throw new Error(errorData.message || "Failed to delete product");
        }

        revalidatePath("/admin/products");

        return { success: true };
    } catch (error) {
        console.error("Delete Action Error:", error);
        throw error;
    }
}
