import FilmsCarousel from "../components/Home/FilmsCarousel";
import PeopleCarousel from "../components/Home/PeopleCarousel";
import PlanetsCarousel from "../components/Home/PlanetsCarousel";
import SpeciesCarousel from "../components/Home/SpeciesCarousel";
import StarshipsCarousel from "../components/Home/StarshipsCarousel";
import VehicleCarousel from "../components/Home/VehicleCarousel";
import HeroCarousel from "../components/Navbar/HeroCarousel";

const HomePage = () => {
    return (
        <div>
            <HeroCarousel />
            <FilmsCarousel />
            <PeopleCarousel />
            <PlanetsCarousel />
            <SpeciesCarousel />
            <StarshipsCarousel />
            <VehicleCarousel />
        </div>
    );
};

export default HomePage;
<h1>This is the Home Page / Start Page</h1>;
