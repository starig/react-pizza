import React from "react";


function Categories ({ activeCategory, onClickCategory, setCurrentCategory}) {

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианские',
        'Гриль',
        'Острые',
        'Закрытые',
    ];


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
}

export default Categories;