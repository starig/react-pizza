import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [activeSortType, setActiveSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    useEffect(() => {
        setIsLoading(true);
        const order = activeSortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = activeSortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : ``;

        fetch(`https://628de4de368687f3e70b7cc3.mockapi.io/items?=${category}&sortBy=${sortBy}&order=${order}`)
            .then(res => {
                return res.json()
            }).then(json => {
            setPizzas(json);
            setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [categoryId, activeSortType]);

    return (
        <div className="container">
            <div className={`content__top`}>
                <Categories activeCategory={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
                <Sort activeSortType={activeSortType} onChangeSort={(id) => setActiveSortType(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(10)].map((item, id) => <PizzaBlockSkeleton key={id}/>)
                        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div>
        </div>
    );
};

export default Home;