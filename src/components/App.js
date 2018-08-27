import React, {Component} from 'react';
import '../App.css';
import { Header } from './Header'
import { FilterableLogTable } from './FilterableLogTable'

export const App = () => (
    <div className='app'>
        <Header/>
        <FilterableLogTable/>
    </div>
);



