import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        name: string;
        price: number;
    }>();
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://628de4de368687f3e70b7cc3.mockapi.io/items/' + id);
                setPizza(data);
                console.log(data)
            } catch (e) {
                alert('Ошибка при получении пиццы!');
                navigate('/');
                console.log(e);
            }
        }

        fetchPizza();
    }, [])

    if (!pizza) {
        return <>'Loading...'</>
    }

    return (
        <div>
            <img src={pizza.imageUrl} alt="Pizza image"/>
            <h2>{pizza.name}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
};

export default FullPizza;