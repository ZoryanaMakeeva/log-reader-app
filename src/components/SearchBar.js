import React from "react";

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleCommonOnlyChange = this.handleCommonOnlyChange.bind(this);
        this.handleBrowserOnlyChange = this.handleBrowserOnlyChange.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleCommonOnlyChange(e) {
        this.props.onCommonChange(e.target.checked)
    }

    handleBrowserOnlyChange(e) {
        this.props.onBrowserChange(e.target.checked)
    }

    handleDateStartChange(e) {
        this.props.onDateStartChange(e.target.value)
    }

    handleDateEndChange(e) {
        this.props.onDateEndChange(e.target.value)
    }

    render() {
        return (
            <form>
                <div>
                    <input type='search'
                           placeholder='Search...'
                           value={this.props.filterText}
                           onChange={this.handleFilterTextChange}
                           className='search-input'/>
                </div>
                <div className='type-of-log-filter'>
                    <span className='common-log-filter'>
                        <input type='checkbox'
                               checked={this.props.commonOnly}
                               onChange={this.handleCommonOnlyChange}/>
                        {' '}
                        Only show common logs
                    </span>
                    <span className='browser-log-filter'>
                        <input type='checkbox'
                               checked={this.props.browserOnly}
                               onChange={this.handleBrowserOnlyChange}/>
                        {' '}
                        Only show browser logs
                    </span>
                </div>
                <div className='time-filter'>
                    <span>
                        From
                        {' '}
                        <input type='datetime-local'
                               value={this.props.pickedDateFrom}
                               onChange={this.handleDateStartChange}
                               className='time-filter-from'/>
                    </span>
                    <span>
                        To
                        {' '}
                        <input type='datetime-local'
                               value={this.props.pickedDateTo}
                               onChange={this.handleDateEndChange}
                               className='time-filter-to'/>
                    </span>
                </div>
            </form>
        );
    }
}