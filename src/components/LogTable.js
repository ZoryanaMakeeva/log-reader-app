import React from "react";
import {matchFilters} from "../utils";
import {LogRow} from "./LogRow";

export class LogTable extends React.Component {
    render() {
        let rows = this.props.logs.filter(log => !!log && matchFilters(log, this.props))
                                  .map((log, index) => <LogRow log={log} key={index}/>);
        return (
            <table className='table'>
                {rows.length > 0 ?
                    <thead>
                    <tr>
                        <th className='table-data log-date sticky'>Date</th>
                        <th className='table-data log-time sticky'>Time</th>
                        <th className='table-data log-text center sticky'>Browser Logs</th>
                        <th className='table-data log-text center sticky'>Common logs</th>
                    </tr>
                    </thead> :
                    ''
                }
                <tbody>{rows}</tbody>
            </table>
        );
    }
}