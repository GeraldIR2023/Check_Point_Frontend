import ForgotPasswordForm from "@/components/users/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CheckPoint - Forgot Password",
    description: "CheckPoint - Forgot Password",
};

export default function ForgotPassword() {
    return (
        <>
            <h1 className="font-checkpoint text-7xl uppercase leading-none text-[#3e2723]">
                Lost your Save?
            </h1>
            <p className="text-3xl font-bold text[#3e2723]">
                We'll send a code{" "}
                <span className="text-[#f47321] uppercase italic">
                    to restore your profile access
                </span>
            </p>

            <ForgotPasswordForm />
        </>
    );
}
