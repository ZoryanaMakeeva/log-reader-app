import React from "react";
import {getPromisesForLogs} from "../utils";
import {getInitialDate} from "../utils";
import {SearchBar} from "./SearchBar";
import {LogTable} from "./LogTable";
import {LoadingSpinner} from './LoadingSpinner'

export class FilterableLogTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logContainer: [],
            filterText: '',
            commonOnly: false,
            browserOnly: false,
            pickedDateFrom: '',
            pickedDateTo: '',
            loading: false
        };
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleCommonOnlyChange = this.handleCommonOnlyChange.bind(this);
        this.handleBrowserOnlyChange = this.handleBrowserOnlyChange.bind(this);
        this.handleDateStartChange = this.handleDateStartChange.bind(this);
        this.handleDateEndChange = this.handleDateEndChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText,
        })
    }

    handleCommonOnlyChange(commonOnly) {
        this.setState({
            commonOnly: commonOnly
        });
    }

    handleBrowserOnlyChange(browserOnly) {
        this.setState({
            browserOnly: browserOnly
        });
    }

    handleDateStartChange(pickedDateFrom) {
        this.setState({
            pickedDateFrom: pickedDateFrom
        })
    }

    handleDateEndChange(pickedDateTo) {
        this.setState({
            pickedDateTo: pickedDateTo
        })
    }

    handleFileUpload(zipFiles) {
        this.setState({loading: true}, () => {
            getPromisesForLogs(zipFiles)
                .then(allLogs => {
                    let logs = allLogs.reduce((acum, current) => acum.concat(current))
                                      .sort((a, b) => a.millitime - b.millitime);
                    this.setState({
                        logContainer: logs,
                        pickedDateFrom: getInitialDate(logs, 0),
                        pickedDateTo: getInitialDate(logs, logs.length - 1),
                        loading: false
                    });
                })
                .catch(e => console.log(e));
        });
    }

    render() {
        let logs = this.state.logContainer.length > 0 ? this.state.logContainer : [];
        let loading = this.state.loading;
        return (
            <div>
                <form>
                    <input type='file'
                           onChange={(e) => this.handleFileUpload(e.target.files)}
                           className='file-upload'/>
                </form>
                <SearchBar
                    filterText={this.state.filterText}
                    commonOnly={this.state.commonOnly}
                    browserOnly={this.state.browserOnly}
                    pickedDateFrom={this.state.pickedDateFrom}
                    pickedDateTo={this.state.pickedDateTo}
                    onFilterTextChange={this.handleFilterTextChange}
                    onCommonChange={this.handleCommonOnlyChange}
                    onBrowserChange={this.handleBrowserOnlyChange}
                    onDateStartChange={this.handleDateStartChange}
                    onDateEndChange={this.handleDateEndChange}/>
                {loading ? <LoadingSpinner/> : logs.length > 0 &&
                <LogTable
                    logs={logs}
                    filterText={this.state.filterText}
                    commonOnly={this.state.commonOnly}
                    browserOnly={this.state.browserOnly}
                    pickedDateFrom={this.state.pickedDateFrom}
                    pickedDateTo={this.state.pickedDateTo}/>
                }
            </div>
        )
    }
}