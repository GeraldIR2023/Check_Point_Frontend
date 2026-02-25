"use server";

import { User, UserSchema } from "@/src/schemas";
import { cookies } from "next/headers";

export async function getUserByUserTagAction(
    userTag: string,
): Promise<User | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    if (!token) return null;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/${userTag}`;

    try {
        const req = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        });

        if (!req.ok) return null;

        const data = await req.json();

        return UserSchema.parse(data);
    } catch (error) {
        console.error(error);
        return null;
    }
}
