"use client";

import { confirmAccount } from "@/actions/confirm-account-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ConfirmAccountForm() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const confirmAccountWithToken = confirmAccount.bind(null, token);
    const [state, dispatch] = useActionState(confirmAccountWithToken, {
        errors: [],
        success: "",
    });

    useEffect(() => {
        if (isComplete) {
            startTransition(() => {
                dispatch();
            });
        }
    }, [isComplete, dispatch]);

    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach((error) => {
                toast.error(error);
            });
            setToken("");
        }

        if (state.success) {
            toast.success(state.success, {
                onClose: () => router.push("/users/login"),
            });
        }
    }, [state]);

    const handleChange = (token: string) => {
        setIsComplete(false);
        setToken(token);
    };

    const handleComplete = () => {
        setIsComplete(true);
    };

    return (
        <>
            <div className="flex justify-center gap-5 my-10">
                <PinInput
                    placeholder=""
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className="h-10 w-10 border-4 border-[#D7CCC8] bg-[#D7CCC8] text-[#3E2723] shadow rounded-lg text-center font-(family-name:--font-bangers)" />
                    <PinInputField className="h-10 w-10 border-4 border-[#D7CCC8] bg-[#D7CCC8] text-[#3E2723] shadow rounded-lg text-center font-(family-name:--font-bangers)" />
                    <PinInputField className="h-10 w-10 border-4 border-[#D7CCC8] bg-[#D7CCC8] text-[#3E2723] shadow rounded-lg text-center font-(family-name:--font-bangers)" />
                    <PinInputField className="h-10 w-10 border-4 border-[#D7CCC8] bg-[#D7CCC8] text-[#3E2723] shadow rounded-lg text-center font-(family-name:--font-bangers)" />
                    <PinInputField className="h-10 w-10 border-4 border-[#D7CCC8] bg-[#D7CCC8] text-[#3E2723] shadow rounded-lg text-center font-(family-name:--font-bangers)" />
                    <PinInputField className="h-10 w-10 border-4 border-[#D7CCC8] bg-[#D7CCC8] text-[#3E2723] shadow rounded-lg text-center font-(family-name:--font-bangers)" />
                </PinInput>
            </div>
        </>
    );
}
