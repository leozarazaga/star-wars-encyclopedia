import { useEffect, useState } from "react";
import type { Specie } from "../../types/StarWarsAPI.types";
import { getSpecies } from "../../services/StarWarsAPI";
import { Container } from "react-bootstrap";
import CarouselView from "./CarouselView";
import { Link } from "react-router";
import { speciesImages } from "../../data/speciesImages";
import SectionTitle from "./SectionCarouselTitle";
import LoadingCarouselSpinner from "./LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";

const SpeciesCarousel = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [species, setSpecies] = useState<Specie[] | null>(null);

    const getStarWarsSpecies = async () => {
        setError(false);
        setIsLoading(true);
        setSpecies(null);

        try {
            const maxPeopleToShow = 15;
            const allPeople: Specie[] = [];

            for (let i = 1; allPeople.length < maxPeopleToShow; i++) {
                const res = await getSpecies("", i);
                allPeople.push(...res.data);

                if (i >= res.last_page) {
                    break;
                }
            }

            setSpecies(allPeople);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsSpecies();
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Container className="mt-5">
            <SectionTitle title="Species" linkTo="/species" />
            {!species && isLoading && <LoadingCarouselSpinner />}

            {species && (
                <CarouselView>
                    {species.map((specie) => (
                        <div className="carousel-card" key={specie.id}>
                            <Link to={`/species/${specie.id}`} className="poster-container">
                                <img src={speciesImages[specie.id]} className="poster-glow" aria-hidden="true" alt="" />
                                <img src={speciesImages[specie.id]} className="poster-main" alt={specie.name} title={specie.name} />
                            </Link>
                            <p>{specie.name}</p>
                        </div>
                    ))}
                </CarouselView>
            )}
        </Container>
    );
};

export default SpeciesCarousel;
