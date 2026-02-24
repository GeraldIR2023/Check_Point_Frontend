"use server";

import { cookies } from "next/headers";

export async function getOrders(date?: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) return { success: false, message: "No session found" };

    try {
        const url = date
            ? `${process.env.NEXT_PUBLIC_API_URL}/transactions/my-orders?transactionDate=${date}`
            : `${process.env.NEXT_PUBLIC_API_URL}/transactions/my-orders`;

        const req = await fetch(url.toString(), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!req.ok) return [];

        return await req.json();
    } catch (error) {
        return { success: false, message: "Network error" };
    }
}
