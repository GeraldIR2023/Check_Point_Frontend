"use server";

import { cookies } from "next/headers";

export async function uploadImageAction(formData: FormData): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get("CHECKPOINT_TOKEN")?.value;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/upload-image`;

    const req = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!req.ok) throw new Error("Error uploading image");

    const data = await req.json();
    return data.secure_url;
}
