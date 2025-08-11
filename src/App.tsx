import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import Navigation from "./components/Navbar/Navigation";
import FilmDetailsPage from "./pages/FilmDetailsPage";
import FilmsPage from "./pages/FilmsPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import PeopleDetailsPage from "./pages/PeopleDetailsPage";
import PeoplePage from "./pages/PeoplePage";
import PlanetsDetailsPage from "./pages/PlanetsDetailsPage";
import PlanetsPage from "./pages/PlanetsPage";
import SpeciesDetailsPage from "./pages/SpeciesDetailsPage";
import SpeciesPage from "./pages/SpeciesPage";
import StarshipsDetailsPage from "./pages/StarshipsDetailsPage";
import StarshipsPage from "./pages/StarshipsPage";
import VehiclesDetailsPage from "./pages/VehiclesDetailsPage";
import VehiclesPage from "./pages/VehiclesPage";

function App() {
    return (
        <div>
            <Navigation />

            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/films" element={<FilmsPage />} />
                    <Route path="/films/:id" element={<FilmDetailsPage />} />

                    <Route path="/people" element={<PeoplePage />} />
                    <Route path="/people/:id" element={<PeopleDetailsPage />} />

                    <Route path="/planets" element={<PlanetsPage />} />
                    <Route path="/planets/:id" element={<PlanetsDetailsPage />} />

                    <Route path="/species" element={<SpeciesPage />} />
                    <Route path="/species/:id" element={<SpeciesDetailsPage />} />

                    <Route path="/starships" element={<StarshipsPage />} />
                    <Route path="/starships/:id" element={<StarshipsDetailsPage />} />

                    <Route path="/vehicles" element={<VehiclesPage />} />
                    <Route path="/vehicles/:id" element={<VehiclesDetailsPage />} />

                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Container>
        </div>
    );
}

export default App;
