export async function getProductById(id: number) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    try {
        const req = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!req.ok) return null;

        const product = await req.json();
        return product;
    } catch (error) {
        console.error(error);
        return null;
    }
}
