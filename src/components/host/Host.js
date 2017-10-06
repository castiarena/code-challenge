export default class Host {
    constructor(url) {
        this._url = url;
    }

    domain(){
        return `${this.url().split('.')[1]}.${this.url().split('.')[2]}`
    }

    name(){
        return `${this.url().split('.')[0]}`;
    }

    url(){
        return this._url;
    }
}