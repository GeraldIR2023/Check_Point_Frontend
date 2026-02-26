import { getUserByUserTagAction } from "@/actions/get-usertag-action";
import EditUserForm from "@/components/admin/users/EditUserForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ userTag: string }>;
}) {
    const { userTag } = await params;

    const user = await getUserByUserTagAction(userTag);

    if (!user) notFound();

    return (
        <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
            {/*Header*/}
            <div className="flex items-center gap-6">
                <Link
                    href="/admin/users"
                    className="p-3 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all shadow-sm group"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900" />
                </Link>
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900">
                        Edit <span className="text-[#F47321]">User</span>
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
                        Editing User: {user.userTag}
                    </p>
                </div>
            </div>

            {/*Form*/}
            <div className="bg-white p-10 rounded-[3rem] border border-zinc-200 shadow-2xl shadow-zinc-200/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-bl-full -mr-16 -mt-16 z-0" />
                <div className="relative z-10">
                    <EditUserForm user={user} />
                </div>
            </div>

            <div className="bg-zinc-900 rounded-4xl p-6 text-center">
                <p className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">
                    Database ID:{" "}
                    <span className="text-white font-mono">{user.id}</span> •
                    Account Status:{" "}
                    <span className="text-[#F47321] font-mono">Active</span>
                </p>
            </div>
        </div>
    );
}
