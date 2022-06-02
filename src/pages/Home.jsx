import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import Pagination from "../components/Pagination/Pagination";

const Home = ({ searchValue }) => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [activeSortType, setActiveSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    });
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        const order = activeSortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = activeSortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const search = searchValue ? `&search=${searchValue}` : ``;


        fetch(`https://628de4de368687f3e70b7cc3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                return res.json()
            }).then(json => {
            setPizzas(json);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, activeSortType, searchValue, currentPage]);

    const items = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>);

    const skeletons = [...new Array(10)].map((item, id) => <PizzaBlockSkeleton key={id}/>);



    return (
        <div className="container">
            <div className={`content__top`}>
                <Categories activeCategory={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
                <Sort activeSortType={activeSortType} onChangeSort={(id) => setActiveSortType(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : items
                }
            </div>
            <Pagination onChangePage={(number) => setCurrentPage(number)}/>
        </div>
    );
};

export default Home;