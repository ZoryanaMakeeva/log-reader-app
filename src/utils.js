import JSZip from "jszip";
import {Log} from "./Log";

export function getPromisesForLogs(zipFile) {
    return JSZip.loadAsync(zipFile[0])
                .then(loadedZipFile => getLogsAllPromises(loadedZipFile))
                .catch(e => console.log(e));

    function getLogsAllPromises(loadedZipFile) {
        const files = loadedZipFile.files || {};
        const promisesForLogs = Object.keys(files).filter(key => key.includes('common') || key.includes('browser'))
                                                  .map(name => createObjectWithPromiseForText(files, name))
                                                  .map(obj => obj.promiseForText.then(text => getLogsArray(text, obj)));
        return Promise.all(promisesForLogs)
    }

    function createObjectWithPromiseForText(files, name, result = {}) {
        result.promiseForText = files[name].async('text');
        result.fileName = name;
        return result;
    }

    function getLogsArray(content, file) {
        const dateTimeRegex = '\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\.\\d{3}';
        const logRegex = new RegExp('^(' + dateTimeRegex + '.+?)(?=\\n' + dateTimeRegex + '|\\n^$)', 'gms');

        return content.match(logRegex)
                      .filter(match => !!match && match.length > 1)
                      .map(log => new Log(
                          getDate(log),
                          getTime(log),
                          getMillitime(log),
                          getText(log),
                          getFileName(file))
                      );
    }

    function getDate(logString) {
        const dateRegex = /^(\d{4}-\d{2}-\d{2})\s+/;
        return dateRegex.exec(logString)[1];
    }

    function getTime(logString) {
        const timeRegex = /\s+(\d{2}:\d{2}:\d{2}\.\d{3})\s+/;
        return timeRegex.exec(logString)[1];
    }

    function getMillitime(logString) {
        const dateTimeRegex = /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})\s+/;
        return Date.parse(dateTimeRegex.exec(logString)[1]);
    }

    function getText(logString) {
        const dateTimeZoneRegex = /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3}\s+\+\d{2}:\d{2}:(\d{2}:)?/;
        return logString.replace(dateTimeZoneRegex, "");
    }

    function getFileName(file) {
        return file.fileName;
    }
}

export function getInitialDate(logs, index) {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const millitime = logs[index].millitime;
    return new Date(millitime - timeZoneOffset).toISOString().slice(0, -1);
}

export function matchFilters(log, props) {
    return !(notMatchSearchString() || isNotCommonLog() ||
             isNotBrowserLog() || notMatchTimeInterval());

    function notMatchSearchString() {
        return log.text.match(new RegExp(props.filterText, 'gi')) === null;
    }

    function isNotCommonLog() {
        return props.commonOnly && !log.name.includes('common');
    }

    function isNotBrowserLog() {
        return props.browserOnly && !log.name.includes('browser');
    }

    function notMatchTimeInterval() {
        return log.millitime < Date.parse(props.pickedDateFrom) ||
               log.millitime > Date.parse(props.pickedDateTo);
    }
}