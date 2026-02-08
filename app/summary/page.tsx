"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CarFeatures } from "@/components/car/CarFeatures";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const SummaryPage = () => {
    const { selectedCar } = useSelector((state: RootState) => state.cars);
    const router = useRouter();

    if (!selectedCar) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Lo sentimos, no se ha seleccionado ningún vehículo</h2>
                <Link
                    href="/"
                    className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-colors"
                >
                    Volver al buscador
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-sky-600 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Volver a resultados</span>
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white font-secondary mb-2">Resumen de Reserva</h1>
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900">
                                <img
                                    src={selectedCar.image}
                                    alt={selectedCar.name}
                                    className="w-full h-64 object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase mb-4">
                                    Vehículo Seleccionado
                                </div>
                                <h2 className="text-4xl font-black text-gray-900 dark:text-white font-secondary mb-2">
                                    {selectedCar.name} {selectedCar.model}
                                </h2>
                                <p className="text-sky-600 font-bold mb-6">{selectedCar.type}</p>
                                <CarFeatures variant="summary" />
                            </div>

                            <div className="pt-8 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <p className="text-gray-400 text-sm">Precio total por día</p>
                                        <p className="text-4xl font-black text-gray-900 dark:text-white font-secondary">
                                            ${selectedCar.price}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-500 font-bold text-sm">IVA Incluido</p>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-sky-600 text-white font-bold rounded-2xl shadow-lg shadow-sky-500/30 hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2 group">
                                    <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Confirmar Selección
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SummaryPage;