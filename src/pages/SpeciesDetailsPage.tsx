import { useEffect, useState } from "react";
import { getSpecieById } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { Species } from "../types/StarWarsAPI.types";
import { speciesImages } from "../data/speciesImages";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const SpeciesDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [species, setSpecies] = useState<Species | null>(null);
    const navigate = useNavigate();

    const { id } = useParams();
    const speciesId = Number(id);

    const getStarWarsSpecies = async (id: number) => {
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
        getStarWarsSpecies(speciesId);
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

    const isKnownValue = (value: string | undefined | null) => {
        if (!value) return false;
        return value !== "n/a" && value !== "none" && value !== "unknown";
    };

    const hasKnownTraits =
        isKnownValue(species.average_height) ||
        isKnownValue(species.eye_colors) ||
        isKnownValue(species.hair_colors) ||
        isKnownValue(species.skin_colors);

    return (
        <>
            {/* ========== TOP SECTION ========== */}
            <div className="movie-details-backdrop-container">
                <img src={speciesImages[species.id]} alt={`${species.name} Backdrop`} className="movie-details-backdrop-image" />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            {/* LEFT COLUMN */}
                            <Col xs={12} md={4} lg={3} xl={3} className="mb-4 mb-md-0 d-flex justify-content-center justify-content-md-end">
                                <Card className="movie-card-details-page shadow-sm" style={{ maxWidth: "320px", background: "transparent" }}>
                                    <Card.Img
                                        src={speciesImages[species.id]}
                                        alt={species.name}
                                        style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                                    />
                                </Card>
                            </Col>

                            {/* RIGHT COLUMN */}
                            <Col xs={12} md={8} lg={9} xl={8} className="text-light px-md-4 px-lg-5">
                                <h2 className="fw-bold mb-1 text-white">{species.name}</h2>

                                <div className="text-light mb-4 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
                                    <span className="border border-secondary text-secondary px-2 rounded-1 text-uppercase">
                                        {species.classification}
                                    </span>
                                    <span>•</span>
                                    <span className="text-secondary text-capitalize">{species.designation}</span>

                                    {isKnownValue(species.language) && (
                                        <>
                                            <span>•</span>
                                            <span className="text-secondary">Speaks {species.language}</span>
                                        </>
                                    )}
                                </div>

                                <h5 className="text-light fw-bold mt-4">Overview</h5>
                                <p className="text-light lh-lg mb-4" style={{ fontSize: "1.05rem" }}>
                                    {species.short_description || "No description available for this species."}
                                </p>

                                {hasKnownTraits && (
                                    <Row className="mt-4 pt-3 border-top border-secondary gy-3">
                                        {isKnownValue(species.average_height) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{species.average_height} cm</p>
                                                <small className="text-secondary">Avg Height</small>
                                            </Col>
                                        )}

                                        {isKnownValue(species.eye_colors) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light text-capitalize">{species.eye_colors}</p>
                                                <small className="text-secondary">Eye Colors</small>
                                            </Col>
                                        )}

                                        {isKnownValue(species.hair_colors) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light text-capitalize">{species.hair_colors}</p>
                                                <small className="text-secondary">Hair Colors</small>
                                            </Col>
                                        )}

                                        {isKnownValue(species.skin_colors) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light text-capitalize">{species.skin_colors}</p>
                                                <small className="text-secondary">Skin Colors</small>
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
                    {species.homeworld && (
                        <>
                            <h4 className="text-light">Homeworld</h4>
                            <div className="mb-4">
                                <Link to={`/planets/${species.homeworld.id}`} className="text-white text-decoration-none">
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {species.homeworld.name}
                                    </span>
                                </Link>
                            </div>
                        </>
                    )}

                    {species.people.length > 0 && (
                        <>
                            <h4 className="text-light">Members</h4>
                            <div className="mb-4">
                                {species.people.map((person) => (
                                    <Link to={`/people/${person.id}`} key={person.id} className="text-white text-decoration-none">
                                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {person.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {species.films.length > 0 && (
                        <>
                            <h4 className="text-light">Films</h4>
                            <div className="mb-2">
                                {species.films.map((film) => (
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

export default SpeciesDetailsPage;
