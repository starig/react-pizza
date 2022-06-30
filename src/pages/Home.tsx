import React, {useCallback, useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {fetchPizzas,} from "../redux/slices/pizza/slice";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";
import {useAppDispatch} from "../redux/store";
import {selectFilter} from "../redux/slices/filter/selectors";
import {setCategoryId, setCurrentPage} from "../redux/slices/filter/slice";
import {selectPizza} from "../redux/slices/pizza/selectors";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);


    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);
    const activeSortType = sort.sortProperty;

    const onClickCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id))
    }, []);

    const onChangePage = (pageNum: number) => {
        dispatch(setCurrentPage(pageNum));
    }

    const [currentCategory, setCurrentCategory] = useState('Все');

    const getPizzas = async () => {
        const order = activeSortType.includes('-') ? 'asc' : 'desc';
        const sortBy = activeSortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : ``;
        const search = searchValue ? `&search=${searchValue}` : ``;


        dispatch(
            fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
        }));

    }

    useEffect(() => {
        getPizzas();
        window.scrollTo(0, 0);
        isSearch.current = false;
    }, [categoryId, activeSortType, searchValue, currentPage]);


    const pizzas = items.map(pizza =>  <PizzaBlock types={[]} sizes={[]} key={pizza.id} {...pizza}/>);

    const skeletons = [...new Array(10)].map((item, id) => <PizzaBlockSkeleton key={id}/>);

    return (
        <div className="container">
            <div className={`content__top`}>
                <Categories activeCategory={categoryId}
                            getCategories={() => {}}
                            setCurrentCategory={(name) => setCurrentCategory(name)}
                            onClickCategory={onClickCategory}/>
                <Sort sort={sort}/>
            </div>
            <h2 className="content__title">{currentCategory} пиццы</h2>
            {
                status === 'error' ? <NotFoundBlock /> : <div className="content__items">
                    {
                        status === 'success' ? pizzas : skeletons
                    }
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={(num) => onChangePage(num)}/>
        </div>
    );
};

export default Home;