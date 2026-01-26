import Link from "next/link";
import Logo from "../../components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";

export default function UsersLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
                <div className=" flex justify-center bg-orange-50 bg-no-repeat lg:bg-[url(/NewUser.png)] bg-center lg:bg-size-[30rem]">
                    <div>
                        <Link href={"/"}>
                            <Logo />
                        </Link>
                    </div>
                </div>
                <div className="p-10 lg:py-28 bg-stone-50 flex items-center justify-center">
                    <div className="max-w-3xl mx-auto">{children}</div>
                </div>
            </div>
            <ToastNotification />
        </>
    );
}
