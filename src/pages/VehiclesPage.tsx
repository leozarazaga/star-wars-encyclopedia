import { useEffect, useState } from "react";
import type { VehiclePaginationResult } from "../types/StarWarsAPI.types";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { getVehicles } from "../services/StarWarsAPI";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import CardInfo from "../components/CardInfo";
import { vehicleImages } from "../data/vehiclesImages";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const VehiclesPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [vehicles, setVehicles] = useState<VehiclePaginationResult | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const getStarWarsVehicles = async (searchQuery: string, page: number) => {
        try {
            setError(false);
            setIsLoading(true);
            setVehicles(null);

            const res = await getVehicles(searchQuery, page);
            setVehicles(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsVehicles(search, page);
    }, [search, page]);

    const goToPage = (newPage: number) => {
        const currentSearch = searchParams.get("search") || "";
        setSearchParams({ search: currentSearch, page: String(newPage) });
    };

    const handleSearch = (search: string) => {
        setSearchParams({ search, page: "1" });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (!vehicles) {
        return <p>No results. Try searching for something!</p>;
    }

    return (
        <Container>
            <SearchForm onSearch={handleSearch} searchCategory={"vehicles..."} />

            {search !== "" &&
                (vehicles.data.length === 0 ? (
                    <p className="fs-5 text-light">No results found for "{search}"</p>
                ) : (
                    <p className="fs-5 text-light">Search results for "{search}"</p>
                ))}

            {vehicles.data.length > 0 && (
                <>
                    <div className="mt-4">
                        <h1 className="my-3" style={{ color: "#e5e5e5" }}>
                            Vehicles
                        </h1>
                    </div>

                    <Row className="g-3">
                        {vehicles.data.map((vehicle) => (
                            <Col key={vehicle.id} xs={6} md={6} lg={3} className="mb-4">
                                <CardInfo title={vehicle.name} image={vehicleImages[vehicle.id]} link={`/vehicles/${vehicle.id}`} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {vehicles.total > vehicles.per_page && (
                <Pagination
                    hasPreviousPage={vehicles.current_page > 1}
                    hasNextPage={vehicles.current_page < vehicles.last_page}
                    onPreviousPage={() => goToPage(vehicles.current_page - 1)}
                    onNextPage={() => goToPage(vehicles.current_page + 1)}
                    page={vehicles.current_page}
                    totalPages={vehicles.last_page}
                />
            )}
        </Container>
    );
};

export default VehiclesPage;
