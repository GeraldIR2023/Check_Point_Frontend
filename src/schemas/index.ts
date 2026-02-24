import { z } from "zod";

//*User Schemas
export const RegisterSchema = z
    .object({
        email: z.email({ error: "Invalid email" }),
        userTag: z.string().min(1, { error: "UserTag cannot be empty!" }),
        password: z.string().min(8, {
            error: "Short password, minimum 8 characters",
        }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        error: "Passwords do not match!",
        path: ["password_confirmation"],
    });

export const UserSchema = z.object({
    id: z.number(),
    userTag: z.string(),
    email: z.email(),
    isAdmin: z.boolean().nullable(),
});

export const LoginSchema = z.object({
    email: z.email({ error: "Invalid email" }),
    password: z.string().min(1, { error: "Password cannot be empty" }),
});

export const ForgotPasswordSchema = z.object({
    email: z
        .email({ error: "Invalid email" })
        .min(1, { error: "Email is required!" }),
});

export const ResetPasswordSchema = z
    .object({
        password: z.string().min(8, {
            error: "The password must be at least 8 characters long",
        }),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        error: "Passwords do not match",
        path: ["password_confirmation"],
    });

export const TokenSchema = z
    .string({ error: "Invalid Token" })
    .length(6, { error: "Invalid Token" });

//*Product Schemas
export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    platform: z.string(),
    image: z.string(),
    price: z.coerce.number(),
    inventory: z.number(),
    isFeatured: z.boolean(),
    isPreOrder: z.boolean(),
    discountPrice: z.number(),
    addedAt: z.string(),
    description: z.string(),
    categoryId: z.coerce.number(),
});

export const ProductsResponseSchema = z.object({
    products: z.array(ProductSchema),
    total: z.number(),
});

export const ProductFormSchema = z.object({
    name: z.string().min(1, { error: "Name cannot be empty" }),
    price: z.coerce.number().min(1, { error: "Price cannot be empty" }),
    image: z.string({ error: "Image cannot be empty" }),
    inventory: z.coerce
        .number()
        .min(0, { error: "Inventory cannot be negative" }),
    platform: z.string().min(1, { error: "Platform cannot be empty" }),
    discountPrice: z.coerce
        .number()
        .min(0, { error: "Discount Price cannot be empty" }),
    description: z.string().min(1, { error: "Description cannot be empty" }),
    categoryId: z.string().min(1, { error: "Category cannot be empty" }),
    isFeatured: z.boolean(),
    isPreOrder: z.boolean(),
    addedAt: z.string(),
});

//*Category Schemas
export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
});

export const CategoriesResponseSchema = z.array(CategorySchema);

export const CategoryWithProductsResponseSchema = CategorySchema.extend({
    products: z.array(ProductSchema),
});

//*Shopping Cart Schemas
const ShoppingCartContentsSchema = ProductSchema.pick({
    name: true,
    image: true,
    price: true,
    inventory: true,
    discountPrice: true,
    isFeatured: true,
    isPreOrder: true,
}).extend({
    productId: z.number(),
    quantity: z.number(),
});

export const ShoppingCartSchema = z.array(ShoppingCartContentsSchema);

//*Coupon Schema
export const CouponResponseSchema = z.object({
    name: z.string().default(""),
    message: z.string(),
    percentage: z.coerce.number().min(0).max(100).default(0),
});

//*Order Schemas
const OrderContentSchema = z.object({
    productId: z.number(),
    quantity: z.number(),
    price: z.number(),
});

export const OrderSchema = z.object({
    total: z.number(),
    coupon: z.string(),
    contents: z
        .array(OrderContentSchema)
        .min(1, { message: "Cart cannot be empty" }),
});

//*Transaction Schemas
export const ContentsSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.string(),
    product: ProductSchema,
});

export const TransactionResponseSchema = z.object({
    id: z.number(),
    total: z.string(),
    transactionDate: z.string(),
    discount: z.string(),
    coupon: z.string().nullable(),
    contents: z.array(ContentsSchema),
});

export const TransactionsResponseSchema = z.array(TransactionResponseSchema);

//*Error/Success Schemas
export const ErrorResponseSchema = z.object({
    message: z.union([z.string(), z.array(z.string())]),
    error: z.string(),
    statusCode: z.number(),
});

export const SuccessSchema = UserSchema;

//*Types
export type User = z.infer<typeof UserSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartContentsSchema>;
export type Coupon = z.infer<typeof CouponResponseSchema>;
export type Transaction = z.infer<typeof TransactionResponseSchema>;
