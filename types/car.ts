export type car = {
    id: number,
    name: string,
    model: string,
    type: string,
    price: number,
    cityName: string,
    image: string
}


export interface CarState {
  results: car[];
  selectedCar: car | null;
  loading: boolean;
  error: string | null;
}

