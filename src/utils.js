import JSZip from "jszip";
import { Log } from "./Log";
import { Parser } from "./Parser";

export function getPromisesForLogs(zipFile) {
    return JSZip.loadAsync(zipFile[0])
                .then(loadedZipFile => getPromises(loadedZipFile))
                .catch(e => console.log(e));

    function getPromises(loadedZipFile) {
        const files = loadedZipFile.files || {};
        const promisesForLogs = Object.keys(files).filter(key => isAppropriateFileName(key) )
                                                  .map(name => createObjectFromFile(files, name))
                                                  .map(obj => obj.promiseForText.then(text => getLogsArray(text, obj)));
        return Promise.all(promisesForLogs)
    }

    function isAppropriateFileName(key) {
        return key.includes('common') || key.includes('browser');
    }

    function createObjectFromFile(files, name, obj = {}) {
        obj.promiseForText = files[name].async('text');
        obj.fileName = name;
        return obj;
    }

    function getLogsArray(rawFileText, obj) {
        const dateTimeRegex = '\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\.\\d{3}';
        const logRegex = new RegExp('^(' + dateTimeRegex + '.+?)(?=\\n' + dateTimeRegex + '|\\n^$)', 'gms');
        return rawFileText.match(logRegex)
                          .map(logString => {
                              const parser = new Parser();
                              return new Log(
                                  parser.getDate(logString),
                                  parser.getTime(logString),
                                  parser.getMillitime(logString),
                                  parser.getText(logString),
                                  obj.fileName)}
                          );
    }
}

export function getInitialDate(logs, index) {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    const millitime = logs[index].millitime;
    return new Date(millitime - timeZoneOffset).toISOString().slice(0, -1);
}

export function matchFilters(log, props) {
    return !(notMatchSearchString() ||
             isNotCommonLog() ||
             isNotBrowserLog() ||
             notMatchTimeInterval());

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

