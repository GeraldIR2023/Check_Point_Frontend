import { getUsersAction } from "@/actions/get-users-action";
import UserTable from "@/components/admin/users/UsersTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default async function AdminUsersPage() {
    const users = await getUsersAction();

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex flex-col justify-between gap-6 mb-10 md:flex-row md:items-center">
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter text-zinc-900">
                        Users <span className="text-[#F47321]">Control</span>
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">
                        Manage your users and their permissions
                    </p>
                </div>

                <Link
                    href="/admin/users/new"
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-[#F47321] text-[#F47321] hover:text-black px-8 py-4 rounded-2xl font-black uppercase transition-all shadow-xl shadow-orange-500/10 group"
                >
                    <PlusIcon className="w-5 h-5 stroke-[3px]" />
                    <span>New User</span>
                </Link>
            </div>
            <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-2xl shadow-zinc-200/50 overflow-hidden">
                <UserTable users={users} />

                {users.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-zinc-400 font-black uppercase text-xs tracking-widest">
                            There's no users yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
