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
    const navigate = useNavigate();

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

    const isKnownValue = (value: string | undefined | null) => {
        if (!value) return false;
        return value !== "n/a" && value !== "none" && value !== "unknown";
    };

    const hasKnownSpecs =
        isKnownValue(starship.length) ||
        isKnownValue(starship.crew) ||
        isKnownValue(starship.max_atmosphering_speed) ||
        isKnownValue(starship.hyperdrive_rating);

    return (
        <>
            {/* ========== TOP SECTION ========== */}
            <div className="movie-details-backdrop-container">
                <img src={StarshipImages[starship.id]} alt={`${starship.name} Backdrop`} className="movie-details-backdrop-image" />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            {/* LEFT COLUMN */}
                            <Col xs={12} md={4} lg={3} xl={3} className="mb-4 mb-md-0 d-flex justify-content-center justify-content-md-end">
                                <Card className="movie-card-details-page shadow-sm" style={{ maxWidth: "320px", background: "transparent" }}>
                                    <Card.Img
                                        src={StarshipImages[starship.id]}
                                        alt={starship.name}
                                        style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                                    />
                                </Card>
                            </Col>

                            {/* RIGHT COLUMN */}
                            <Col xs={12} md={8} lg={9} xl={8} className="text-light px-md-4 px-lg-5">
                                <h2 className="fw-bold mb-1 text-white">{starship.name}</h2>

                                <div className="text-light mb-4 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
                                    <span className="border border-secondary text-secondary px-2 rounded-1 text-uppercase">
                                        {starship.starship_class}
                                    </span>
                                    {isKnownValue(starship.model) && (
                                        <>
                                            <span>•</span>
                                            <span className="text-secondary text-capitalize">{starship.model}</span>
                                        </>
                                    )}
                                </div>

                                <h5 className="text-light fw-bold mt-4">Overview</h5>
                                <p className="text-light lh-lg mb-3" style={{ fontSize: "1.05rem" }}>
                                    {starship.short_description || "No description available for this starship."}
                                </p>

                                {isKnownValue(starship.manufacturer) && (
                                    <p className="text-secondary mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                                        <span className="fw-bold text-light">Manufacturer:</span> {starship.manufacturer}
                                    </p>
                                )}

                                {hasKnownSpecs && (
                                    <Row className="mt-4 pt-3 border-top border-secondary gy-3">
                                        {isKnownValue(starship.length) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{starship.length}</p>
                                                <small className="text-secondary">Length (m)</small>
                                            </Col>
                                        )}

                                        {isKnownValue(starship.crew) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{starship.crew}</p>
                                                <small className="text-secondary">Crew</small>
                                            </Col>
                                        )}

                                        {isKnownValue(starship.passengers) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{starship.passengers}</p>
                                                <small className="text-secondary">Passengers</small>
                                            </Col>
                                        )}

                                        {isKnownValue(starship.max_atmosphering_speed) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{starship.max_atmosphering_speed}</p>
                                                <small className="text-secondary">Max Speed</small>
                                            </Col>
                                        )}

                                        {isKnownValue(starship.hyperdrive_rating) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{starship.hyperdrive_rating}</p>
                                                <small className="text-secondary">Hyperdrive</small>
                                            </Col>
                                        )}
                                    </Row>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>

            {/* ========== BOTTOM SECTION ========== */}
            <Container className="mt-5 px-0">
                <Card className="bg-dark text-light p-4 border-secondary shadow">
                    {starship.pilots.length > 0 && (
                        <>
                            <h4 className="text-light">Known Pilots</h4>
                            <div className="mb-4">
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
                            <div className="mb-2">
                                {starship.films.map((film) => (
                                    <Link to={`/films/${film.id}`} key={film.id} className="text-white text-decoration-none">
                                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {film.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </Card>

                <button className="pagination-btn my-4" onClick={() => navigate(-1)}>
                    Back
                </button>
            </Container>
        </>
    );
};

export default StarshipsDetailsPage;
