import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header';
import HomePage from './home_page';
import StorePage from '../containers/store_page';
import CategoryOfferPage from '../containers/category_offers_page';
import CategoryStorePage from '../containers/category_stores_page';
import js from '../assets/js/common.js';
import style from '../../style/common.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/stores/:category_name/" component={HomePage}/>
                    <Route path="/offer/:category_name/:sub_category_name?" component={CategoryOfferPage}/>
                    <Route path="/store/:store_name/:category_name?" component={StorePage}/>
                </Switch>
            </div>
        )
    }
}
