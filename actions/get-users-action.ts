"use server";

import { User } from "@/src/schemas";
import { cookies } from "next/headers";

export async function getUsersAction(): Promise<User[]> {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) return [];

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users`;
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!req.ok) return [];

    const data = await req.json();

    return data;
}
