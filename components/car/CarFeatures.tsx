import { Users, Fuel, Gauge } from "lucide-react";

interface CarFeatures {
    variant?: "compact" | "summary";
}

export const CarFeatures = ({ variant = "compact" }: CarFeatures) => {
    const features = [
        { icon: Users, label: "Capacidad", value: "5 Plazas" },
        { icon: Fuel, label: "Combustible", value: "Híbrido" },
        { icon: Gauge, label: "Tracción", value: "Automático" },
    ];

    return (
        variant === "summary" ?
            <div className="space-y-4 mb-8">
                {features.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">{item.label}</p>
                            <p className="font-semibold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            :
            <div className="flex flex-col sm:flex-row gap-6 py-4 text-gray-500 dark:text-gray-400">
                {features.map((item, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <span className="text-xs font-medium">{item.value}</span>
                    </div>
                ))}
            </div>
    );
};
