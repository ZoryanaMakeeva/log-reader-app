export class Parser {
    getDate(rawText) {
        const dateRegex = /^(\d{4}-\d{2}-\d{2})\s+/;
        return dateRegex.exec(rawText)[1];
    }

    getTime(rawText) {
        const timeRegex = /\s+(\d{2}:\d{2}:\d{2}\.\d{3})\s+/;
        return timeRegex.exec(rawText)[1];
    }

    getMillitime(rawText) {
        const dateTimeRegex = /^(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3})\s+/;
        return Date.parse(dateTimeRegex.exec(rawText)[1]);
    }

    getText(rawText) {
        const dateTimeZoneRegex = /^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\.\d{3}\s+\+\d{2}:\d{2}:(\d{2}:)?/;
        return rawText.replace(dateTimeZoneRegex, "");
    }
}
