"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCouponAction(id: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.API_URL}/coupons/${id}`;

    const req = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!req.ok) throw new Error("Failed to delete coupon");

    revalidatePath("/admin/coupons");
    return { success: true };
}
