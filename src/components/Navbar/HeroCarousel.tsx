import { Carousel, Container } from "react-bootstrap";

import andor from "../../assets/images/navbar/andor.png";
import obiWanIMG from "../../assets/images/navbar/obi-wan.png";
import revengeOfTheSithIMG from "../../assets/images/navbar/revenge-sith.png";

const andorArticleLink = "https://www.independent.co.uk/arts-entertainment/tv/news/andor-season-two-imdb-rating-b2752366.html";
const obiWanArticleLink = "https://www.imdb.com/title/tt8466564/";
const revengeOfSithArticleLink = "https://www.starwars.com/news/revenge-of-the-sith-20th-anniversary-theatrical-release";

const HeroCarousel = () => {
    return (
        <Container>
            <Carousel fade className="hero-carousel">
                <Carousel.Item>
                    <div className="hero-carousel-wrapper">
                        <img className="hero-carousel-image" src={andor} alt="Cassian Andor Poster" />
                        <Carousel.Caption className="hero-carousel-caption">
                            <h1 className="hero-title">Andor</h1>
                            <p className="hero-description">Before hope, there was betrayal.</p>
                            <a href={andorArticleLink} target="_blank" rel="noopener noreferrer" className="hero-read-more-btn">
                                READ MORE
                            </a>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="hero-carousel-wrapper">
                        <img className="hero-carousel-image" src={obiWanIMG} alt="Obi-wan Kenobi Series Poster" />
                        <Carousel.Caption className="hero-carousel-caption">
                            <h1 className="hero-title">The Last Hope</h1>
                            <p className="hero-description">Obi-Wan watches over young Luke.</p>
                            <a href={obiWanArticleLink} target="_blank" rel="noopener noreferrer" className="hero-read-more-btn">
                                READ MORE
                            </a>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="hero-carousel-wrapper">
                        <img className="hero-carousel-image" src={revengeOfTheSithIMG} alt="Revenge Of The Sith Movie Poster" />
                        <Carousel.Caption className="hero-carousel-caption">
                            <h1 className="hero-title">Two decades later</h1>
                            <p className="hero-description">Episode III returns to theaters.</p>
                            <a href={revengeOfSithArticleLink} target="_blank" rel="noopener noreferrer" className="hero-read-more-btn">
                                READ MORE
                            </a>
                        </Carousel.Caption>
                    </div>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default HeroCarousel;
