"use client";

import { createUserByAdminAction } from "@/actions/create-user-byadmin-action";
import { AdminCreateUserSchema, AdminUser } from "@/src/schemas";
import {
    ClipboardDocumentIcon,
    KeyIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { generate } from "generate-password-ts";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateUserForm() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AdminUser>({
        resolver: zodResolver(AdminCreateUserSchema),
        defaultValues: { isAdmin: false, userTag: "", email: "", password: "" },
    });

    const currentPassword = watch("password");

    //&Generate a random password using generate-password-ts
    const generatePassword = () => {
        const pass = generate({
            length: 8,
            numbers: true,
            symbols: true,
            uppercase: true,
            strict: true,
        });
        setValue("password", pass, { shouldValidate: true });
        toast.success("Password generated successfully");
    };

    //&Copy the random password
    const copyPassword = () => {
        if (!currentPassword) return;
        navigator.clipboard.writeText(currentPassword);
        toast.info("Copied to clipboard");
    };

    const onSubmit = async (data: AdminUser) => {
        setLoading(true);

        try {
            await createUserByAdminAction(data);
            toast.success("User created successfully");
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">
                        User Tag
                    </label>
                    <input
                        {...register("userTag")}
                        className={`w-full bg-zinc-50 border ${errors.userTag ? "border-red-500" : "border-zinc-200"} font-bold rounded-2xl px-4 py-3 outline-none focus:border-[#F47321] transition-all placeholder:text-zinc-300`}
                        placeholder="User Tag"
                    />
                    {errors.userTag && (
                        <p className="text-red-500 text-[10px] font-bold ml-2 uppercase italic">
                            {errors.userTag.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">
                        Email Address
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className={`w-full bg-zinc-50 border ${errors.email ? "border-red-500" : "border-zinc-200"} font-bold rounded-2xl px-4 py-3 outline-none focus:border-[#F47321] transition-all`}
                        placeholder="Email Address"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-[10px] font-bold ml-2 uppercase italic">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            {/*Generate Password*/}
            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">
                    Set Password
                </label>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            {...register("password")}
                            type="text"
                            className={`w-full bg-zinc-50 border ${errors.password ? "border-red-500" : "border-zinc-200"} font-bold rounded-2xl px-4 py-4 outline-none focus:border-[#F47321] transition-all`}
                        />
                        {currentPassword && (
                            <button
                                type="button"
                                onClick={copyPassword}
                                className="absolute right-4 top-4 text-zinc-400 hover:text-[#F47321] transition-colors"
                            >
                                <ClipboardDocumentIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={generatePassword}
                        className="bg-zinc-900 text-[#F47321] px-6 rounded-2xl font-black uppercase text-[10px] hover:bg-[#F47321] hover:text-black transition-all flex items-center gap-2 border border-zinc-800"
                    >
                        <KeyIcon className="w-4 h-4" />
                        Generate Password
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-[10px] font-bold ml-2 uppercase italic">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between p-6 bg-zinc-900 rounded-4xl border border-zinc-800 shadow-xl mt-4">
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-[#F47321] tracking-tighter">
                        Admin Role
                    </span>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                        Full admin rights
                    </span>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        {...register("isAdmin")}
                        className="w-8 h-8 accent-[#F47321] cursor-pointer"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F47321] text-black py-5 rounded-4xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-orange-500/10"
            >
                {}
                {loading ? (
                    "Loading..."
                ) : (
                    <>
                        <UserPlusIcon className="w-5 h-5" />
                        Create User
                    </>
                )}
            </button>
        </form>
    );
}
