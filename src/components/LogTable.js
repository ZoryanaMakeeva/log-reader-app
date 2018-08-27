import React from "react";
import {matchFilters} from "../utils";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import '../App.css';

export class LogTable extends React.Component {
    render() {
        let rows = this.props.logs.filter(log => !!log && matchFilters(log, this.props));
        let columns = [{
            Header: 'Date',
            accessor: 'date',
            maxWidth: 150,
        }, {
            Header: 'Time',
            accessor: 'time',
            maxWidth: 150,
        }, {
            Header: 'Browser',
            accessor: 'browser',
        }, {
            Header: 'Common',
            accessor: 'common',
        }];
        return (
            <ReactTable
                data={rows}
                columns={columns}
                defaultPageSize={50}
                style={{
                    height: "600px"
                }}
                className="-striped -highlight"
            />
        );
    }
}