"use server";

import { AdminUser } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createUserByAdminAction(data: AdminUser) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) throw new Error("Unauthorized access");

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/admin/create`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!req.ok) throw new Error("Failed to create user");

    revalidatePath("/admin/users");
    redirect("/admin/users");
}
