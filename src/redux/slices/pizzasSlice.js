import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus', async (params) => {
        const {
            sortBy,
            order,
            category,
            search,
            currentPage
        } = params;
        const { data } = await axios
            .get(`https://628de4de368687f3e70b7cc3.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
            );
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading',
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state) => {
            state.status = 'error';
            state.items = [];
            console.error('error');
        },
    }
});

export const selectPizza = state => state.pizza;

//export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;


