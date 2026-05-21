import { useEffect, useState } from "react";
import { getPeople } from "../../services/StarWarsAPI";
import { Container } from "react-bootstrap";
import type { People } from "../../types/StarWarsAPI.types";
import CarouselView from "./CarouselView";
import { Link } from "react-router";
import SectionTitle from "./SectionCarouselTitle";
import LoadingCarouselSpinner from "./LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";

const PeopleCarousel = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [peoples, setPeoples] = useState<People[] | null>(null);

    const getStarWarsPeople = async () => {
        try {
            setError(false);
            setIsLoading(true);
            setPeoples(null);

            const maxPeopleToShow = 15;
            const allPeople: People[] = [];

            for (let i = 1; allPeople.length < maxPeopleToShow; i++) {
                const res = await getPeople("", i);
                allPeople.push(...res.data);

                if (i >= res.last_page) {
                    break;
                }
            }

            setPeoples(allPeople);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPeople();
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <>
            <Container className="mt-4">
                <SectionTitle title="Characters" linkTo="/people" />

                {!peoples && isLoading && <LoadingCarouselSpinner />}

                {peoples && (
                    <CarouselView>
                        {peoples.map((people) => (
                            <div className="carousel-card" key={people.id}>
                                <Link to={`/people/${people.id}`}>
                                    <img src={people.image_url} className="poster-glow" aria-hidden="true" alt="" />
                                    <img src={people.image_url} className="poster-main" alt={people.name} title={people.name} />
                                </Link>
                                <p >{people.name}</p>
                            </div>
                        ))}
                    </CarouselView>
                )}
            </Container>
        </>
    );
};

export default PeopleCarousel;
