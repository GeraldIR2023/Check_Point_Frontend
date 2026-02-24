"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProductAction(id: number, data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) {
        throw new Error("Unauthorized access");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    const req = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const json = await req.json();

    if (!req.ok) {
        const message = Array.isArray(json.message)
            ? json.message.join(", ")
            : json.message;
        throw new Error(message || "Failed to update product");
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}
