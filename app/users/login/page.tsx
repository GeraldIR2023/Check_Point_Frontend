import LoginForm from "@/components/users/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CheckPoint - Login",
    description: "CheckPoint - Login",
};

export default function LoginPage() {
    return (
        <>
            <h1 className="font-checkpoint text-7xl uppercase leading-none text-[#3e2723]">
                ¿Ready to play?
            </h1>
            <p className="text-3xl font-bold text[#3e2723]">
                Insert your credentials {""}
                <span className="text-[#f47321] uppercase italic">
                    to resume your progress
                </span>
            </p>

            <LoginForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    href="/users/create"
                    className="text-center text-[#3e2723]"
                >
                    Start your adventure: Register now
                </Link>

                <Link
                    href="/users/forgot-password"
                    className="text-center text-[#3e2723]"
                >
                    ¿Forgot your password?
                </Link>
            </nav>
        </>
    );
}
