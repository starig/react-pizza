import React, {useContext} from 'react';
import styles from './Search.module.scss';
import {SearchContext} from "../../App";

const Search = () => {
    const {searchValue, setSearchValue} = useContext(SearchContext);

    return (
        <div className={styles.root}>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title/>
                <g data-name="Layer 2" id="Layer_2">
                    <path d="M13,23A10,10,0,1,1,23,13,10,10,0,0,1,13,23ZM13,5a8,8,0,1,0,8,8A8,8,0,0,0,13,5Z"/>
                    <path d="M28,29a1,1,0,0,1-.71-.29l-8-8a1,1,0,0,1,1.42-1.42l8,8a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"/>
                </g>
                <g id="frame">
                    <rect className={styles.cls1}/>
                </g>
            </svg>
            <input value={searchValue}
                   onChange={(event) => setSearchValue(event.target.value)}
                   className={styles.input}
                   placeholder={'Поиск пиццы...'}/>
            {searchValue && <svg className={styles.closeIcon} onClick={() => setSearchValue('')}
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <title/>
                <g id="cross">
                    <line className="cls-1" x1="7" x2="25" y1="7" y2="25"/>
                    <line className="cls-1" x1="7" x2="25" y1="25" y2="7"/>
                </g>
            </svg>}
        </div>
    );
};

export default Search;