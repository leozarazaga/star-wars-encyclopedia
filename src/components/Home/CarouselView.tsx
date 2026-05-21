import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CarouselViewProps = {
    children: React.ReactNode;
};

const CarouselView: React.FC<CarouselViewProps> = ({ children }) => {
    return (
        <div className="carousel-wrapper">
            <Swiper
                modules={[Navigation, Pagination, Keyboard]}
                spaceBetween={20}
                // Base Mobile (under 375px): Shows 2 full cards and a 30% peek of the 3rd
                slidesPerView={2.3}
                slidesPerGroup={1}
                speed={800}
                navigation={true}
                pagination={{ clickable: true }}
                keyboard={{ enabled: true }}
                loop={false}
                grabCursor={true}
                breakpoints={{
                    // Mobile
                    375: { slidesPerView: 3.3, spaceBetween: 10 },
                    420: { slidesPerView: 3.3, spaceBetween: 10 },

                    //Tablet & Desktop
                    768: { slidesPerView: 4, slidesPerGroup: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 5, slidesPerGroup: 3, spaceBetween: 20 },
                    1200: { slidesPerView: 6, slidesPerGroup: 3, spaceBetween: 20 },
                    1400: { slidesPerView: 6, slidesPerGroup: 4, spaceBetween: 20 },
                }}
                className="main-swiper-container"
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index} className="custom-swiper-slide">
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselView;
