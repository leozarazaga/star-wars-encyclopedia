import { Link } from "react-router";

interface SectionCarouselTitleProps {
    title: string;
    linkTo: string;
}

const SectionCarouselTitle: React.FC<SectionCarouselTitleProps> = ({ title, linkTo }) => {
    return (
        <section className="d-flex justify-content-between align-items-center px-3">
            <Link to={linkTo} style={{ textDecoration: "none" }}>
                <h1 className="section-carousel-category-title">
                    {title}
                </h1>
            </Link>

            <Link to={linkTo} className="section-carousel-explore-all">
                <h5>Explore All</h5>
            </Link>
        </section>
    );
};

export default SectionCarouselTitle;
