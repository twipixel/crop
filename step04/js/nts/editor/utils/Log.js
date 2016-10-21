export class Log {
    constructor() {

    }


    static logObject(obj) {
        for prop in obj {
            console.log(prop, obj[prop]);
        }
    }

}