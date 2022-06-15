import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "axios";
import {RootState} from "../store";
import {CartItem} from "./cartSlice";
import {Sort} from "./filterSlice";

type PizzaItem = {
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

interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
};

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
}

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus', async (params) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage
        } = params;
        const { data } = await axios
            .get<CartItem[]>(`https://628de4de368687f3e70b7cc3.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
            );
        return data;
    }
);

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
            console.error('error');
        });
    },
});

export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;


