export class Log {
    constructor() {

    }


    static logObject(obj) {
        for(var prop in obj) {
            console.log(prop, obj[prop]);
        }
    }

}