"use server";

import { CreateCoupon, ErrorResponseSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCouponAction(data: CreateCoupon) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.API_URL}/coupons`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const json = await req.json();

    if (!req.ok) {
        const errorResult = ErrorResponseSchema.safeParse(json);
        if (errorResult.success) {
            const errorMessage = Array.isArray(errorResult.data.message)
                ? errorResult.data.message[0]
                : errorResult.data.message;
            throw new Error(errorMessage);
        }
        throw new Error("Failed to create coupon");
    }

    revalidatePath("/admin/coupons");
    redirect("/admin/coupons");
}
