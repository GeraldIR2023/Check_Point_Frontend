import PasswordResetHandler from "@/components/users/PasswordResetHandler";

export default function ValidateToken() {
    return (
        <>
            <h1 className="font-checkpoint text-7xl uppercase leading-none text-[#3e2723]">
                Restore your access
            </h1>
            <p className="text-3xl font-bold text[#3e2723]">
                with the{" "}
                <span className="text-[#f47321] uppercase italic">
                    security token
                </span>
            </p>

            <PasswordResetHandler />
        </>
    );
}
