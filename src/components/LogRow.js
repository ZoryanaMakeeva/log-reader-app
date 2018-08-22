import React from "react";

export class LogRow extends React.Component {
    render() {
        let browserCellContent = this.props.log.type === 'BROWSER' ? this.props.log.text : '';
        let commonCellContent = this.props.log.type === 'COMMON' ? this.props.log.text : '';
        return (
            <tr className='table-row'>
                <td className='table-data log-date'>{this.props.log.date}</td>
                <td className='table-data log-time'>{this.props.log.time}</td>
                <td className='table-data log-text'>{browserCellContent}</td>
                <td className='table-data log-text'>{commonCellContent}</td>
            </tr>
        )
    }
}