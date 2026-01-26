import ConfirmAccountForm from "@/components/users/ConfirmAccountForm";

export default function ConfirmAccountPage() {
    return (
        <>
            <h1 className="font-checkpoint text-7xl uppercase leading-none text-[#3e2723]">
                Unlock Save Slot
            </h1>
            <p className="text-3xl font-bold text[#3e2723]">
                Check your email {""}
                <span className="text-[#f47321] uppercase italic">
                    and start playing
                </span>
            </p>

            <ConfirmAccountForm />
        </>
    );
}
