"use client";

import { deleteUserAction } from "@/actions/delete-user-action";
import { User } from "@/src/schemas";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "sonner";
import { tr } from "zod/locales";

export default function UserTable({ users }: { users: User[] }) {
    const handleDelete = async (userId: number, userTag: string) => {
        if (confirm(`Are you sure you want to delete ${userTag}?`)) {
            try {
                await deleteUserAction(userId);
                toast.success("User deleted successfully");
            } catch (error) {
                toast.error("Failed to delete User");
            }
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            UserTag
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Email
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                            Role
                        </th>
                        <th className="p-6 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="hover:bg-zinc-50/50 transition-colors"
                        >
                            <td className="p-6">
                                <span className="bg-[#1A181B] text-[#F47321] px-3 py-1.5 rounded-lg text-xs font-black border border-zinc-800">
                                    {user.userTag}
                                </span>
                            </td>

                            <td className="p-6">
                                <span className="text-sm font-bold text-zinc-600">
                                    {user.email}
                                </span>
                            </td>

                            <td className="p-6">
                                {user.isAdmin ? (
                                    <span className="text-orange-600 text-[10px] font-black uppercase px-2 py-1 bg-orange-50 rounded border border-orange-100">
                                        Admin
                                    </span>
                                ) : (
                                    <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                        User
                                    </span>
                                )}
                            </td>

                            <td className="p-6">
                                <div className="flex justify-end gap-2">
                                    <Link
                                        href={`/admin/users/${user.userTag}/transactions`}
                                        className="p-2 text-zinc-400 hover:text-[#F47321] hover:bg-orange-50 rounded-xl transition-all"
                                    >
                                        <ShoppingBagIcon className="w-5 h-5" />
                                    </Link>

                                    <Link
                                        href={`/admin/users/${user.userTag}/edit`}
                                        className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-xl transition-all"
                                    >
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </Link>

                                    <button
                                        className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        onClick={() =>
                                            handleDelete(user.id, user.userTag)
                                        }
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
