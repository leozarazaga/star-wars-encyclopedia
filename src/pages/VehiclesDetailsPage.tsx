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
    const [vehicles, setVehicles] = useState<Vehicle | null>(null);
    const nagivate = useNavigate();

    const { id } = useParams();
    const vehicleId = Number(id);

    const getStarWarsVehicles = async (id: number) => {
        setError(false);
        setIsLoading(true);
        setVehicles(null);

        try {
            const res = await getVehicleById(id);
            setVehicles(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsVehicles(vehicleId);
    }, [vehicleId]);


    // Update document title
    useEffect(() => {
        if (!vehicles) return;

        document.title = `Vehicle | ${vehicles.name}`;

        return () => {
            document.title = "Star Wars";
        };
    }, [vehicles]);


    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!vehicles || isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container className="mt-4">
            <Card className="bg-dark text-light ">
                <Row>
                    <Col md={4}>
                        <Card.Img
                            src={vehicleImages[vehicles.id]}
                            alt={vehicles.name}
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
                            <Card.Title className="fs-3">{vehicles.name}</Card.Title>
                            <p className="mt-3 mb-2">Model: {vehicles.model}</p>
                            <p className="mb-2">Class: {vehicles.vehicle_class}</p>
                            <p className="mb-2">Manufacturer: {vehicles.manufacturer}</p>
                            <p className="mb-2">Cost in Credits: {vehicles.cost_in_credits}</p>
                            <p className="mb-2">Length: {vehicles.length}</p>
                            <p className="mb-2">Crew: {vehicles.crew}</p>
                            <p className="mb-2">Passengers: {vehicles.passengers}</p>
                            <p className="mb-2">Max Speed: {vehicles.max_atmosphering_speed}</p>
                            <p className="mb-2">Cargo Capacity: {vehicles.cargo_capacity}</p>
                            <p className="mb-2">Consumables: {vehicles.consumables}</p>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>

            <Card className="bg-dark text-light mt-4 p-3">
                {vehicles.pilots.length > 0 && (
                    <>
                        <h4 className="text-light">Pilots</h4>
                        <div className="mb-3">
                            {vehicles.pilots.map((pilot) => (
                                <Link to={`/people/${pilot.id}`} key={pilot.id} className="text-white text-decoration-none">
                                    <span className="badge bg-secondary me-2 mb-2" style={{ fontSize: "0.8rem" }}>
                                        {pilot.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {vehicles.films.length > 0 && (
                    <>
                        <h4 className="text-light">Films</h4>
                        <div className="mb-3">
                            {vehicles.films.map((film) => (
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

export default VehiclesDetailsPage;
