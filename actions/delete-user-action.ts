"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(userId: number) {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) {
        throw new Error("You are not authenticated as an Admin");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;

    const req = await fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!req.ok) {
        throw new Error("Failed to delete user");
    }

    revalidatePath("/admin/users");
}
