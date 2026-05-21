import { useEffect, useState } from "react";
import { getVehicleById } from "../services/StarWarsAPI";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import type { Vehicle } from "../types/StarWarsAPI.types";
import { vehicleImages } from "../data/vehiclesImages";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const VehiclesDetailsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const navigate = useNavigate();

    const { id } = useParams();
    const vehicleId = Number(id);

    const getStarWarsVehicle = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setVehicle(null);

        try {
            const res = await getVehicleById(id);
            setVehicle(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsVehicle(vehicleId);
    }, [vehicleId]);

    // Update document title
    useEffect(() => {
        if (!vehicle) return;

        document.title = `Vehicle | ${vehicle.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [vehicle]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!vehicle || isLoading) {
        return <LoadingSpinner />;
    }

    const isKnownValue = (value: string | undefined | null) => {
        if (!value) return false;
        return value !== "n/a" && value !== "none" && value !== "unknown";
    };

    const hasKnownSpecs =
        isKnownValue(vehicle.length) ||
        isKnownValue(vehicle.crew) ||
        isKnownValue(vehicle.max_atmosphering_speed) ||
        isKnownValue(vehicle.passengers) ||
        isKnownValue(vehicle.cost_in_credits) ||
        isKnownValue(vehicle.cargo_capacity) ||
        isKnownValue(vehicle.consumables);

    return (
        <>
            {/* ========== TOP SECTION ========== */}
            <div className="movie-details-backdrop-container">
                <img src={vehicleImages[vehicle.id]} alt={`${vehicle.name} Backdrop`} className="movie-details-backdrop-image" />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-center justify-content-center">
                            {/* LEFT COLUMN */}
                            <Col xs={12} md={4} lg={3} xl={3} className="mb-4 mb-md-0 d-flex justify-content-center justify-content-md-end">
                                <Card className="movie-card-details-page shadow-sm" style={{ maxWidth: "320px", background: "transparent" }}>
                                    <Card.Img
                                        src={vehicleImages[vehicle.id]}
                                        alt={vehicle.name}
                                        style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                                    />
                                </Card>
                            </Col>

                            {/* RIGHT COLUMN */}
                            <Col xs={12} md={8} lg={9} xl={8} className="text-light px-md-4 px-lg-5">
                                <h2 className="fw-bold mb-1 text-white">{vehicle.name}</h2>

                                <div className="text-light mb-4 d-flex flex-wrap align-items-center gap-2" style={{ fontSize: "0.95rem" }}>
                                    <span className="border border-secondary text-secondary px-2 rounded-1 text-uppercase">
                                        {vehicle.vehicle_class}
                                    </span>
                                    {isKnownValue(vehicle.model) && (
                                        <>
                                            <span>•</span>
                                            <span className="text-secondary text-capitalize">{vehicle.model}</span>
                                        </>
                                    )}
                                </div>

                                <h5 className="text-light fw-bold mt-4">Overview</h5>
                                <p className="text-light lh-lg mb-3" style={{ fontSize: "1.05rem" }}>
                                    {vehicle.short_description || "No description available for this vehicle."}
                                </p>

                                {isKnownValue(vehicle.manufacturer) && (
                                    <p className="text-secondary mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                                        <span className="fw-bold text-light">Manufacturer:</span> {vehicle.manufacturer}
                                    </p>
                                )}

                                {hasKnownSpecs && (
                                    <Row className="mt-4 pt-3 border-top border-secondary gy-3">
                                        {isKnownValue(vehicle.length) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{vehicle.length}</p>
                                                <small className="text-secondary">Length (m)</small>
                                            </Col>
                                        )}

                                        {isKnownValue(vehicle.crew) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{vehicle.crew}</p>
                                                <small className="text-secondary">Crew</small>
                                            </Col>
                                        )}

                                        {isKnownValue(vehicle.max_atmosphering_speed) && (
                                            <Col xs={6} md={3}>
                                                <p className="mb-0 fw-bold text-light">{vehicle.max_atmosphering_speed}</p>
                                                <small className="text-secondary">Max Speed</small>
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
                    {vehicle.pilots.length > 0 && (
                        <>
                            <h4 className="text-light">Pilots</h4>
                            <div className="mb-4">
                                {vehicle.pilots.map((pilot) => (
                                    <Link to={`/people/${pilot.id}`} key={pilot.id} className="text-white text-decoration-none">
                                        <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {pilot.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    {vehicle.films.length > 0 && (
                        <>
                            <h4 className="text-light">Films</h4>
                            <div className="mb-2">
                                {vehicle.films.map((film) => (
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

export default VehiclesDetailsPage;
