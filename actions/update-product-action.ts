"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProductAction(id: number, formData: any) {
    const token = (await cookies()).get("CHECKPOINT_TOKEN")?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        },
    );

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.message || "Failed to update product");
    }

    revalidatePath("/admin/products");

    redirect("/admin/products");
}
