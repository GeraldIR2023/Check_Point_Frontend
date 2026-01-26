import RegisterForm from "@/components/users/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "CheckPoint - Create User",
    description: "CheckPoint - Create User",
};

export default function CreateUserPage() {
    return (
        <>
            <h1 className="font-checkpoint text-7xl uppercase leading-none text-[#3e2723]">
                Create
            </h1>
            <p className="text-3xl font-bold text[#3e2723]">
                A{" "}
                <span className="text-[#f47321] uppercase italic">
                    New Character
                </span>
            </p>

            <RegisterForm />

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    href="/users/login"
                    className="text-center text-[#3e2723]"
                >
                    ¿Do you already have an account? Login
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
