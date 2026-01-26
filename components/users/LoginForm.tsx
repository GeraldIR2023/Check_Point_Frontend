"use client";

import { authenticate } from "@/actions/authenticate-user-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
    const router = useRouter();
    const inputClasses =
        "block py-2.5 px-0 w-full text-sm text-[#3E2723] bg-transparent border-0 border-b-2 border-stone-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#F47321] peer font-medium";

    const labelClasses =
        "absolute text-sm text-stone-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:start-0 peer-focus:text-[#F47321] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

    const [state, dispatch] = useActionState(authenticate, {
        errors: [],
    });

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach((error) => {
                toast.error(error);
            });
        }
    }, [state]);

    return (
        <form
            className="max-w-md mx-auto space-y-8 py-5"
            noValidate
            action={dispatch}
        >
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
            <button
                type="submit"
                className="w-full bg-[#F47321] text-[#3E2723] font-black text-base px-5 py-3 rounded-lg transition-all duration-200 hover:bg-[#FF883E] hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#00e5ff]/50 shadow-[0_4px_0_#3E2723] uppercase tracking-widest"
            >
                Login
            </button>
        </form>
    );
}
