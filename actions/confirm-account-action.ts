"use server";

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function confirmAccount(
    token: string,
    prevState: ActionStateType
) {
    //& Validate token
    const confirmToken = TokenSchema.safeParse(token);
    if (!confirmToken.success) {
        return {
            errors: confirmToken.error.issues.map((issue) => issue.message),
            success: "",
        };
    }

    //& Confirm user
    const url = `${process.env.API_URL}/users/confirm-account`;
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: confirmToken.data }),
    });

    const json = await req.json();

    if (!req.ok) {
        const error = ErrorResponseSchema.safeParse(json);
        let errors = "An unexpected error occurred";

        if (error.success) {
            errors = Array.isArray(error.data.message)
                ? error.data.message[0]
                : error.data.message;
        } else {
            errors = json.message?.[0] || json.message || "Invalid Token";
        }

        return {
            errors: [errors],
            success: "",
        };
    }

    const success = SuccessSchema.parse(json);

    return {
        errors: [],
        success: `Player ${success.userTag} confirmed!`,
    };
}
