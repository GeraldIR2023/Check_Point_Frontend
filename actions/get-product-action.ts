export async function getProductById(id: number) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            },
        );

        if (!res.ok) return null;

        const product = await res.json();
        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}
