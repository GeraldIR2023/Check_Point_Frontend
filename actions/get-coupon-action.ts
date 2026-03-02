"use server";

import { CouponResponseSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCouponById(id: number) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.API_URL}/coupons/${id}`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) redirect("/admin/coupons");

    const json = await req.json();
    const result = CouponResponseSchema.safeParse(json);

    if (!result.success) redirect("/admin/coupons");

    return result.data;
}
