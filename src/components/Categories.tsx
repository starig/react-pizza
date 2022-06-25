import React, {memo} from "react";
import {useWhyDidYouUpdate} from "ahooks";

const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
];

type CategoriesProps = {
    activeCategory: number;
    onClickCategory: (id: number) => void;
    getCategories: (categories: string[]) => void;
    setCurrentCategory: any;
};

const Categories: React.FC<CategoriesProps> = memo(({ activeCategory, onClickCategory, setCurrentCategory, getCategories}) => {

    getCategories(categories);

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, id) => <li
                        key={id}
                        className={activeCategory === id ? `active` : ''}
                        onClick={() => {
                            onClickCategory(id);
                            setCurrentCategory(categories[id]);
                        }}>{categoryName}</li>)
                }

            </ul>
        </div>
    );
});

export default Categories;