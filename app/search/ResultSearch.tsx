import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCars } from "@/store/carSlice";
import { useSearchParams } from "next/navigation";
import { car } from "@/types/car";

export const ResultSearch = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { results, loading, error } = useSelector((state: RootState) => state.cars);
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    useEffect(() => {
        if (query) {
            dispatch(getCars(query));
        }
    }, [query, dispatch]);

    return (
        <div>
            {results.map(element => (
                <div key={element.id}>{element.name} {element.model} ${element.price} USD</div>
            ))}
        </div>
    );
}
