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
    const navigate = useNavigate();

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
        <>
            {/* ========== TOP SECTION ========== */}
            <div className="movie-details-backdrop-container">
                <img src={people.image_url} alt={`${people.name} Backdrop`} className="movie-details-backdrop-image" />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            {/* LEFT COLUMN */}
                            <Col xs={12} md={4} lg={3} xl={3} className="mb-4 mb-md-0 d-flex justify-content-center justify-content-md-end">
                                <Card className="movie-card-details-page shadow-sm" style={{ maxWidth: "320px", background: "transparent" }}>
                                    <Card.Img src={people.image_url} alt={people.name} style={{ aspectRatio: "2 / 3", objectFit: "cover" }} />
                                </Card>
                            </Col>

                            {/* RIGHT COLUMN */}
                            <Col xs={12} md={8} lg={9} xl={8} className="text-light px-md-4 px-lg-5">
                                <h2 className="fw-bold mb-1 text-white">{people.name}</h2>

                                <div className="text-light mb-4 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
                                    <span className="border border-secondary text-secondary px-2 rounded-1">BORN {people.birth_year}</span>
                                    <span>•</span>
                                    <Link to={`/planets/${people.homeworld.id}`} className="text-secondary text-decoration-none hover-white">
                                        {people.homeworld.name}
                                    </Link>
                                </div>

                                <h5 className="text-light fw-bold mt-4">Overview</h5>
                                <p className="text-light lh-lg mb-3" style={{ fontSize: "1.05rem" }}>
                                    {people.short_description || "No description available."}
                                </p>

                                {people.affiliations && people.affiliations.length > 0 && (
                                    <p className="text-secondary mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                                        <span className="fw-bold text-light">Affiliations:</span> {people.affiliations.join(", ")}
                                    </p>
                                )}

                                <Row className="mt-4 pt-3 border-top border-secondary gy-3">
                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light">{people.height} cm</p>
                                        <small className="text-secondary">Height</small>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light text-capitalize">{people.hair_color}</p>
                                        <small className="text-secondary">Hair</small>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <p className="mb-0 fw-bold text-light text-capitalize">{people.lightsaber_color}</p>
                                        <small className="text-secondary">Lightsaber</small>
                                    </Col>

                                    <Col xs={6} md={3}>
                                        <p className="mb-0">
                                            <a href={people.wiki_link} target="_blank" rel="noreferrer" className="text-info text-decoration-none">
                                                Read More {">"}
                                            </a>
                                        </p>
                                        <small className="text-secondary">Wookieepedia</small>
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
                    {people.films.length > 0 && (
                        <>
                            <h4 className="text-light">Films</h4>
                            <div className="mb-4">
                                {people.films.map((film) => (
                                    <Link to={`/films/${film.id}`} key={film.id}>
                                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {film.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {people.species.length > 0 && (
                        <>
                            <h4 className="text-light">Species</h4>
                            <div className="mb-4">
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
                            <div className="mb-4">
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
                            <div className="mb-2">
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
                </Card>

                <button className="pagination-btn my-4" onClick={() => navigate(-1)}>
                    Back
                </button>
            </Container>
        </>
    );
};

export default PeopleDetailsPage;
