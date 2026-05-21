import { useEffect, useState } from "react";
import type { Film } from "../types/StarWarsAPI.types";
import { getFilmById } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const FilmDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState<Film | null>(null);
    const navigate = useNavigate();

    const { id } = useParams();
    const filmId = Number(id);

    const getStarWarsFilm = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setMovie(null);

        try {
            const res = await getFilmById(id);
            setMovie(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsFilm(filmId);
    }, [filmId]);

    // Update document title
    useEffect(() => {
        if (!movie) return;

        document.title = `Film | ${movie.title}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [movie]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!movie || isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {/* ========== TOP SECTION ========== */}
            <div className="movie-details-backdrop-container">
                <img src={movie.image_url} alt={`${movie.title} Backdrop`} className="movie-details-backdrop-image" />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            {/* LEFT COLUMN */}
                            <Col xs={12} md={4} lg={3} xl={3} className="mb-4 mb-md-0 d-flex justify-content-center justify-content-md-end">
                                <Card className="movie-card-details-page shadow-sm" style={{ maxWidth: "320px", background: "transparent" }}>
                                    <Card.Img src={movie.image_url} alt={movie.title} style={{ aspectRatio: "2 / 3", objectFit: "cover" }} />
                                </Card>
                            </Col>

                            {/* RIGHT COLUMN */}
                            <Col xs={12} md={8} lg={9} xl={8} className="text-light px-md-4 px-lg-5">
                                <h2 className="fw-bold mb-1 text-white">
                                    {movie.title} <span className="fw-light text-secondary">({movie.release_date.substring(0, 4)})</span>
                                </h2>

                                <div className="text-light mb-3 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: "0.9rem" }}>
                                    <span className="border border-secondary text-secondary px-2 rounded-1">EPISODE {movie.episode_id}</span>
                                    <span>•</span>
                                    <span className="text-secondary">{movie.release_date}</span>
                                </div>

                                <p className="fst-italic text-secondary mb-3 fs-6">A long time ago in a galaxy far, far away...</p>

                                <h5 className="text-light fw-bold mt-4">Overview</h5>
                                <p className="text-light lh-lg mb-4" style={{ fontSize: "0.8rem" }}>
                                    {movie.short_description}
                                </p>

                                <Row className="mt-4 pt-3 border-top border-secondary">
                                    <Col xs={6} md={4}>
                                        <p className="mb-0 fw-bold text-light ">{movie.director}</p>
                                        <small className="text-secondary">Director</small>
                                    </Col>
                                    <Col xs={6} md={8}>
                                        <p className="mb-0 fw-bold text-light">{movie.producer}</p>
                                        <small className="text-secondary">Producer</small>
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
                    <h4 className="text-light">Characters</h4>
                    <div className="mb-4">
                        {movie.characters.map((character) => (
                            <Link to={`/people/${character.id}`} key={character.id}>
                                <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                    {character.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <h4 className="text-light">Planets</h4>
                    <div className="mb-4">
                        {movie.planets.map((planet) => (
                            <Link to={`/planets/${planet.id}`} key={planet.id}>
                                <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                    {planet.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <h4 className="text-light">Starships</h4>
                    <div className="mb-4">
                        {movie.starships.map((starship) => (
                            <Link to={`/starships/${starship.id}`} key={starship.id}>
                                <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                    {starship.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <h4 className="text-light">Vehicles</h4>
                    <div className="mb-4">
                        {movie.vehicles.map((vehicle) => (
                            <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                                <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                    {vehicle.name}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <h4 className="text-light">Species</h4>
                    <div className="mb-2">
                        {movie.species.map((specie) => (
                            <Link to={`/species/${specie.id}`} key={specie.id}>
                                <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                    {specie.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </Card>

                <button className="pagination-btn my-4" onClick={() => navigate(-1)}>
                    Back
                </button>
            </Container>
        </>
    );
};

export default FilmDetailsPage;
