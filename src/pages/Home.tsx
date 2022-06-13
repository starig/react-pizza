import React, {useEffect, useRef, useState} from 'react';
import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import {fetchPizzas, selectPizza} from "../redux/slices/pizzasSlice";
import NotFoundBlock from "../components/NotFoundBlock/NotFoundBlock";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);
    const activeSortType = sort.sortProperty;

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    };

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
            // @ts-ignore
            fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage
        }));

    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: activeSortType,
                categoryId,
                currentPage
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, activeSortType, currentPage])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])

    useEffect(() => {
        getPizzas();
        window.scrollTo(0, 0);
        isSearch.current = false;
    }, [categoryId, activeSortType, searchValue, currentPage]);


    const pizzas = items.map(pizza =>  <PizzaBlock key={pizza.id} {...pizza}/>);

    const skeletons = [...new Array(10)].map((item, id) => <PizzaBlockSkeleton key={id}/>);

    return (
        <div className="container">
            <div className={`content__top`}>
                <Categories activeCategory={categoryId} setCurrentCategory={(name) => setCurrentCategory(name)}
                            onClickCategory={onClickCategory}/>
                <Sort/>
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