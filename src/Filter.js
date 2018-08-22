import {logsBuffer} from './components/App';
import {renderLogView} from './components/App';
export function FilterByType() {
    return {
        filterAll() {
            [...document.getElementsByClassName('browser')].map(item => item.hidden = false);
            [...document.getElementsByClassName('common')].map(item => item.hidden = false);
        },

        filterCommon() {
            [...document.getElementsByClassName('browser')].map(item => item.hidden = true);
            [...document.getElementsByClassName('common')].map(item => item.hidden = false);
        },

        filterBrowser() {
            [...document.getElementsByClassName('browser')].map(item => item.hidden = false);
            [...document.getElementsByClassName('common')].map(item => item.hidden = true);
        }
    }
}

export function FilterByDateTimeFunc() {
    let dateFrom = Date.parse(document.getElementById('filterDateFrom').value);
    let dateTo = Date.parse(document.getElementById('filterDateTo').value);
    document.getElementById('logsList').innerHTML = '';
    let localLogsBuffer = logsBuffer;
    localLogsBuffer = localLogsBuffer.filter(log => log.millitime >= dateFrom && log.millitime <= dateTo);
    localLogsBuffer.forEach(log => renderLogView(log));
}