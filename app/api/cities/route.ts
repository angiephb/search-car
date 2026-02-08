import { NextResponse } from "next/server";

const cityList = [
    {
        id: 1,
        iata: "BOG",
        cityName: "Bogotá",
        airportName: "Aeropuerto Internacional El Dorado",
        country: "Colombia",
    },
    {
        id: 2,
        iata: "MDE",
        cityName: "Medellín",
        airportName: "Aeropuerto Internacional José María Córdova",
        country: "Colombia",
    },
    {
        id: 3,
        iata: "MAD",
        cityName: "Madrid",
        airportName: "Aeropuerto Adolfo Suárez Madrid-Barajas",
        country: "España",
    },
    {
        id: 4,
        iata: "MEX",
        cityName: "Ciudad de México",
        airportName: "Aeropuerto Internacional Benito Juárez",
        country: "México",
    },
    {
        id: 5,
        iata: "MIA",
        cityName: "Miami",
        airportName: "Miami International Airport",
        country: "Estados Unidos",
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("query") || "").toLowerCase()

    const filtered = cityList.filter(element =>
        `${element.airportName} ${element.cityName}`.toLowerCase().includes(query)
    );

    return NextResponse.json(filtered);
}
