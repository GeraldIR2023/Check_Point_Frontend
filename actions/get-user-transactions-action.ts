"use server";

import { cookies } from "next/headers";

export async function getUserTransactionsAction(userId: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions/user/${userId}`;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];

    return await req.json();
}
