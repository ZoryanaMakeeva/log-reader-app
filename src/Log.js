export class Log {
    constructor(date, time, millitime, text, name) {
        this.date = date;
        this.time = time;
        this.millitime = millitime;
        this.text = text;
        this.name = name;
        this.type = this.name.includes('browser') ? 'BROWSER' : 'COMMON';
        this.common = this.name.includes('common') ? this.text : '';
        this.browser = this.name.includes('browser') ? this.text : '';
    }
}
