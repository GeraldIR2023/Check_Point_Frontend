import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
    Coupon,
    CouponResponseSchema,
    Product,
    ShoppingCart,
} from "../schemas";

interface Store {
    total: number;
    discount: number;
    contents: ShoppingCart;
    coupon: Coupon;
    isCartOpen: boolean;
    isAuth: boolean;
    userTag: string;
    addToCart: (product: Product, quantity?: number) => void;
    updateQuantity: (id: Product["id"], quantity: number) => void;
    removeFromCart: (id: Product["id"]) => void;
    calculateTotal: () => void;
    applyCoupon: (couponName: string) => Promise<void>;
    removeCoupon: () => void;
    applyDiscount: () => void;
    clearOrder: () => void;
    setCartOpen: (open: boolean) => void;
    setAuth: (auth: boolean, tag: string) => void;
    logout: () => void;
}

const initialState = {
    total: 0,
    discount: 0,
    contents: [],
    coupon: {
        percentage: 0,
        name: "",
        message: "",
    },
    isAuth: false,
    userTag: "",
};

export const useStore = create<Store>()(
    persist(
        devtools((set, get) => ({
            ...initialState,

            isCartOpen: false,
            setCartOpen: (open) => set({ isCartOpen: open }),
            setAuth: (auth, tag) => set({ isAuth: auth, userTag: tag }),
            logout: () => {
                set(() => ({
                    ...initialState,
                }));
            },
            addToCart: (product, quantity = 1) => {
                const { id: productId, categoryId, ...data } = product;
                let contents: ShoppingCart = [];

                const duplicated = get().contents.findIndex(
                    (item) => item.productId === productId,
                );

                //^To check if the game is already in the Shopping Cart
                if (duplicated >= 0) {
                    const itemInCart = get().contents[duplicated];

                    //^Check if the game is a preorder and the inventory
                    if (
                        !itemInCart.isPreOrder &&
                        itemInCart.quantity + quantity > itemInCart.inventory
                    )
                        return;

                    //^ Add the product quantity without duplicate the product in the SC
                    contents = get().contents.map((item) =>
                        item.productId === productId
                            ? {
                                  ...item,
                                  quantity: item.quantity + quantity,
                              }
                            : item,
                    );
                } else {
                    if (product.inventory <= 0 && !product.isPreOrder) return;

                    contents = [
                        ...get().contents,
                        {
                            ...data,
                            quantity,
                            productId,
                        },
                    ];
                }

                set(() => ({
                    contents,
                }));

                get().calculateTotal();
            },
            updateQuantity: (id, quantity) => {
                const item = get().contents.find((i) => i.productId === id);

                if (item && !item.isPreOrder && quantity > item.inventory)
                    return;

                set((state) => ({
                    contents: state.contents.map((item) =>
                        item.productId == id ? { ...item, quantity } : item,
                    ),
                }));
                get().calculateTotal();
            },
            removeFromCart: (id) => {
                //~Keep the products except the one whose productId === id
                set((state) => ({
                    contents: state.contents.filter(
                        (item) => item.productId !== id,
                    ),
                }));
                if (!get().contents.length) get().clearOrder();
                get().calculateTotal();
            },
            calculateTotal: () => {
                const subTotal = get().contents.reduce((total, item) => {
                    const basePrice =
                        item.discountPrice && item.discountPrice > 0
                            ? item.discountPrice
                            : item.price;

                    return total + item.quantity * basePrice;
                }, 0);

                const discount = (get().coupon.percentage / 100) * subTotal;

                set(() => ({
                    discount,
                    total: subTotal - discount,
                }));
            },
            applyCoupon: async (couponName) => {
                //*Validate if the user has an active coupon
                if (get().coupon.percentage > 0) return;

                try {
                    const req = await fetch("/coupons/api", {
                        method: "POST",
                        body: JSON.stringify({ coupon_name: couponName }),
                    });
                    const json = await req.json();

                    if (!req.ok) return;

                    const coupon = CouponResponseSchema.parse(json);

                    set(() => ({
                        coupon,
                    }));

                    get().calculateTotal();
                } catch (error) {
                    console.error("Invalid Coupon", error);
                }
            },
            removeCoupon: () => {
                set(() => ({
                    coupon: initialState.coupon,
                    discount: 0,
                }));
                get().calculateTotal();
            },
            applyDiscount: () => get().calculateTotal(),
            clearOrder: () => {
                set(() => ({
                    ...initialState,
                }));
            },
        })),
        {
            name: "shopping-cart",
            skipHydration: false,
        },
    ),
);
