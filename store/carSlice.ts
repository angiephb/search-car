import { car, CarState } from '@/types/car';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: CarState = {
    results: [],
    loading: false,
    error: null
};

const getCars = createAsyncThunk(
    'cars/fetchCars',
    async (query: string) => {
        const response = await fetch(`/api/cars?query=${encodeURIComponent(query)}`);
        const data:car[]= await response.json();
        return data;
    }
);

const carSlice = createSlice({
    name: "carResults",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCars.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCars.fulfilled, (state, action) => {
            state.loading = false;
            state.results = action.payload;
        })
        .addCase(getCars.rejected, (state,action) =>{
            state.loading = false;
            state.error = action.error.message || "Error buscando Autos"
        })
    }
})

export default carSlice.reducer;
export { getCars };
