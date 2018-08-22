import {Component} from "react";
import React from "react";

export class Header extends Component {
    render() {
        return (
            <header>
                <h1 className='app-title'>{'logs investigator'}</h1>
                <h2 className='app-description'>{'read and analyze logs from zipped archive'}</h2>
            </header>
        )
    }
}