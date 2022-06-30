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