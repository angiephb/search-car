interface ErrorProps {
    message: string | null;
    onClick: () => void;
}

export const Error = ({ message, onClick }: ErrorProps) => {
    return (
        <div className="p-10 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800 m-8">
            <p className="text-red-600 dark:text-red-400 font-semibold">{message}</p>
            <button
                onClick={onClick}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
                Reintentar
            </button>
        </div>
    );
}