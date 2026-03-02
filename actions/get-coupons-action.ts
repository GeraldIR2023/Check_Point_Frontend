"use server";

import { CouponResponseSchema } from "@/src/schemas";
import { cookies } from "next/headers";

export async function getCouponsAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.API_URL}/coupons`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: { tags: ["coupons"] },
        cache: "no-store",
    });

    if (!req.ok) return [];

    const data = await req.json();

    const result = CouponResponseSchema.array().safeParse(data);

    if (!result.success) return [];

    return result.data;
}
