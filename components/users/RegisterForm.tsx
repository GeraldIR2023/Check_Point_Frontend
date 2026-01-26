"use client";

import { createUser } from "@/actions/create-user-action";
import { useActionState } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import SuccessMessage from "../ui/SuccessMessage";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const inputClasses =
        "block py-2.5 px-0 w-full text-sm text-[#3E2723] bg-transparent border-0 border-b-2 border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F47321] peer font-medium";
    const labelClasses =
        "absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-[#F47321] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

    const router = useRouter();
    const [state, dispatch] = useActionState(createUser, {
        errors: [],
        success: "",
    });

    return (
        <form
            className="max-w-md mx-auto space-y-8 py-5"
            noValidate
            action={dispatch}
        >
            {state.errors.map((error) => (
                <ErrorMessage key={error}>{error}</ErrorMessage>
            ))}
            {state.success && <SuccessMessage>{state.success}</SuccessMessage>}
            <div className="relative z-0 w-full group">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={inputClasses}
                    placeholder=" "
                    required
                />
                <label htmlFor="email" className={labelClasses}>
                    Email
                </label>
            </div>
            <div className="relative z-0 w-full group">
                <input
                    type="text"
                    name="userTag"
                    id="userTag"
                    className={inputClasses}
                    placeholder=" "
                    required
                />
                <label htmlFor="userTag" className={labelClasses}>
                    User Tag (username)
                </label>
            </div>
            <div className="relative z-0 w-full group">
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={inputClasses}
                    placeholder=" "
                    required
                />
                <label htmlFor="password" className={labelClasses}>
                    Password
                </label>
            </div>
            <div className="relative z-0 w-full group">
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    className={inputClasses}
                    placeholder=" "
                    required
                />
                <label htmlFor="password_confirmation" className={labelClasses}>
                    Repeat Password
                </label>
            </div>
            <button
                type="submit"
                className="w-full bg-[#F47321] text-[#3E2723] font-black text-base px-5 py-3 rounded-lg transition-all duration-200 hover:bg-[#FF883E] hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00e5ff]/50 shadow-[0_4px_0_#3E2723] uppercase tracking-widest"
            >
                Save
            </button>
            {state.success && (
                <button
                    type="submit"
                    className="w-full bg-[#F47321] text-[#3E2723] font-black text-base px-5 py-3 rounded-lg transition-all duration-200 hover:bg-[#FF883E] hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00e5ff]/50 shadow-[0_4px_0_#3E2723] uppercase tracking-widest"
                    onClick={() => router.push("/users/confirm-account")}
                >
                    Confirm Account
                </button>
            )}
        </form>
    );
}
