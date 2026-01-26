import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
    Dispatch,
    SetStateAction,
    startTransition,
    useActionState,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";

type ValidateTokenProps = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>;
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
};

export default function ValidateTokenForm({
    setIsValidToken,
    token,
    setToken,
}: ValidateTokenProps) {
    const [isComplete, setIsComplete] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const validateTokenInput = validateToken.bind(null, token);
    const [state, dispatch] = useActionState(validateTokenInput, {
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
        if (state.errors) {
            state.errors.forEach((error) => {
                toast.error(error);
            });
        }
        if (state.success) {
            toast.success(state.success);
            setIsValidToken(true);
        }
    }, [state, setIsValidToken]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const handleChange = (token: string) => {
        setIsComplete(false);
        setToken(token);
    };

    const handleComplete = () => {
        setIsComplete(true);
    };
    return (
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
    );
}
