"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: { userTag: string }) {
    const cookieStore = await cookies();
    const token = (await cookies()).get("CHECKPOINT_TOKEN")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: data.message || "Failed to update profile",
        };
    }

    if (data.token) {
        cookieStore.set("CHECKPOINT_TOKEN", data.token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
    }

    revalidatePath("/", "layout");

    return { success: true, userTag: data.userTag };
}
