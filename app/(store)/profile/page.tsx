"use client";

import { updatePasswordAction } from "@/actions/update-password-action";
import { updateProfileAction } from "@/actions/update-profile-actions";
import { useStore } from "@/src/store/store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function profilePage() {
    const userTag = useStore((state) => state.userTag);
    const setAuth = useStore((state) => state.setAuth);
    const isAuth = useStore((state) => state.isAuth);

    const [newTag, setNewTag] = useState(userTag);
    const [password, setPassword] = useState({
        current: "",
        next: "",
        confirm: "",
    });
    const [loading, setLoading] = useState({ tag: false, pass: false });
    const [isMounted, setIsMounted] = useState(false);

    //& avoid hydratation error
    useEffect(() => {
        setIsMounted(true);
        setNewTag(userTag);
    }, [userTag]);

    //& update userTag
    const handleUserTagUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newTag === userTag) return toast.info("No changes made");

        setLoading((prev) => ({ ...prev, tag: true }));
        const newUsertag = await updateProfileAction({ userTag: newTag });

        if (newUsertag.success) {
            setAuth(isAuth, newTag);
            toast.success("User tag has been updated");
        } else {
            toast.error(newUsertag.message as string);
        }
        setLoading((prev) => ({ ...prev, tag: false }));
    };

    //& update password
    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.next !== password.confirm)
            return toast.error("Passwords don't match");

        if (password.next.length < 8)
            return toast.error("Password length must be at least 8 characters");

        setLoading((prev) => ({ ...prev, pass: true }));

        const newPassword = await updatePasswordAction(
            password.current,
            password.next,
        );

        if (newPassword.success) {
            toast.success("Password updated successfully");
            setPassword({ current: "", next: "", confirm: "" });
        } else {
            toast.error(newPassword.message as string);
        }
        setLoading((prev) => ({ ...prev, pass: false }));
    };

    if (!isMounted) return null;

    return (
        <main className="max-w-3xl mx-auto pt-32 pb-20 px-6">
            <div className="mb-12">
                <h1 className="font-(family-name:--font-bangers) text-6xl text-[#F47321] tracking-tighter uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    Profile Settings
                </h1>
                <div className="h-1 w-24 bg-[#F47321] mt-2 rounded-full" />
            </div>

            <div className="grid gap-10">
                {/*User tag*/}
                <section className="bg-[#2D2A2E] border border-[#3E2723] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-[#3E2723]/30 px-8 py-4 border-b border-[#3E2723]">
                        <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm">
                            User Tag
                        </h2>
                    </div>
                    <form
                        onSubmit={handleUserTagUpdate}
                        className="p-8 space-y-6"
                    >
                        <div className="max-w-md">
                            <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-3 block">
                                Current User Tag
                            </label>
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="w-full bg-[#1A181B] border-2 border-[#3E2723] rounded-2xl p-4 text-white focus:border-[#F47321] outline-none transition-all font-mono"
                            />
                        </div>
                        <button
                            disabled={loading.tag || newTag === userTag}
                            className="bg-[#F47321] text-[#2D2A2E] px-10 py-4 rounded-2xl font-black uppercase text-xs hover:bg-[#ff8534] disabled:bg-zinc-800 disabled:text-zinc-600 transition-all shadow-[0_0_20px_rgba(244,115,33,0.2)]"
                        >
                            {loading.tag ? "Updating..." : "Save Changes"}
                        </button>
                    </form>
                </section>

                {/*New Password*/}
                <section className="bg-[#2D2A2E] border border-[#3E2723] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="bg-[#3E2723]/30 px-8 py-4 border-b border-[#3E2723]">
                        <h2 className="text-white font-black uppercase tracking-[0.3em] text-sm">
                            Change Password
                        </h2>
                    </div>
                    <form
                        onSubmit={handlePasswordUpdate}
                        className="p-8 space-y-8"
                    >
                        <div className="grid gap-6">
                            <div className="max-w-md">
                                <label className="text-zinc-500 text-[10px] uppercase font-bold mb-3 block italic">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Current Password"
                                    value={password.current}
                                    onChange={(e) =>
                                        setPassword((prev) => ({
                                            ...prev,
                                            current: e.target.value,
                                        }))
                                    }
                                    className="w-full bg-[#1A181B] border-2 border-[#3E2723] rounded-2xl p-4 text-white focus:border-red-500 outline-none transition-all"
                                />
                            </div>
                            <div className="grid gap-6 italic md:grid-cols-2">
                                <div>
                                    <label className="text-zinc-500 text-[10px] uppercase font-bold mb-3 block">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={password.next}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                next: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-[#1A181B] border-2 border-[#3E2723] rounded-2xl p-4 text-white focus:border-[#F47321] outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-zinc-500 text-[10px] uppercase font-bold mb-3 block">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Repeat New Password"
                                        value={password.confirm}
                                        onChange={(e) =>
                                            setPassword((prev) => ({
                                                ...prev,
                                                confirm: e.target.value,
                                            }))
                                        }
                                        className="w-full bg-[#1A181B] border-2 border-[#3E2723] rounded-2xl p-4 text-white focus:border-[#F47321] outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading.pass}
                                className="border-2 border-[#F47321] text-[#F47321] px-10 py-4 rounded-2xl font-black uppercase text-xs hover:bg-[#F47321] hover:text-[#2D2A2E] transition-all disabled:opacity-30"
                            >
                                {loading.pass
                                    ? "Updating..."
                                    : "Change Password"}
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
