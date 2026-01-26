import Image from "next/image";

export function Hero() {
    return (
        <section className="relative h-[45vh] flex items-center justify-center bg-[#1A181B] overflow-hidden border-b border-[#3E2723] md:h-[55vh]">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/backGroundImage.png"
                        alt="Back Ground Image"
                        fill
                        className="object-cover opacity-30 grayscale"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#2D2A2E_80%)]" />
                <div className="absolute inset-0 bg-linear-to-t from-[#2D2A2E] via-transparent to-[#2D2A2E]/50" />
            </div>

            <div className="relative z-10 flex flex-col items-center px-4">
                <div className="mb-4">
                    <Image
                        src="/boxIcon.png"
                        alt="CheckPoint Logo"
                        width={80}
                        height={80}
                    />
                </div>

                <div className="text-center">
                    <h1 className="font-(family-name:--font-luckiest) leading-none text-center">
                        <span className="block text-6xl tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-yellow-400 via-orange-500 to-red-600 drop-shadow-[3px_3px_0px_#3e2723] md:text-9xl">
                            Check Point
                        </span>
                        <span className="block text-2xl text-slate-100 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.8)] whitespace-nowrap mt-2 md:text-2xl">
                            VideoGames
                        </span>
                    </h1>
                </div>

                <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-8 bg-[#F47321]/50" />
                    <span className="text-[10px] font-bold text-[#F47321] uppercase tracking-[0.2em]">
                        Online Store
                    </span>
                    <div className="h-px w-8 bg-[#F47321]/50" />
                </div>
            </div>
        </section>
    );
}
