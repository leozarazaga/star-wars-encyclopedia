import { useEffect, useState } from "react";
import type { Starship } from "../../types/StarWarsAPI.types";
import { getStarships } from "../../services/StarWarsAPI";
import { Container } from "react-bootstrap";
import CarouselView from "./CarouselView";
import { Link } from "react-router";
import { StarshipImages } from "../../data/starships";
import SectionTitle from "./SectionCarouselTitle";
import LoadingCarouselSpinner from "./LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";

const StarshipsCarousel = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [starships, setStarships] = useState<Starship[] | null>(null);

    const getStarWarsStarships = async () => {
        setError(false);
        setIsLoading(true);
        setStarships(null);

        try {
            const res = await getStarships("", 1);
            setStarships(res.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsStarships();
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Container className="mt-4">
            <SectionTitle title="Starships" linkTo="/starships" />
            {!starships && isLoading && <LoadingCarouselSpinner />}

            {starships && (
                <CarouselView>
                    {starships.map((starship) => (
                        <div className="carousel-card" key={starship.id}>
                            <Link to={`/starships/${starship.id}`} className="poster-container">
                                <img src={StarshipImages[starship.id]} className="poster-glow" aria-hidden="true" alt="" />
                                <img src={StarshipImages[starship.id]} className="poster-main" alt={starship.name} title={starship.name} />
                            </Link>
                            <p>{starship.name}</p>
                        </div>
                    ))}
                </CarouselView>
            )}
        </Container>
    );
};

export default StarshipsCarousel;
