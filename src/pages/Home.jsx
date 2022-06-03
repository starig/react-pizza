import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const {categoryId, sort, currentPage} = useSelector(state => state.filter);
    const activeSortType = sort.sortProperty;

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    };

    const onChangePage = (pageNum) => {
        dispatch(setCurrentPage(pageNum));
    }

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentCategory, setCurrentCategory] = useState('Все');
    const {searchValue} = useContext(SearchContext);

    useEffect(() => {
        setIsLoading(true);
        const order = activeSortType.includes('-') ? 'asc' : 'desc';
        const sortBy = activeSortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const search = searchValue ? `&search=${searchValue}` : ``;

        axios.get(`https://628de4de368687f3e70b7cc3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(res => {
                setPizzas(res.data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, activeSortType, searchValue, currentPage]);

    const items = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza}/>);

    const skeletons = [...new Array(10)].map((item, id) => <PizzaBlockSkeleton key={id}/>);



    return (
        <div className="container">
            <div className={`content__top`}>
                <Categories activeCategory={categoryId} setCurrentCategory={(name) => setCurrentCategory(name)}
                            onClickCategory={onClickCategory}/>
                <Sort />
            </div>
            <h2 className="content__title">{currentCategory} пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeletons : items
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={(num) => onChangePage(num)}/>
        </div>
    );
};

export default Home;