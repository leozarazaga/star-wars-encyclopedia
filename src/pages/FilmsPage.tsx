import { useEffect, useState } from "react";
import type { FilmPaginationResult } from "../types/StarWarsAPI.types";
import { getFilms } from "../services/StarWarsAPI";
import { Col, Container, Row } from "react-bootstrap";
import { useSearchParams } from "react-router";
import Pagination from "../components/Pagination";
import CardInfo from "../components/CardInfo";
import SearchForm from "../components/SearchForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const FilmsPage = () => {
    const [error, setError] = useState<string | false>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState<FilmPaginationResult | null>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);

    const getStarWarsFilms = async (searchQuery: string, page: number) => {
        try {
            setError(false);
            setIsLoading(true);
            setMovies(null);

            const res = await getFilms(searchQuery, page);
            setMovies(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : "I have a bad feeling about this!");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStarWarsFilms(search, page);
    }, [search, page]);

    const goToPage = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
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

    if (!movies) {
        return <p>No results. Try searching for something!</p>;
    }

    return (
        <Container>
            <SearchForm onSearch={handleSearch} searchCategory={"films..."} />

            {search !== "" &&
                (movies.data.length === 0 ? <p className="fs-5 text-light">No results found for "{search}"</p> : <p className="fs-5 text-light">Search results for "{search}"</p>)}

            {movies.data.length > 0 && (
                <div className="mt-4">
                    <h1 className="my-3" style={{ color: "#e5e5e5" }}>
                        Films
                    </h1>
                </div>
            )}

            <Row>
                {movies.data.map((movie) => (
                    <Col key={movie.id} xs={12} md={6} lg={3} className="mb-5">
                        <CardInfo title={movie.title} image={movie.image_url} link={`/films/${movie.id}`} />
                    </Col>
                ))}
            </Row>

            {(movies.prev_page_url || movies.next_page_url) && (
                <Pagination
                    hasPreviousPage={movies.current_page > 1}
                    hasNextPage={movies.current_page < movies.last_page}
                    onPreviousPage={() => goToPage(movies.current_page - 1)}
                    onNextPage={() => goToPage(movies.current_page + 1)}
                    page={movies.current_page}
                    totalPages={movies.last_page}
                />
            )}
        </Container>
    );
};

export default FilmsPage;
