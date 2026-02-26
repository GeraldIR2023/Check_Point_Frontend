"use server";

import { User } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateUserByAdminAction(
    userId: number,
    data: Partial<User>,
) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;

    const req = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!req.ok) throw new Error("Failed to update user");

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${data.userTag}/transactions`);
    redirect("/admin/users");
}
