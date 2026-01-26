export default function SuccessMessage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative my-6 group">
            <div className="bg-[#00e5ff]/10 border-2 border-[#00e5ff] p-4 rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.3)] transform transition-transform hover:scale-[1.02]">
                <p className="text-center text-[#3E2723] font-black uppercase text-sm tracking-[0.15em]">
                    <span className="inline-block animate-bounce mr-2">💎</span>
                    <span className="text-[#00B8D4]">
                        User created successfully!
                    </span>
                    <span className="block mt-1 text-xs font-bold opacity-90 italic">
                        {children}
                    </span>
                </p>
            </div>

            <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#00e5ff] rotate-45 blur-[1px]"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00e5ff] rotate-45 blur-[1px]"></div>
        </div>
    );
}
