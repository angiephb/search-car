import { NextResponse } from "next/server";

const carList = [
    {
        id: 1,
        name: "Toyota",
        model: "Corolla",
        type: "Sedan",
        price: 50,
        cityName: "Bogotá",
        image: "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
    },
    {
        id: 2,
        name: "Chevrolet",
        model: "Onix",
        type: "Sedan",
        price: 55,
        cityName: "Bogotá",
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/car-1835506_1280.jpg"
    },
    {
        id: 3,
        name: "Kia",
        model: "Picanto",
        type: "Hatchback",
        price: 35,
        cityName: "Bogotá",
        image: "https://cdn.pixabay.com/photo/2013/07/13/10/07/car-156726_1280.png"
    },
    {
        id: 4,
        name: "Toyota",
        model: "Yaris",
        type: "Hatchback",
        price: 45,
        cityName: "Medellín",
        image: "https://cdn.pixabay.com/photo/2013/07/13/10/07/car-156726_1280.png"
    },
    {
        id: 5,
        name: "Renault",
        model: "Duster",
        type: "SUV",
        price: 70,
        cityName: "Medellín",
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/car-1835506_1280.jpg"
    },
    {
        id: 6,
        name: "Mazda",
        model: "2",
        type: "Sedan",
        price: 48,
        cityName: "Medellín",
        image: "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
    },
    {
        id: 7,
        name: "Mazda",
        model: "CX-5",
        type: "SUV",
        price: 80,
        cityName: "Madrid",
        image: "https://cdn.pixabay.com/photo/2016/02/19/10/00/car-1209331_1280.jpg"
    },
    {
        id: 8,
        name: "BMW",
        model: "X3",
        type: "SUV",
        price: 120,
        cityName: "Madrid",
        image: "https://cdn.pixabay.com/photo/2017/03/27/14/56/car-2179220_1280.jpg"
    },
    {
        id: 9,
        name: "Audi",
        model: "A3",
        type: "Hatchback",
        price: 90,
        cityName: "Madrid",
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/car-1835506_1280.jpg"
    },
    {
        id: 10,
        name: "Mazda",
        model: "3",
        type: "Sedan",
        price: 60,
        cityName: "Ciudad de México",
        image: "https://cdn.pixabay.com/photo/2017/03/27/14/56/car-2179220_1280.jpg"
    },
    {
        id: 11,
        name: "Nissan",
        model: "Versa",
        type: "Sedan",
        price: 45,
        cityName: "Ciudad de México",
        image: "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
    },
    {
        id: 12,
        name: "Volkswagen",
        model: "Jetta",
        type: "Sedan",
        price: 55,
        cityName: "Ciudad de México",
        image: "https://cdn.pixabay.com/photo/2013/07/13/10/07/car-156726_1280.png"
    },
    {
        id: 13,
        name: "Chevrolet",
        model: "Spark",
        type: "Hatchback",
        price: 40,
        cityName: "Miami",
        image: "https://cdn.pixabay.com/photo/2013/07/12/18/39/car-153580_1280.png"
    },
    {
        id: 14,
        name: "Ford",
        model: "Mustang",
        type: "Coupe",
        price: 150,
        cityName: "Miami",
        image: "https://cdn.pixabay.com/photo/2016/02/19/10/00/car-1209331_1280.jpg"
    },
    {
        id: 15,
        name: "Jeep",
        model: "Wrangler",
        type: "SUV",
        price: 110,
        cityName: "Miami",
        image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/car-1835506_1280.jpg"
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const rawQuery = decodeURIComponent(searchParams.get("query") || "").toLowerCase();

    const filtered = carList.filter(element => {
        const city = element.cityName.toLowerCase();
        return rawQuery.includes(city);
    });

    return NextResponse.json(filtered);
}
