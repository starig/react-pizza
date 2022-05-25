import React, {useState} from "react";


function Categories () {
    const [activeCategory, setActiveCategory] = useState(0);

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ]

    const setCategory = (categoryNumber) => {
        setActiveCategory(categoryNumber);
    }

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, id) => <li
                        key={id}
                        className={activeCategory === id ? `active` : ''}
                        onClick={() => setCategory(id)}>{item}</li>)
                }

            </ul>
        </div>
    );
}

export default Categories;