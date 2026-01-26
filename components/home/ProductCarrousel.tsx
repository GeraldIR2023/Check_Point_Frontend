"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import ProductCard from "../products/ProductCard";
import { Product } from "@/src/schemas";

interface ProductCarrouselProps {
    title: string;
    products: Product[];
}

export default function ProductCarrousel({
    title,
    products,
}: ProductCarrouselProps) {
    if (!products) return null;

    return (
        <section className="w-full py-6">
            <div className="flex items-center gap-4 mb-6 px-6 md:px-0">
                <div className="h-8 w-1.5 bg-[#F47321] rounded-full shadow-[0_0_10px_#F47321]" />
                <h2 className="text-3xl md:text-5xl font-(family-name:--font-luckiest) text-white uppercase tracking-tighter italic">
                    {title}
                </h2>
            </div>

            {/*Carrousel*/}
            <div className="px-6 md:px-0">
                <Swiper
                    modules={[Navigation, Pagination, Mousewheel]}
                    navigation={true}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    mousewheel={{ forceToAxis: true }}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="pb-12 overflow-visible!"
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="h-auto">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
