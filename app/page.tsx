import { city } from "@/types/city";
import { SearchInput } from "@/components/SearchInput";

export default async function Home({ searchParams }: any) {
    const params = await searchParams;
    const query = (params.query as string) ?? "";

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cities?query=${query}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return <div className="p-24 text-center">Error cargando ciudades</div>;
    }

    const cities: city[] = await res.json();

    return (
        <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <div className="relative py-20 px-6 md:px-12 flex flex-col items-center">
                <div className="text-center  mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-sky-600 dark:text-gray-300 font-secondary tracking-tight">
                       Alquila el auto que necesitas hoy
                    </h1>
                </div>

                <SearchInput data={cities} />
            </div>
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sky-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-[60%] -right-[10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px]"></div>
            </div>
        </main>
    );
}
