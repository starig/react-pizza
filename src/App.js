import React, {useEffect, useState} from 'react';
import './scss/app.scss';
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";


function App() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch('https://628de4de368687f3e70b7cc3.mockapi.io/items')
            .then(res => {
                return res.json()
            }).then(json => {
            setPizzas(json);
        });
    }, [])



    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
