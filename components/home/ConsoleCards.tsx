import Link from "next/link";

export default function ConsoleCards() {
    return (
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Link
                    href="/catalog?platform=PS5"
                    className="group bg-neutral-900 p-6 border border-zinc-800 rounded-xl hover:border-blue-600 transition-all"
                >
                    <h5 className="mb-2 text-2xl font-(family-name:--font-luckiest) text-white text-center group-hover:text-blue-500">
                        PlayStation 5
                    </h5>
                </Link>
                <Link
                    href="/catalog?platform=Xbox"
                    className="group bg-neutral-900 p-6 border border-zinc-800 rounded-xl hover:border-green-600 transition-all"
                >
                    <h5 className="mb-2 text-2xl font-(family-name:--font-luckiest) text-white text-center group-hover:text-green-500">
                        Xbox Series
                    </h5>
                </Link>
                <Link
                    href="/catalog?platform=Nintendo"
                    className="group bg-neutral-900 p-6 border border-zinc-800 rounded-xl hover:border-red-600 transition-all"
                >
                    <h5 className="mb-2 text-2xl font-(family-name:--font-luckiest) text-white text-center group-hover:text-red-500">
                        Nintendo Switch
                    </h5>
                </Link>
            </div>
        </section>
    );
}
