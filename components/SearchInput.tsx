"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { city } from "@/types/city";
import { Search, MapPin, Calendar, AlertCircle } from "lucide-react";

export const SearchInput = ({ data }: { data: city[] }) => {

    const router = useRouter();
    const [dataInput, setDataInput] = useState({
        airportName: data.length > 0 ? `${data[0].airportName}, (${data[0].iata}) ${data[0].cityName}, ${data[0].country}` : "",
        startDate: "",
        endDate: "",
    });

    const today = new Date().toISOString().split('T')[0];

    const [error, setError] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDataInput((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError(false);
    };

    const goSearch = () => {
        const { airportName, startDate, endDate } = dataInput;
        const isEmpty = !airportName || !startDate || !endDate;

        if (isEmpty) {
            setError(true);
            return;
        }

        router.push(`/search?query=${encodeURIComponent(airportName)}&start=${startDate}&end=${endDate}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-gray-800 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-4 space-y-2">
                    <label htmlFor="airportName" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4 text-sky-500" />
                        Lugar de recogida
                    </label>
                    <div className="relative group">
                        <select
                            id="airportName"
                            name="airportName"
                            className="w-full appearance-none rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-sky-500 py-3 px-4 text-gray-700 dark:text-gray-200 outline-none transition-all duration-200 cursor-pointer"
                            onChange={handleChange}
                            value={dataInput.airportName}
                        >
                            {data.map((element) => (
                                <option
                                    key={element.id}
                                    value={`${element.airportName}, (${element.iata}) ${element.cityName}, ${element.country}`}
                                >
                                    {element.cityName} - {element.iata} ({element.airportName})
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3 space-y-2">
                    <label htmlFor="startDate" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 text-sky-500" />
                        Fecha de recogida
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        className="w-full rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-sky-500 py-3 px-4 text-gray-700 dark:text-gray-200 outline-none transition-all duration-200"
                        value={dataInput.startDate}
                        onChange={handleChange}
                        min={today}
                    />
                </div>

                <div className="md:col-span-3 space-y-2">
                    <label htmlFor="endDate" className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        <Calendar className="w-4 h-4 text-sky-500" />
                        Fecha de devolución
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        name="endDate"
                        className="w-full rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-sky-500 py-3 px-4 text-gray-700 dark:text-gray-200 outline-none transition-all duration-200"
                        value={dataInput.endDate}
                        onChange={handleChange}
                        min={dataInput.startDate || today}
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        className="w-full h-[52px] cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-lg hover:shadow-sky-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                        onClick={goSearch}
                    >
                        <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Buscar</span>
                    </button>
                </div>
            </div>

            {error && (
                <div className="mt-4 flex items-center gap-2 text-red-500 text-sm font-medium animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    Por favor, complete todos los campos para continuar con la búsqueda.
                </div>
            )}
        </div>
    );
};