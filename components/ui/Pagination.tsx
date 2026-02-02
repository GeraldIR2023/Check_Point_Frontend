import Link from "next/link";

type PaginationProps = {
    page: number;
    totalPages: number;
    baseUrl: string;
};

export default function Pagination({
    page,
    totalPages,
    baseUrl,
}: PaginationProps) {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages)
        startPage = Math.max(1, endPage - maxVisiblePages + 1);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const buildUrl = (newPage: number) => {
        const separator = baseUrl.includes("?") ? "&" : "?";
        return `${baseUrl}${separator}page=${newPage}`;
    };

    return (
        <nav className="flex justify-center py-10">
            {page > 1 && (
                <Link
                    href={buildUrl(page - 1)}
                    className="flex items-center justify-center w-10 h-10 text-white bg-[#1A181B] border border-[#3E2723] rounded-lg hover:border-[#F47321] hover:text-[#F47321] transition-all duration-300 shadow-md group"
                >
                    &laquo;
                </Link>
            )}

            {pages.map((currentPage) => (
                <Link
                    key={currentPage}
                    href={buildUrl(currentPage)}
                    className={`flex items-center justify-center w-10 h-10 text-xl rounded-lg border transition-all duration-300 ${
                        page === currentPage
                            ? "bg-[#F47321] text-black border-[#F47321] shadow-[0_0_10px_rgba(244,115,33,0.5)] scale-105 z-10"
                            : "bg-[#1A181B] text-zinc-400 border-[#3E2723] hover:border-zinc-500 hover:text-white"
                    }`}
                >
                    {currentPage}
                </Link>
            ))}

            {page < totalPages && (
                <Link
                    href={buildUrl(page + 1)}
                    className="flex items-center justify-center w-10 h-10 text-white bg-[#1A181B] border border-[#3E2723] rounded-lg hover:border-[#F47321] hover:text-[#F47321] transition-all duration-300 shadow-md group"
                >
                    &raquo;
                </Link>
            )}
        </nav>
    );
}
