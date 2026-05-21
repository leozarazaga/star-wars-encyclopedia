import { useEffect, useState } from "react";
import type { Planet } from "../../types/StarWarsAPI.types";
import { getPlanets } from "../../services/StarWarsAPI";
import { Container } from "react-bootstrap";
import CarouselView from "./CarouselView";
import { Link } from "react-router";
import { planetsImages } from "../../data/planetsImages";
import SectionTitle from "./SectionCarouselTitle";
import LoadingCarouselSpinner from "./LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";

const PlanetsCarousel = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [planets, setPlanets] = useState<Planet[] | null>(null);

    const getStarWarsPlanets = async () => {
        setError(false);
        setIsLoading(true);
        setPlanets(null);

        try {
            const res = await getPlanets("", 1);
            setPlanets(res.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPlanets();
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Container className="mt-4">
            <SectionTitle title="Planets" linkTo="/planets" />
            {!planets && isLoading && <LoadingCarouselSpinner />}

            {planets && (
                <CarouselView>
                    {planets.map((planet) => (
                        <div className="carousel-card" key={planet.id}>
                            <Link to={`/planets/${planet.id}`} className="poster-container">
                                <img src={planetsImages[planet.id]} className="poster-glow" aria-hidden="true" alt="" />
                                <img src={planetsImages[planet.id]} className="poster-main" alt={planet.name} title={planet.name} />
                            </Link>
                            <p>{planet.name}</p>
                        </div>
                    ))}
                </CarouselView>
            )}
        </Container>
    );
};

export default PlanetsCarousel;
