"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createProductAction(data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const json = await req.json();

    if (!req.ok) throw new Error(json.message || "Failed to create product");

    revalidatePath("/admin/products");
    redirect("/admin/products");
}
