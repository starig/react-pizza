import React from 'react';
import styles from './NotFoundBlock.module.scss';
import {Link} from "react-router-dom";

const NotFoundBlock = () => {
    return (
        <div className={`${styles.root}`}>
            <span>😶</span>
            <br />
            <h4>Ничего не найдено</h4>
            <p>К сожалению, в нашем интернет магазине такой страницы не существует</p>
            <Link to={''}>
                <button className={`button button--black`}>Вернуться назад</button>
            </Link>
        </div>
    );
};

export default NotFoundBlock;