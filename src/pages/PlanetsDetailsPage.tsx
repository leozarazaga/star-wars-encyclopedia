import { useEffect, useState } from "react";
import { getPlanetbyId } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { Planet } from "../types/StarWarsAPI.types";
import { planetsImages } from "../data/planetsImages";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const PlanetsDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [planets, setPlanets] = useState<Planet | null>(null);
    const nagivate = useNavigate();
    const { id } = useParams();
    const planetId = Number(id);

    const getStarWarsPlanets = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setPlanets(null);

        try {
            const res = await getPlanetbyId(id);
            setPlanets(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPlanets(planetId);
    }, [planetId]);

    // Update document title
    useEffect(() => {
        if (!planets) return;

        document.title = `Planet | ${planets.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [planets]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!planets || isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="mt-4">
            <Card className="bg-dark text-light ">
                <Row>
                    <Col md={4}>
                        <Card.Img
                            src={planetsImages[planets.id]}
                            alt={planets.name}
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
                            <Card.Title className="fs-3">{planets.name}</Card.Title>
                            <p className="mt-3 mb-2">Population: {planets.population}</p>
                            <p className="mt-3 mb-2">Rotation Period: {planets.rotation_period}</p>
                            <p className="mb-2">Orbital Period: {planets.orbital_period}</p>
                            <p className="mb-2">Diameter: {planets.diameter}</p>
                            <p className="mb-2">Climate: {planets.climate}</p>
                            <p className="mb-2">Gravity: {planets.gravity}</p>
                            <p className="mb-2">Terrain: {planets.terrain}</p>
                            <p className="mb-2">Surface Water: {planets.surface_water}</p>
                            {planets.films_count > 0 && <p className="mb-2">Films Count: {planets.films_count}</p>}
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Card className="bg-dark text-light mt-4 p-3">
                {planets.residents.length > 0 && (
                    <>
                        <h4 className="text-light">Residents</h4>
                        <div className="mb-3">
                            {planets.residents.map((resident) => (
                                <Link to={`/people/${resident.id}`} key={resident.id} className="text-white text-decoration-none">
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {resident.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {planets.films.length > 0 && (
                    <>
                        <h4 className="text-light">Films</h4>
                        <div className="mb-3">
                            {planets.films.map((planet) => (
                                <Link to={`/films/${planet.id}`} key={planet.id} className="text-white text-decoration-none">
                                    <span key={planet.id} className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {planet.title}
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

export default PlanetsDetailsPage;
