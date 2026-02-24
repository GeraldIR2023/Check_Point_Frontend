"use server";
import { cookies } from "next/headers";

export async function checkout(orderData: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("User not authenticated");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    const result = await req.json();

    if (!req.ok) {
        throw new Error(result.message || "Failed to process checkout");
    }

    return result;
}
