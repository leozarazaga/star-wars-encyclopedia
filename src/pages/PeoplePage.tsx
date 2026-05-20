import { useEffect, useState } from "react";
import type { PeoplePaginationResult } from "../types/StarWarsAPI.types";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { getPeople } from "../services/StarWarsAPI";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import CardInfo from "../components/CardInfo";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const PeoplePage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [peoples, setPeoples] = useState<PeoplePaginationResult | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const getStarWarsPeople = async (searchQuery: string, page: number) => {
        try {
            setError(false);
            setIsLoading(true);
            setPeoples(null);

            const res = await getPeople(searchQuery, page);
            setPeoples(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsPeople(search, page);
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

    if (!peoples) {
        return <p>No results. Try searching for something!</p>;
    }

    return (
        <Container>
            <SearchForm onSearch={handleSearch} searchCategory={"characters..."} />

            {search !== "" &&
                (peoples.data.length === 0 ? (
                    <p className="fs-5 text-light">No results found for "{search}"</p>
                ) : (
                    <p className="fs-5 text-light">Search results for "{search}"</p>
                ))}

            {peoples.data.length > 0 && (
                <div className="mt-4">
                    <h1 className="my-3" style={{ color: "#e5e5e5" }}>
                        Characters
                    </h1>
                </div>
            )}

            <Row className="g-3">
                {peoples.data.map((people) => (
                    <Col key={people.id} xs={6} md={6} lg={3} className="mb-4">
                        <CardInfo title={people.name} image={people.image_url} link={`/people/${people.id}`} />
                    </Col>
                ))}
            </Row>

            {peoples.total > peoples.per_page && (
                <Pagination
                    hasPreviousPage={peoples.current_page > 1}
                    hasNextPage={peoples.current_page < peoples.last_page}
                    onPreviousPage={() => goToPage(peoples.current_page - 1)}
                    onNextPage={() => goToPage(peoples.current_page + 1)}
                    page={peoples.current_page}
                    totalPages={peoples.last_page}
                />
            )}
        </Container>
    );
};

export default PeoplePage;
