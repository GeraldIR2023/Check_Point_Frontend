import { cookies } from "next/headers";

export default async function getToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("CHECKPOINT_TOKEN")?.value;
}
