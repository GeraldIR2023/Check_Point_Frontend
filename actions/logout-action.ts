"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//& Delete the cookie and redirect to home page
export async function logout() {
    const cookieStore = await cookies();

    cookieStore.delete("CHECKPOINT_TOKEN");

    redirect("/");
}
