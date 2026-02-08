"use client";
import {Suspense} from "react";
import { ResultSearch } from "./ResultSearch";


export default function SearchResult() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultSearch />
        </Suspense>
    );
}
