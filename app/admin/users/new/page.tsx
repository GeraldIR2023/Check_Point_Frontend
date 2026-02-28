import CreateUserForm from "@/components/admin/users/CreateUserForm";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewUserPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-6">
            <div className="flex items-center gap-6 mb-10">
                <Link
                    href="/admin/users"
                    className="group p-4 bg-white border border-zinc-200 rounded-[1.25rem] hover:bg-zinc-900 transition-all shadow-sm hover:shadow-xl hover:shadow-zinc-200/50"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-zinc-400 group-hover:text-[#F47321] transition-colors" />
                </Link>

                <div className="flex flex-col">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 leading-none">
                        New <span className="text-[#F47321]">User</span>
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mt-2">
                        Add a new user to the system
                    </p>
                </div>
            </div>

            {/*Form*/}
            <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-[#F47321] to-orange-400 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
                <div className="relative bg-white p-10 md:p-14 rounded-[3rem] border border-zinc-100 shadow-2xl shadow-zinc-200/60">
                    <CreateUserForm />
                </div>
            </div>
            <p className="text-center mt-8 text-zinc-400 text-[9px] font-bold uppercase tracking-widest">
                An invitation email will be sent automatically to the user.
            </p>
        </div>
    );
}
