import { useEffect, useState } from "react";
import type { PlanetsPaginationResult } from "../types/StarWarsAPI.types";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { getPlanets } from "../services/StarWarsAPI";
import Pagination from "../components/Pagination";
import { planetsImages } from "../data/planetsImages";
import SearchForm from "../components/SearchForm";
import CardInfo from "../components/CardInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const PlanetsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [planets, setPlanets] = useState<PlanetsPaginationResult | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const getStarWarsPlanets = async (searchQuery: string, page: number) => {
        try {
            setError(false);
            setIsLoading(true);
            setPlanets(null);

            const res = await getPlanets(searchQuery, page);
            setPlanets(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPlanets(search, page);
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

    if (!planets) {
        return <p>No results. Try searching for something!</p>;
    }

    return (
        <Container>
            <SearchForm onSearch={handleSearch} searchCategory={"planets..."} />

            {search !== "" &&
                (planets.data.length === 0 ? (
                    <p className="fs-5 text-light">No results found for "{search}"</p>
                ) : (
                    <p className="fs-5 text-light">Search results for "{search}"</p>
                ))}

            {planets.data.length > 0 && (
                <>
                    <div className="mt-4">
                        <h1 className="my-3" style={{ color: "#e5e5e5" }}>
                            Planets
                        </h1>
                    </div>

                    <Row className="g-3">
                        {planets.data.map((planet) => (
                            <Col key={planet.id} xs={6} md={6} lg={3} className="mb-4">
                                <CardInfo title={planet.name} image={planetsImages[planet.id]} link={`/planets/${planet.id}`} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {planets.total > planets.per_page && (
                <Pagination
                    hasPreviousPage={planets.current_page > 1}
                    hasNextPage={planets.current_page < planets.last_page}
                    onPreviousPage={() => goToPage(planets.current_page - 1)}
                    onNextPage={() => goToPage(planets.current_page + 1)}
                    page={planets.current_page}
                    totalPages={planets.last_page}
                />
            )}
        </Container>
    );
};

export default PlanetsPage;
