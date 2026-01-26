"use client";

type QuantitySelectorProps = {
    stock: number;
    isPreOrder: boolean;
    quantity: number;
    setQuantity: (val: number) => void;
};

export default function QuantitySelector({
    stock,
    isPreOrder,
    quantity,
    setQuantity,
}: QuantitySelectorProps) {
    const limit = isPreOrder && stock <= 0 ? 10 : stock;

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        const limit = isPreOrder && stock <= 0 ? 10 : stock;
        if (quantity < limit) setQuantity(quantity + 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);

        if (isNaN(value) || value < 1) {
            setQuantity(1);
        } else if (value > limit) {
            setQuantity(limit);
        } else {
            setQuantity(value);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <span className="text-[#F47321] text-xs font-black uppercase tracking-widest">
                    {isPreOrder ? "Reserve Quantity" : "Quantity"}
                </span>
                <span className="text-zinc-500 text-[10px] font-bold">
                    {isPreOrder && stock <= 0
                        ? "(Pre-order slots available)"
                        : `(${stock} units remaining)`}
                </span>
            </div>

            <div className="flex items-center bg-[#1A181B] border border-[#3E2723] rounded-lg overflow-hidden h-12 w-fit">
                <button
                    type="button"
                    onClick={handleDecrement}
                    className="w-10 h-full text-white text-xl font-bold hover:bg-[#3E2723]"
                >
                    -
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    min="1"
                    max={limit}
                    className="w-12 h-full flex items-center justify-center text-white text-center font-(family-name:--font-luckiest) border-x border-[#3E2723]"
                />

                <button
                    type="button"
                    onClick={() => {
                        handleIncrement();
                    }}
                    className="w-10 h-full text-white text-xl font-bold hover:bg-[#3E2723]"
                >
                    +
                </button>
            </div>
            {quantity === (isPreOrder && stock <= 0 ? 10 : stock) &&
                stock > 0 && (
                    <span className="text-[9px] text-[#F47321] font-bold uppercase animate-pulse">
                        Max Limit Reached
                    </span>
                )}
        </div>
    );
}
