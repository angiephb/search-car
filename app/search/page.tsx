import { Suspense } from "react";
import { ResultSearch } from "./ResultSearch";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { car } from "@/types/car";

export default async function SearchResult({ searchParams }: any) {
    let initialCars = [];
    const params = await searchParams;
    const query = (params.query as string) ?? "";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/cars?query=${encodeURIComponent(query)}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return <div className="p-24 text-center">Error cargando vehiculos</div>;
    }

    initialCars = await res.json();

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-10">
                    <Link
                        href="/"
                        className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-sky-600 transition-colors" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white font-secondary">Resultados de búsqueda</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Vehículos disponibles para tus fechas</p>
                    </div>
                </div>

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center p-20 gap-4">
                        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400 font-medium tracking-wide">Cargando resultados...</p>
                    </div>
                }>
                    <ResultSearch initialData={initialCars} query={query} />
                </Suspense>
            </div>
        </main>
    );
}
