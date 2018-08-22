import React from 'react';
import ReactDOM from 'react-dom';
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import {matchFilters} from "../utils";
import {LogRow} from "./LogRow"; // only needs to be imported once

// Table data as an array of objects
const list = [
    { name: 'Brian Vaughn', description: 'Software engineer' }
    // And so on...
];

export class LogTable extends React.Component {
    render() {
        let rows = this.props.logs.filter(log => !!log)
                            .filter(log => matchFilters(log, this.props))
                            .map((log, index) => <LogRow log={log} key={index}/>);
        return (
            <table className='table'>
                {rows.length > 0 ?
                    <thead>
                    <th className='table-data log-date sticky'>Date</th>
                    <th className='table-data log-time sticky'>Time</th>
                    <th className='table-data log-text center sticky'>Browser Logs</th>
                    <th className='table-data log-text center sticky'>Common logs</th>
                    </thead> :
                    ''
                }
                <tbody>{rows}</tbody>
            </table>
        );
    }
}
// Render your table
ReactDOM.render(
    <Table
        width={300}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
    >
        <Column
            label='Name'
            dataKey='name'
            width={100}
        />
        <Column
            width={200}
            label='Description'
            dataKey='description'
        />
    </Table>,
    document.getElementById('example')
);