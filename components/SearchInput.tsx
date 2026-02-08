"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { city } from "@/types/city"
import { Search } from "lucide-react"

export const SearchInput = ({ data }: { data: city[] }) => {

    const router = useRouter()

    const [dataInput, setDataInput] = useState({
        airportName: `${data[0].airportName}, (${data[0].iata}) ${data[0].cityName}, ${data[0].country}` || "",
        startDate: "",
        endDate: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target

        setDataInput({
            ...dataInput,
            [name]: value
        })
    }

    const goSearch = () => {
        const { airportName, startDate, endDate } = dataInput
        const isEmpty = Object.values(dataInput).some(value => value === "")
        // mejorar a un tooltip
        if (isEmpty) {
            alert("Por favor, complete todos los campos")
            return
        }
        router.push(`/search?query=${airportName}&start=${startDate}&end=${endDate}`)
    }

    return (
        <div>
            <div className="grid grid-cols-12 gap-2 mt-2 w-full justify-center items-end">
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="airportName" className="block md:col-span-6 text-sm/6 font-medium text-gray-800">
                        Ciudad
                    </label>
                    <div className="focus-within:relative">
                        <select
                            id="airportName"
                            name="airportName"
                            aria-label="airportName"
                            className="w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-7 pl-3 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            onChange={handleChange}
                        >
                            {data.map(element => (
                                <option
                                    key={element.id}
                                    value={`${element.airportName}, (${element.iata}) ${element.cityName}, ${element.country}`}
                                >
                                    {element.airportName}, ({element.iata}) {element.cityName}, {element.country} </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <label htmlFor="startDate" className="block md:col-span-6 text-sm/6 font-medium text-gray-800">
                        Fecha de recogida
                    </label>
                    <div className="focus-within:relative">
                        <input
                            id="startDate"
                            type="date"
                            name="startDate"
                            aria-label="startDate"
                            className="w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-7 pl-3 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            value={dataInput.startDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                    <label htmlFor="endDate" className="block md:col-span-6 text-sm/6 font-medium text-gray-800">
                        Fecha de devolucion
                    </label>
                    <div className=" focus-within:relative">
                        <input
                            id="endDate"
                            type="date"
                            name="endDate"
                            aria-label="endDate"
                            className="w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-7 pl-3 text-base text-gray-400 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            value={dataInput.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    className="col-span-12 md:col-span-2 w-fit h-fit cursor-pointer bg-blue-500 p-2 rounded-full"
                    onClick={goSearch}
                >
                    <Search color="white" />
                </button>

            </div>
        </div>
    )
}