export async function getProducts(take: number = 10, skip: number = 0) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products?take=${take}&skip=${skip}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data;
}
