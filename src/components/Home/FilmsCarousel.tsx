import { useState, useEffect } from "react";
import { getFilms } from "../../services/StarWarsAPI";
import type { Film } from "../../types/StarWarsAPI.types";
import { Container } from "react-bootstrap";

import CarouselView from "./CarouselView";
import { Link } from "react-router";
import SectionTitle from "./SectionCarouselTitle";
import LoadingCarouselSpinner from "./LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";

const FilmsCarousel = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState<Film[] | null>(null);

    const getStarWarsFilms = async () => {
        try {
            setError(false);
            setIsLoading(true);
            setMovies(null);

            const res = await getFilms("", 1);
            setMovies(res.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsFilms();
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Container className="mt-5">
            <SectionTitle title={"Films"} linkTo="/films" />
            {!movies && isLoading && <LoadingCarouselSpinner />}

            {movies && (
                <CarouselView>
                    {movies.map((movie) => (
                        <div className="carousel-card" key={movie.id}>
                            <Link to={`/films/${movie.id}`}>
                                <img src={movie.image_url} alt={movie.title} title={movie.title} />
                            </Link>
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </CarouselView>
            )}
        </Container>
    );
};

export default FilmsCarousel;
