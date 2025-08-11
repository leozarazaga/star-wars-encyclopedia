import { useEffect, useState } from "react";
import { getSpecieById } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { Specie } from "../types/StarWarsAPI.types";
import { speciesImages } from "../data/speciesImages";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const SpeciesDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [species, setSpecies] = useState<Specie | null>(null);
    const nagivate = useNavigate();

    const { id } = useParams();
    const speciesId = Number(id);

    const getStarWarsPlanets = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setSpecies(null);

        try {
            const res = await getSpecieById(id);
            setSpecies(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPlanets(speciesId);
    }, [speciesId]);

    // Update document title
    useEffect(() => {
        if (!species) return;

        document.title = `Species | ${species.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [species]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!species || isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="mt-4">
            <Card className="bg-dark text-light ">
                <Row>
                    <Col md={4}>
                        <Card.Img
                            src={speciesImages[species.id]}
                            alt={species.name}
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
                            <Card.Title className="fs-3">{species.name}</Card.Title>
                            <p className="mt-3 mb-2">Classification: {species.classification}</p>
                            <p className="mb-2">Designation: {species.designation}</p>
                            <p className="mb-2">Average Height: {species.average_height}</p>
                            <p className="mb-2">Average Lifespan: {species.average_lifespan}</p>
                            <p className="mb-2">Eye Colors: {species.eye_colors}</p>
                            <p className="mb-2">Hair Colors: {species.hair_colors}</p>
                            <p className="mb-2">Skin Colors: {species.skin_colors}</p>
                            <p className="mb-2">Language: {species.language}</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Card className="bg-dark text-light mt-4 p-3">
                {species.people.length > 0 && (
                    <>
                        <h4 className="text-light">People</h4>
                        <div className="mb-3">
                            {species.people.map((planet) => (
                                <Link to={`/people/${planet.id}`} key={planet.id} className="text-white text-decoration-none">
                                    <span key={planet.id} className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {planet.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {species.homeworld && (
                    <>
                        <h4 className="text-light">Homeworld</h4>
                        <div className="mb-3">
                            <Link to={`/planets/${species.homeworld.id}`} className="text-white text-decoration-none">
                                <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                    {species.homeworld.name}
                                </span>
                            </Link>
                        </div>
                    </>
                )}

                {species.films.length > 0 && (
                    <>
                        <h4 className="text-light">Films</h4>
                        <div className="mb-3">
                            {species.films.map((film) => (
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

export default SpeciesDetailsPage;
