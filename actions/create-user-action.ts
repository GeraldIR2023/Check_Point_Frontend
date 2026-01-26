"use server";

import {
    ErrorResponseSchema,
    RegisterSchema,
    SuccessSchema,
} from "@/src/schemas";

type ActionStateType = {
    errors: string[];
    success: string;
};

export async function createUser(
    prevState: ActionStateType,
    formData: FormData
) {
    const registerData = {
        email: formData.get("email"),
        userTag: formData.get("userTag"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
    };

    //* Validate input data
    const userData = RegisterSchema.safeParse(registerData);

    if (!userData.success) {
        const errors = userData.error.issues.map((issue) => issue.message);
        return {
            errors,
            success: prevState.success,
        };
    }

    //* Register data in the database
    const url = `${process.env.API_URL}/users/create`;
    const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userTag: registerData.userTag,
            email: registerData.email,
            password: registerData.password,
        }),
    });

    const json = await req.json();
    if (req.status === 409) {
        const { error } = ErrorResponseSchema.parse(json);
        return {
            errors: [error],
            success: "",
        };
    }

    const success = SuccessSchema.parse(json);

    return {
        errors: [],
        success: `Player ${success.userTag} registered! Check your inbox to activate the save slot.`,
    };
}
