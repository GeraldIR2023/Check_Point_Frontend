"use server";

import { Transaction, TransactionsResponseSchema } from "@/src/schemas";
import { cookies } from "next/headers";

export async function getTransactionsAction(
    date?: string,
): Promise<Transaction[]> {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const baseUrl = `${process.env.API_URL}/transactions`;
    const url = date ? `${baseUrl}?transactionDate=${date}` : baseUrl;

    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];

    const json = await req.json();

    const result = TransactionsResponseSchema.safeParse(json);

    if (!result.success) return [];

    return result.data;
}
