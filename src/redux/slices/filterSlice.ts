import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";


export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    NAME_DESC = 'NAME',
    NAME_ASC = '-NAME',
    PRICE_DESC = 'name',
    PRICE_ASC = '-name',
}
export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
    categoryId: number;
    currentPage: number;
    searchValue: string;
    sort: Sort;
}


const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
    },
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length){
                state.currentPage = Number(action.payload.currentPage);
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                }
            }

        }
    }
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
