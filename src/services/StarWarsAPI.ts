/**
 * STAR WARS API
 *
 * "films": "https://swapi.thehiveresistance.com/api/films",
 * "people": "https://swapi.thehiveresistance.com/api/people",
 * "planets": "https://swapi.thehiveresistance.com/api/planets",
 * "species": "https://swapi.thehiveresistance.com/api/species",
 * "starships": "https://swapi.thehiveresistance.com/api/starships",
 * "vehicles": "https://swapi.thehiveresistance.com/api/vehicles"
 */

import axios from "axios";
import type {
    Film,
    FilmPaginationResult,
    People,
    PeoplePaginationResult,
    Planet,
    PlanetsPaginationResult,
    Specie,
    SpeciesPaginationResult,
    Starship,
    StarshipPaginationResult,
    Vehicle,
    VehiclePaginationResult,
} from "../types/StarWarsAPI.types";

const instance = axios.create({
    baseURL: "https://swapi.thehiveresistance.com/api",
    timeout: 5000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const get = async <T>(endpoint: string) => {
    const res = await instance.get<T>(endpoint);
    return res.data;
};

export const getFilms = async (search: string, page = 1) => {
    return await get<FilmPaginationResult>(`/films?search=${search}&page=${page}`);
};

export const getFilmById = async (id: number) => {
    return await get<Film>(`/films/${id}`);
};

///////////////////////////////////////////////////////

export const getPeople = async (search: string, page = 1) => {
    return await get<PeoplePaginationResult>(`/people?search=${search}&page=${page}`);
};

export const getPeoplebyId = async (id: number) => {
    return await get<People>(`/people/${id}`);
};

///////////////////////////////////////////////////////

export const getPlanets = async (search: string, page = 1) => {
    return await get<PlanetsPaginationResult>(`/planets?search=${search}&page=${page}`);
};

export const getPlanetbyId = async (id: number) => {
    return await get<Planet>(`/planets/${id}`);
};

///////////////////////////////////////////////////////

export const getSpecies = async (search: string, page = 1) => {
    return await get<SpeciesPaginationResult>(`/species?search=${search}&page=${page}`);
};

export const getSpecieById = async (id: number) => {
    return await get<Specie>(`/species/${id}`);
};

///////////////////////////////////////////////////////

export const getStarships = async (search: string, page = 1) => {
    return await get<StarshipPaginationResult>(`/starships?search=${search}&page=${page}`);
};

export const getStarshipById = async (id: number) => {
    return await get<Starship>(`/starships/${id}`);
};

///////////////////////////////////////////////////////

export const getVehicles = async (search: string, page = 1) => {
    return await get<VehiclePaginationResult>(`/vehicles?search=${search}&page=${page}`);
};

export const getVehicleById = async (id: number) => {
    return await get<Vehicle>(`/vehicles/${id}`);
};
