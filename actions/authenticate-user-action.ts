"use server";

import { ErrorResponseSchema, LoginSchema } from "@/src/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionStateType = {
    errors: string[];
};

export async function authenticate(
    prevState: ActionStateType,
    formData: FormData
) {
    const loginCredentials = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const auth = LoginSchema.safeParse(loginCredentials);

    if (!auth.success) {
        return {
            errors: auth.error.issues.map((issue) => issue.message),
        };
    }

    const url = `${process.env.API_URL}/users/login`;
    const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            password: auth.data.password,
            email: auth.data.email,
        }),
    });

    const json = await req.json();

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
        };
    }
    console.log(json);

    //&Set cookie
    (await cookies()).set({
        name: "CHECKPOINT_TOKEN",
        value: json.token,
        httpOnly: true,
        path: "/",
    });

    redirect("/");
}
