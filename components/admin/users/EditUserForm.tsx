"use client";

import { updateUserByAdminAction } from "@/actions/update-user-byadmin-action";
import { User, UserSchema } from "@/src/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditUserForm({ user }: { user: User }) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            id: user.id,
            userTag: user.userTag,
            email: user.email,
            isAdmin: user.isAdmin,
        },
    });

    const onSubmit = async (data: User) => {
        setLoading(true);
        try {
            await updateUserByAdminAction(user.id, data);
            toast.success("User updated successfully");
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">
                    User Tag
                </label>
                <input
                    {...register("userTag")}
                    className={`w-full mt-1 bg-zinc-50 border ${errors.userTag ? "border-red-500" : "border-zinc-200"} rounded-2xl px-4 py-3 outline-none focus:border-[#F47321] transition-all font-bold`}
                />
                {errors.userTag && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">
                        {errors.userTag.message}
                    </p>
                )}
            </div>

            <div>
                <label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest ml-2">
                    Email
                </label>
                <input
                    {...register("email")}
                    className={`w-full mt-1 bg-zinc-50 border ${errors.email ? "border-red-500" : "border-zinc-200"} rounded-2xl px-4 py-3 outline-none focus:border-[#F47321] transition-all font-bold`}
                />
                {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between p-5 bg-zinc-900 rounded-4xl border border-zinc-800">
                <div className="flex flex-col">
                    <span className="text-xs font-black uppercase text-[#F47321]">
                        Admin Privileges
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                        Enable administrative access
                    </span>
                    <input
                        type="checkbox"
                        {...register("isAdmin")}
                        className="w-6 h-6 accent-[#F47321] cursor-pointer"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#F47321] text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
                >
                    {loading ? "Loading..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
