"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCars, setSelectedCar } from "@/store/carSlice";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { CarFeatures } from "@/components/car/CarFeatures";
import { Loading } from "@/components/loading/Loading";
import { Error } from "@/components/error/Error";

interface ResultProps {
    initialData: any[];
    query: string;
}

export const ResultSearch = ({ initialData, query }: ResultProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { results, loading, error } = useSelector((state: RootState) => state.cars);

    const handleSelect = (car: any) => {
        dispatch(setSelectedCar(car));
        router.push("/summary");
    };

    useEffect(() => {
        if (initialData && initialData.length > 0) {
            dispatch({ type: 'cars/fetchCars/fulfilled', payload: initialData });
        } else if (query) {
            dispatch(getCars(query));
        }
    }, [initialData, query, dispatch]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <Error
                message={error}
                onClick={() => dispatch(getCars(query))}
            />
        );
    }

    if (results.length === 0 && query) {
        return (
            <div className="p-20 w-full text-center">
                <p className="text-gray-500 text-xl font-medium">Lo sentimos, no encontramos vehículos disponibles en esta ciudad.</p>
                <p className="text-gray-400 mt-2">Prueba buscando en una ubicación cercana.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 p-6 md:p-12 max-w-5xl mx-auto">
            {results.map((car) => (
                <div
                    key={car.id}
                    className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row h-auto md:h-64"
                >
                    <div className="relative w-full md:w-80 h-48 md:h-full overflow-hidden shrink-0">
                        <img
                            src={car.image}
                            alt={`${car.name} ${car.model}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/600x400/f3f4f6/9ca3af?text=Imagen+No+Disponible";
                            }}
                        />
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                            <div className="flex items-baseline gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">5.0</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-sky-600 transition-colors font-secondary">
                                        {car.name} {car.model}
                                    </h3>
                                    <span className="inline-block px-2 py-1 rounded-md bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-[10px] font-bold uppercase tracking-wider mt-1">
                                        {car.type}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-sky-600 font-secondary font-secondary">${car.price}</span>
                                    <span className="text-xs text-gray-500 block">/día</span>
                                </div>
                            </div>
                            <CarFeatures />
                        </div>

                        <div className="mt-4 md:mt-0 flex justify-end">
                            <button 
                                onClick={() => handleSelect(car)}
                                className="w-full md:w-auto px-12 py-2 md:py-4 bg-sky-600 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl hover:bg-teal-500 dark:hover:bg-teal-500 hover:text-white dark:hover:text-white transition-all duration-300 transform active:scale-95"
                            >
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
