"use server";

import { cookies } from "next/headers";

export async function getOrders(date?: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized");

    const url = new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions/my-orders`,
    );
    if (date) url.searchParams.append("transactionDate", date);

    const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!res.ok) return [];

    return await res.json();
}
