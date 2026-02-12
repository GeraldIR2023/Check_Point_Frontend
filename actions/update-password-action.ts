"use server";

import { cookies } from "next/headers";

export async function updatePasswordAction(
    current_password: string,
    password: string,
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) return { success: false, message: "Invalid token" };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/update-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password,
                    password,
                }),
            },
        );

        const data = await res.json();

        if (!res.ok)
            return {
                success: false,
                message: data.message || "Failed to update password",
            };

        return { success: true };
    } catch (error) {
        return { success: false, message: "An error occurred" };
    }
}
