export const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-12 h-12 md:w-24 md:h-24 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-base md:text-lg font-medium animate-pulse">Buscando los mejores vehículos para ti...</p>
        </div>
    );
}