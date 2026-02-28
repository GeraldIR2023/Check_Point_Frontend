"use server";

import {
    ErrorResponseSchema,
    ForgotPasswordResponseSchema,
    ForgotPasswordSchema,
} from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function forgotPassword(
    prevStateType: ActionStateType,
    formData: FormData,
) {
    const forgotPassword = ForgotPasswordSchema.safeParse({
        email: formData.get("email"),
    });

    if (!forgotPassword.success) {
        return {
            errors: forgotPassword.error.issues.map((issue) => issue.message),
            success: "",
        };
    }

    const url = `${process.env.API_URL}/users/forgot-password`;
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: forgotPassword.data.email,
        }),
    });

    const json = await req.json();
    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: "",
        };
    }

    const success = ForgotPasswordResponseSchema.parse(json);

    return {
        errors: [],
        success: success.message,
    };
}
