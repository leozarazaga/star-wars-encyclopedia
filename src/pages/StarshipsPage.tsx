import { useEffect, useState } from "react";
import type { StarshipPaginationResult } from "../types/StarWarsAPI.types";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { getStarships } from "../services/StarWarsAPI";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import CardInfo from "../components/CardInfo";
import { StarshipImages } from "../data/starships";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const StarshipsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [starships, setStarships] = useState<StarshipPaginationResult | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const getStarWarsStarships = async (searchQuery: string, page: number) => {
        try {
            setError(false);
            setIsLoading(true);
            setStarships(null);

            const res = await getStarships(searchQuery, page);
            setStarships(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsStarships(search, page);
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

    if (!starships) {
        return <p>No results. Try searching for something!</p>;
    }

    return (
        <Container>
            <SearchForm onSearch={handleSearch} searchCategory={"starships..."} />

            {search !== "" &&
                (starships.data.length === 0 ? (
                    <p className="fs-5 text-light">No results found for "{search}"</p>
                ) : (
                    <p className="fs-5 text-light">Search results for "{search}"</p>
                ))}

            {starships.data.length > 0 && (
                <>
                    <div className="mt-4">
                        <h1 className="my-3" style={{ color: "#e5e5e5" }}>
                            Starships
                        </h1>
                    </div>

                    {starships.data.length > 0 && (
                        <div className="mt-4 mb-3">
                            <h6 style={{ color: "#e5e5e5", letterSpacing: "1px", margin: 0 }}>ALL STARSHIPS ({starships.total})</h6>
                        </div>
                    )}

                    <Row xs={2} md={3} lg={4} xl={5} className="g-4">
                        {starships.data.map((starship) => (
                            <Col key={starship.id} className="mb-4">
                                <CardInfo title={starship.name} image={StarshipImages[starship.id]} link={`/starships/${starship.id}`} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {starships.total > starships.per_page && (
                <Pagination
                    hasPreviousPage={starships.current_page > 1}
                    hasNextPage={starships.current_page < starships.last_page}
                    onPreviousPage={() => goToPage(starships.current_page - 1)}
                    onNextPage={() => goToPage(starships.current_page + 1)}
                    page={starships.current_page}
                    totalPages={starships.last_page}
                />
            )}
        </Container>
    );
};

export default StarshipsPage;
