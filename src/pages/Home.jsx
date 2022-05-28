import React from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import {useEffect, useState} from "react";

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://628de4de368687f3e70b7cc3.mockapi.io/items')
            .then(res => {
                return res.json()
            }).then(json => {
            setPizzas(json);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            <div className={`content__top`}>
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(10)].map((item, id) => <PizzaBlockSkeleton key={id}/>)
                        : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)
                }
            </div>
        </>
    );
};

export default Home;