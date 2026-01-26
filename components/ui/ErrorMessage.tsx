export default function ErrorMessage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative my-6 group">
            <div className="bg-[#e11d48] border-4 border-[#3E2723] p-4 shadow-[6px_6px_0px_#3E2723] transform -rotate-1">
                <p className="text-center text-white font-black uppercase text-sm tracking-[0.2em] drop-shadow-[2px_2px_0px_#3E2723]">
                    <span className="block text-xs opacity-80 mb-1">
                        ¡WARNING!
                    </span>
                    {children}
                </p>
            </div>
        </div>
    );
}
