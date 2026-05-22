// ==================================
//         REFERENCE TYPES
// ==================================

interface NamedReference {
    id: number;
    name: string;
}

interface TitledReference {
    id: number;
    title: string;
}

// ==================================
//          MAIN DATA TYPES
// ==================================

export interface Film {
    id: number;
    title: string;
    episode_id: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    image_url: string;
    created: string;
    edited: string;
    short_description: string;

    characters: NamedReference[];
    planets: NamedReference[];
    starships: NamedReference[];
    vehicles: NamedReference[];
    species: NamedReference[];
}

export interface People {
    id: number;
    name: string;
    birth_year: string;
    eye_color: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    wiki_link: string;
    image_url: string;
    affiliations: string[];
    films_count: number;
    species_count: number;
    starships_count: number;
    vehicles_count: number;
    short_description: string;
    force_alignment: string;
    lightsaber_color: string | null;

    films: TitledReference[];
    species: NamedReference[];
    starships: NamedReference[];
    vehicles: NamedReference[];
    homeworld: NamedReference;
}

export interface Planet {
    id: number;
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents_count: number;
    films_count: number;
    image_url: string;
    short_description: string;

    residents: NamedReference[];
    films: TitledReference[];
}

export interface Species {
    id: number;
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    eye_colors: string;
    hair_colors: string;
    skin_colors: string;
    language: string;
    people_count: number;
    films_count: number;
    short_description: string;

    people: NamedReference[];
    homeworld: NamedReference | null;
    films: TitledReference[];
}

export interface Starship {
    id: number;
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    pilots_count: number;
    films_count: number;
    short_description: string;

    pilots: NamedReference[];
    films: TitledReference[];
}

export interface Vehicle {
    id: number;
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    length: string;
    cost_in_credits: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    pilots_count: number;
    films_count: number;
    short_description: string;

    pilots: NamedReference[];
    films: TitledReference[];
}

// ==================================
//        GENERIC PAGINATION
// ==================================

export interface PaginationResult<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    per_page: number;
    prev_page_url: string | null;
    total: number;
}

// ==================================
//      PAGINATION TYPE ALIASES
// ==================================

export type FilmPaginationResult = PaginationResult<Film>;

export type PeoplePaginationResult = PaginationResult<People>;

export type PlanetPaginationResult = PaginationResult<Planet>;

export type SpeciesPaginationResult = PaginationResult<Species>;

export type StarshipPaginationResult = PaginationResult<Starship>;

export type VehiclePaginationResult = PaginationResult<Vehicle>;
