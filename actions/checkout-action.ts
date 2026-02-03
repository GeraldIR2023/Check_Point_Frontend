"use server";
import { cookies } from "next/headers";

export async function checkout(orderData: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("User not authenticated");

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(orderData),
        },
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to process checkout");
    }

    return result;
}
