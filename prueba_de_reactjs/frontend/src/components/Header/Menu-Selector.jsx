import React from 'react';
import { NavLink } from 'react-router-dom';
import menu from '../../img/table_rows.svg'
import SearchBar from '../Search-Bar/Search-Bar';

import 'bootstrap/dist/js/bootstrap.bundle';

const MenuSelector = ({editMode}) => {
    return (
        editMode ? (
        <div className="dropdown selector" id="dropdown-menu">
            <img src={menu} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" alt="menu"/>
            <div class="dropdown-menu">
                <NavLink className="dropdown-item" activeClassName="actual" exact to="/">
                    Home
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/create-article">
                    Create Article
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/update-higlights">
                    Update Higlights
                </NavLink>
                <div className="dropdown-divider" ></div>
                <NavLink className="dropdown-item" activeClassName="actual" to="/edit-articles/Article">
                    Edit Articles
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/edit-articles/News">
                    Edit News
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/edit-articles/Review">
                    Edit Reviews
                </NavLink>
            </div>
            <SearchBar/>
        </div>
        )
        :
        (
        <div className="dropdown selector">
            <img src={menu} class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" alt="menu"/>
            <div class="dropdown-menu" id="dropdown-menu">
                <NavLink className="dropdown-item" activeClassName="actual" exact to="/">
                    Home
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/edit-articles/Article">
                    Editor Mode
                </NavLink>
                <div class="dropdown-divider"></div>
                <NavLink className="dropdown-item" activeClassName="actual" to="/filter-news/News">
                    News
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/filter-news/Article">
                    Articles
                </NavLink>
                <NavLink className="dropdown-item" activeClassName="actual" to="/filter-news/Review">
                    Reviews
                </NavLink>
            </div>
            <SearchBar/>
        </div>
        )
    )
}

export default MenuSelector;