import { useEffect, useState } from "react";
import { getPlanetbyId } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { Planet } from "../types/StarWarsAPI.types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const PlanetsDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);

    // Changed state name to singular 'planet' for cleaner reading
    const [planet, setPlanet] = useState<Planet | null>(null);
    const navigate = useNavigate(); // Fixed typo from 'nagivate'

    const { id } = useParams();
    const planetId = Number(id);

    const getStarWarsPlanet = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setPlanet(null);

        try {
            const res = await getPlanetbyId(id);
            setPlanet(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPlanet(planetId);
    }, [planetId]);

    // Update document title
    useEffect(() => {
        if (!planet) return;

        document.title = `Planet | ${planet.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [planet]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!planet || isLoading) {
        return <LoadingSpinner />;
    }

    // Helper function to safely format numbers with units (prevents "unknown km")
    const formatValue = (val: string, unit: string) => {
        return val === "unknown" || val === "N/A" ? "Unknown" : `${val} ${unit}`;
    };

    return (
        <>
            {/* ========== TOP SECTION: Cinematic Backdrop ========== */}
            <div className="movie-details-backdrop-container">
                <img src={planet.image_url} alt={`${planet.name} Backdrop`} className="movie-details-backdrop-image" />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            {/* LEFT COLUMN: Poster */}
                            <Col xs={12} md={4} lg={3} xl={3} className="mb-4 mb-md-0 d-flex justify-content-center justify-content-md-end">
                                <Card className="movie-card-details-page shadow-sm" style={{ maxWidth: "320px", background: "transparent" }}>
                                    <Card.Img src={planet.image_url} alt={planet.name} style={{ aspectRatio: "2 / 3", objectFit: "cover" }} />
                                </Card>
                            </Col>

                            {/* RIGHT COLUMN: Planet Details */}
                            <Col xs={12} md={8} lg={9} xl={8} className="text-light px-md-4 px-lg-5">
                                <h2 className="fw-bold mb-1 text-white">{planet.name}</h2>

                                {/* Metadata Row */}
                                <div className="text-light mb-4 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
                                    <span className="border border-secondary text-secondary px-2 rounded-1 text-uppercase">
                                        POPULATION: {planet.population}
                                    </span>
                                    <span>•</span>
                                    <span className="text-secondary text-capitalize">{planet.climate} Climate</span>
                                </div>

                                {/* Overview & Short Description */}
                                <h5 className="text-light fw-bold mt-4">Overview</h5>
                                <p className="text-light lh-lg mb-3" style={{ fontSize: "1.05rem" }}>
                                    {planet.short_description || "No description available for this planet."}
                                </p>

                                <Row className="mt-4 pt-3 border-top border-secondary gy-3">
                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light">{formatValue(planet.diameter, "km")}</p>
                                        <small className="text-secondary">Diameter</small>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light">{formatValue(planet.rotation_period, "hrs")}</p>
                                        <small className="text-secondary">Rotation</small>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light">{formatValue(planet.orbital_period, "days")}</p>
                                        <small className="text-secondary">Orbit</small>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light text-capitalize">{planet.terrain}</p>
                                        <small className="text-secondary">Terrain</small>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>

            {/* ========== BOTTOM SECTION ========== */}
            <Container className="mt-5 px-0">
                <Card className="bg-dark text-light p-4 border-secondary shadow">
                    {planet.residents.length > 0 && (
                        <>
                            <h4 className="text-light">Residents</h4>
                            <div className="mb-4">
                                {planet.residents.map((resident) => (
                                    <Link to={`/people/${resident.id}`} key={resident.id}>
                                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {resident.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {planet.films.length > 0 && (
                        <>
                            <h4 className="text-light">Films</h4>
                            <div className="mb-2">
                                {planet.films.map((film) => (
                                    <Link to={`/films/${film.id}`} key={film.id}>
                                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {film.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Edge Case: Show message if no relationships exist */}
                    {planet.residents.length === 0 && planet.films.length === 0 && (
                        <p className="text-secondary mb-0">No recorded films or notable residents found in the archives for this planet.</p>
                    )}
                </Card>

                <button className="pagination-btn my-4" onClick={() => navigate(-1)}>
                    Back
                </button>
            </Container>
        </>
    );
};

export default PlanetsDetailsPage;
