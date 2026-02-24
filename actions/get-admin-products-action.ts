export async function getAdminProducts({
    search,
    category_id,
    take,
    skip,
}: any) {
    const params = new URLSearchParams();

    if (search) params.append("search", search);

    if (category_id) params.append("category_id", category_id);

    params.append("take", take.toString());
    params.append("skip", skip.toString());

    const url = `${process.env.NEXT_PUBLIC_API_URL}/products?${params.toString()}`;

    const req = await fetch(url, {
        cache: "no-store",
    });

    const data = await req.json();

    return {
        products: data.products || [],
        total: data.total || 0,
    };
}
