import { useEffect, useState } from "react";
import type { SpeciesPaginationResult } from "../types/StarWarsAPI.types";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import { getSpecies } from "../services/StarWarsAPI";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";
import CardInfo from "../components/CardInfo";
import { speciesImages } from "../data/speciesImages";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const SpeciesPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [species, setSpecies] = useState<SpeciesPaginationResult | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const getStarWarsSpecies = async (searchQuery: string, page: number) => {
        try {
            setError(false);
            setIsLoading(true);
            setSpecies(null);

            const res = await getSpecies(searchQuery, page);
            setSpecies(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsSpecies(search, page);
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

    if (!species) {
        return <p>No results. Try searching for something!</p>;
    }

    return (
        <Container>
            <SearchForm onSearch={handleSearch} searchCategory={"species..."} />

            {search !== "" &&
                (species.data.length === 0 ? (
                    <p className="fs-5 text-light">No results found for "{search}"</p>
                ) : (
                    <p className="fs-5 text-light">Search results for "{search}"</p>
                ))}

            {species.data.length > 0 && (
                <>
                    <div className="mt-4">
                        <h1 className="my-3" style={{ color: "#e5e5e5" }}>
                            Species
                        </h1>
                    </div>

                    {species.data.length > 0 && (
                        <div className="mt-4 mb-3">
                            <h6 style={{ color: "#e5e5e5", letterSpacing: "1px", margin: 0 }}>ALL SPECIES ({species.total})</h6>
                        </div>
                    )}

                    <Row xs={2} md={3} lg={4} xl={5} className="g-4">
                        {species.data.map((species) => (
                            <Col key={species.id} className="mb-4">
                                <CardInfo title={species.name} image={speciesImages[species.id]} link={`/species/${species.id}`} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {species.total > species.per_page && (
                <Pagination
                    hasPreviousPage={species.current_page > 1}
                    hasNextPage={species.current_page < species.last_page}
                    onPreviousPage={() => goToPage(species.current_page - 1)}
                    onNextPage={() => goToPage(species.current_page + 1)}
                    page={species.current_page}
                    totalPages={species.last_page}
                />
            )}
        </Container>
    );
};

export default SpeciesPage;
