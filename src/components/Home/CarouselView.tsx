import type React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1400 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 1400, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 4,
    },
    mobileLarge: {
        breakpoint: { max: 768, min: 420 },
        items: 3,
    },
    mobileSmall: {
        breakpoint: { max: 420, min: 0 },
        items: 3,
    },
};

type CarouselViewProps = {
    children: React.ReactNode;
};

const CarouselView: React.FC<CarouselViewProps> = ({ children }) => {
    return (
        <div className="carousel-wrapper">
            <Carousel
                swipeable={true}
                responsive={responsive}
                showDots={true}
                infinite={false}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item"
                slidesToSlide={4}
                removeArrowOnDeviceType={["tablet", "mobileLarge", "mobileSmall"]}
            >
                {children}
            </Carousel>
        </div>
    );
};

export default CarouselView;
