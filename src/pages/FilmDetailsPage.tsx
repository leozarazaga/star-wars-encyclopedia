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
    const nagivate = useNavigate();

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
        <Container className="mt-4">
            <Card className="bg-dark text-light">
                <Row>
                    <Col md={4}>
                        <Card.Img
                            src={movie.image_url}
                            alt={movie.title}
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
                            <Card.Title className="fs-3">
                                Star Wars: Episode {movie.episode_id} - {movie.title}
                            </Card.Title>
                            <p className="mt-3 mb-2">Director: {movie.director}</p>
                            <p className="mb-2">Producer: {movie.producer}</p>
                            <p className="mb-2">Release Date: {movie.release_date}</p>

                            <hr className="bg-secondary mt-4" />

                            <p className=" my-4 lh-lg">{movie.opening_crawl}</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Card className="bg-dark text-light mt-4 p-3">
                <h4 className="text-light">Characters</h4>
                <div className="mb-3">
                    {movie.characters.map((character) => (
                        <Link to={`/people/${character.id}`} key={character.id}>
                            <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                {character.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <h4 className="text-light">Planets</h4>
                <div className="mb-3">
                    {movie.planets.map((planet) => (
                        <Link to={`/planets/${planet.id}`} key={planet.id}>
                            <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                {planet.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <h4 className="text-light">Starships</h4>
                <div className="mb-3">
                    {movie.starships.map((starship) => (
                        <Link to={`/starships/${starship.id}`} key={starship.id}>
                            <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                {starship.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <h4 className="text-light">Vehicles</h4>
                <div className="mb-3">
                    {movie.vehicles.map((vehicle) => (
                        <Link to={`/vehicles/${vehicle.id}`} key={vehicle.id}>
                            <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                {vehicle.name}
                            </span>
                        </Link>
                    ))}
                </div>

                <h4 className="text-light">Species</h4>
                <div className="mb-3">
                    {movie.species.map((specie) => (
                        <Link to={`/species/${specie.id}`} key={specie.id}>
                            <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                {specie.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </Card>
            <button className="pagination-btn my-4" onClick={() => nagivate(-1)}>
                Back
            </button>
        </Container>
    );
};

export default FilmDetailsPage;
