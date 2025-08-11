# Star Wars Encyclopedia

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF?logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Code Style](https://img.shields.io/badge/Code%20Style-ESLint%20%2B%20Type%20Coverage-blue)

**Star Wars Encyclopedia** is a React + TypeScript application that lets users browse, search, and explore Star Wars data including films, characters, planets, species, starships, and vehicles.  
It uses the [Star Wars API](https://swapi.thehiveresistance.com/api) for all data fetching.

## Preview

![Star Wars Encyclopedia Preview](./src/assets/images/star-wars.webp)

**Live Demo:** [starwarsarchives.netlify.app](https://starwarsarchives.netlify.app/)

## Features

-   Browse films, characters, planets, species, starships, and vehicles
-   Search by name or title
-   Detailed information pages
-   Responsive design
-   Data fetching with Axios using async/await and error handling

## Installation

To set up this project locally, run the following commands:

```bash
git clone https://github.com/leozarazaga/star-wars-encyclopedia.git
cd star-wars-encyclopedia
npm install
```

## Environment Variables

No API key or environment variables are required to use the Star Wars API.

## Running the Project

Start the development server with:

```bash
npm run dev
```

## Quality Checks

Run linting, type checking, and type coverage with:

```bash
npm run check
```

This runs:

-   ESLint
-   TypeScript strict checks
-   Type coverage (requires 100%)

## Technologies Used

-   **React 19 + TypeScript** – Component-based UI with strong typing
-   **Vite** – Fast development server and build tool
-   **React Router** – Client-side routing
-   **Axios** – HTTP client for API requests with async/await
-   **Bootstrap + React Bootstrap** – UI components and styling
-   **ESLint + Type Coverage** – Code quality and type safety

## Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push the branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

This project is licensed under the [MIT License](./LICENSE).

You are free to use, modify, and distribute this software, provided the original copyright and permission notices are included.

**Disclaimer:** This project is a personal Star Wars-themed application for demonstration and learning purposes.  
It uses a public [Star Wars API](https://swapi.thehiveresistance.com/api), which is not affiliated with Lucasfilm or Disney.
