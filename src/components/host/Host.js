export default class Host {
    constructor(url) {
        this.url = url;
        this.app = null;
    }

    description(){
        return this.url;
    }

    domain(){
        return `${this.url.split('.')[1]}.${this.url.split('.')[2]}`
    }

    name(){
        return `${this.url.split('.')[0]}`;
    }

    deploy(application){
        this.app = application;
    }
}