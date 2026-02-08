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
  loading: boolean;
  error: string | null;
}

