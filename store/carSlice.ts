import { car, CarState } from '@/types/car';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState: CarState = {
    results: [],
    selectedCar: null,
    loading: false,
    error: null
};

const getCars = createAsyncThunk(
    'cars/fetchCars',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/cars?query=${encodeURIComponent(query)}`);
            if (!response.ok) {
                return rejectWithValue("Error al obtener los vehículos");
            }
            const data: car[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue("Ocurrió un error inesperado");
        }
    }
);

const carSlice = createSlice({
    name: "carResults",
    initialState,
    reducers: {
        setSelectedCar: (state, action) => {
            state.selectedCar = action.payload;
        },
        clearSelectedCar: (state) => {
            state.selectedCar = null;
        }
    },
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
export const { setSelectedCar, clearSelectedCar } = carSlice.actions;
export { getCars };
