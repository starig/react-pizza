export type PizzaItem = {
    id: string;
    name: string;
    price: number;
    count: number;
    imageUrl: string;
    type: string;
    size: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
};



export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}