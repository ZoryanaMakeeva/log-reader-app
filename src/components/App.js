import React, {Component} from 'react';
import '../App.css';
import {Header} from './Header'
import {FilterableLogTable} from './FilterableLogTable'

export class App extends Component {
    render() {
        return (
            <div className='app'>
                <Header/>
                <FilterableLogTable/>
            </div>
        );
    }
}




