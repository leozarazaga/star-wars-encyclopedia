import { useEffect, useState } from "react";
import type { Vehicle } from "../../types/StarWarsAPI.types";
import { getVehicles } from "../../services/StarWarsAPI";
import { Container } from "react-bootstrap";
import CarouselView from "./CarouselView";
import { Link } from "react-router";
import { vehicleImages } from "../../data/vehiclesImages";
import SectionTitle from "./SectionCarouselTitle";
import LoadingCarouselSpinner from "./LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";

const VehicleCarousel = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);

    const getStarWarsVehicles = async () => {
        setError(false);
        setIsLoading(true);
        setVehicles(null);

        try {
            const res = await getVehicles("", 1);
            setVehicles(res.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsVehicles();
    }, []);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    return (
        <Container className="mt-5 mb-5">
            <SectionTitle title="Vehicles" linkTo="/vehicles" />
            {!vehicles && isLoading && <LoadingCarouselSpinner />}

            {vehicles && (
                <CarouselView>
                    {vehicles.map((vehicle) => (
                        <div className="carousel-card" key={vehicle.id}>
                            <Link to={`/vehicles/${vehicle.id}`}>
                                <img src={vehicleImages[vehicle.id]} alt={vehicle.name} title={vehicle.name} />
                            </Link>
                            <p style={{ color: "#e5e5e5", marginTop: "1rem" }}>{vehicle.name}</p>
                        </div>
                    ))}
                </CarouselView>
            )}
        </Container>
    );
};

export default VehicleCarousel;
