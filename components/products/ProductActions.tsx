"use client";

import { Product } from "@/src/schemas";
import { useState } from "react";
import { AddToCart } from "../cart/AddToCartButton";
import ExitButton from "../ui/ExitButton";
import QuantitySelector from "./QuantitySelector";

export default function ProductActions({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="space-y-6 pt-4">
            {(product.inventory > 0 || product.isPreOrder) && (
                <QuantitySelector
                    stock={product.inventory}
                    isPreOrder={product.isPreOrder}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            )}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <AddToCart product={product} quantity={quantity} />
                <ExitButton />
            </div>
        </div>
    );
}
