import { useEffect, useState } from "react";
import { getPeoplebyId } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { People } from "../types/StarWarsAPI.types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const PeopleDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [people, setPeople] = useState<People | null>(null);
    const nagivate = useNavigate();

    const { id } = useParams();
    const peopleId = Number(id);

    const getStarWarsPeople = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setPeople(null);

        try {
            const res = await getPeoplebyId(id);
            setPeople(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPeople(peopleId);
    }, [peopleId]);

    // Update document title
    useEffect(() => {
        if (!people) return;

        document.title = `Character | ${people.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [people]);


    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!people || isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="mt-4">
            <Card className="bg-dark text-light ">
                <Row>
                    <Col md={4}>
                        <Card.Img
                            src={people.image_url}
                            alt={people.name}
                            style={{
                                objectFit: "cover",
                                height: "100%",
                                width: "100%",
                                cursor: "default",
                            }}
                        />
                    </Col>

                    <Col md={6}>
                        <Card.Body>
                            <Card.Title className="fs-3">{people.name}</Card.Title>
                            <p className="mt-3 mb-2">Born: {people.birth_year}</p>
                            <p className="mb-2">Height: {people.height}</p>
                            <p className="mb-2">Homeworld: {people.homeworld.name}</p>
                            <p className="mb-2">Eye Color: {people.eye_color}</p>
                            <p className="mb-2">Hair Color: {people.hair_color}</p>
                            <p className="mb-2">
                                Wiki Link:{" "}
                                <a href={people.wiki_link} target="_blank">
                                    {" "}
                                    {people.wiki_link}
                                </a>
                            </p>
                            <p className="mb-2">Affiliations: {people.affiliations.join(", ")}</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Card className="bg-dark text-light mt-4 p-3">
                <h4 className="text-light">Films</h4>
                <div className="mb-3">
                    {people.films.map((film) => (
                        <Link to={`/films/${film.id}`} key={film.id} className="text-white text-decoration-none">
                            <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                {film.title}
                            </span>
                        </Link>
                    ))}
                </div>

                {people.species.length > 0 && (
                    <>
                        <h4 className="text-light">Species</h4>
                        <div className="mb-3">
                            {people.species.map((specie) => (
                                <Link to={`/species/${specie.id}`} key={specie.id}>
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {specie.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {people.starships.length > 0 && (
                    <>
                        <h4 className="text-light">Starships</h4>
                        <div className="mb-3">
                            {people.starships.map((starship) => (
                                <Link to={`/starships/${starship.id}`} key={starship.id}>
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {starship.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {people.vehicles.length > 0 && (
                    <>
                        <h4 className="text-light">Vehicles</h4>
                        <div className="mb-3">
                            {people.vehicles.map((vehicle) => (
                                <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {vehicle.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                <h4 className="text-light">Homeworld</h4>
                <div className="mb-3">
                    <Link to={`/planets/${people.homeworld.id}`} key={people.homeworld.id}>
                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                            {people.homeworld.name}
                        </span>
                    </Link>
                </div>
            </Card>

            <button className="pagination-btn my-4" onClick={() => nagivate(-1)}>
                Back
            </button>
        </Container>
    );
};

export default PeopleDetailsPage;
