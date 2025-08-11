import { useEffect, useState } from "react";
import { getStarshipById } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { Starship } from "../types/StarWarsAPI.types";
import { StarshipImages } from "../data/starships";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const StarshipsDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [starship, setStarship] = useState<Starship | null>(null);
    const nagivate = useNavigate();

    const { id } = useParams();
    const starshipId = Number(id);

    const getStarWarsStarships = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setStarship(null);

        try {
            const res = await getStarshipById(id);
            setStarship(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsStarships(starshipId);
    }, [starshipId]);


    // Update document title
    useEffect(() => {
        if (!starship) return;

        document.title = `Starship | ${starship.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [starship]);

    
    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!starship || isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="mt-4">
            <Card className="bg-dark text-light ">
                <Row>
                    <Col md={4}>
                        <Card.Img
                            src={StarshipImages[starship.id]}
                            alt={starship.name}
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
                            <Card.Title className="fs-3">{starship.name}</Card.Title>
                            <p className="mt-3 mb-2">Model: {starship.model}</p>
                            <p className="mb-2">Class: {starship.starship_class}</p>
                            <p className="mb-2">Manufacturer: {starship.manufacturer}</p>
                            <p className="mb-2">Cost in Credits: {starship.cost_in_credits}</p>
                            <p className="mb-2">Length: {starship.length}</p>
                            <p className="mb-2">Crew: {starship.crew}</p>
                            <p className="mb-2">Passengers: {starship.passengers}</p>
                            <p className="mb-2">Max Speed (Atmosphering): {starship.max_atmosphering_speed}</p>
                            <p className="mb-2">Hyperdrive Rating: {starship.hyperdrive_rating}</p>
                            <p className="mb-2">MGLT: {starship.MGLT}</p>
                            <p className="mb-2">Cargo Capacity: {starship.cargo_capacity}</p>
                            <p className="mb-2">Consumables: {starship.consumables}</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Card className="bg-dark text-light mt-4 p-3">
                {starship.pilots.length > 0 && (
                    <>
                        <h4 className="text-light">Pilots</h4>
                        <div className="mb-3">
                            {starship.pilots.map((pilot) => (
                                <Link to={`/people/${pilot.id}`} key={pilot.id} className="text-white text-decoration-none">
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {pilot.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {starship.films.length > 0 && (
                    <>
                        <h4 className="text-light">Films</h4>
                        <div className="mb-3">
                            {starship.films.map((film) => (
                                <Link to={`/films/${film.id}`} key={film.id} className="text-white text-decoration-none">
                                    <span key={film.id} className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {film.title}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </Card>

            <button className="pagination-btn my-4" onClick={() => nagivate(-1)}>
                Back
            </button>
        </Container>
    );
};

export default StarshipsDetailsPage;
