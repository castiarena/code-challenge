
export default class Request {
    /**
     * Request constructor
     * @param url
     * @param method
     * @param data
     * @param type
     * @returns {{then}|*}
     */
    constructor( url, method, data, type = 'json'){
        this.url = url;
        this.method = method;
        this.data = data;
        this.type = type;

        this.xhr = null;
        this.requestThenCallback = null;

        return this.init();
    }

    init() {
        this.xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() :
            new window.XDomainRequest();

        if (!this.xhr) throw "this browser not support XMLHttpRequest method";

        const credentials = 'withCredentials' in this.xhr || this.xhr.hasOwnProperty('withCredentials');

        this.xhr.open(this.method, this.url, credentials);

        if (this.method === 'post') {
            this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        this.xhr.send(
            this.parseData() !== '' ?
                this.parseData():
                undefined
        );

        return {
            then: this.requestThenHandler.bind(this)
        }
    }

    requestThenHandler(callback) {
        this.xhr.onreadystatechange = this.requestOnReadyStateChangeHandler.bind(this);
        this.requestThenCallback = callback;
    }

    requestOnReadyStateChangeHandler() {
        let response = this.xhr.responseText;
        if (this.type === 'json' && response && this.xhr.readyState === XMLHttpRequest.DONE ) {
            response = JSON.parse(response);
        }

        if ( this.xhr.readyState === XMLHttpRequest.DONE && this.xhr.status === 200 ) {
            this.requestThenCallback(response, this.xhr.status);
        }

        if(this.xhr.readyState === XMLHttpRequest.DONE && this.xhr.status === 404){
            this.requestThenCallback(response, this.xhr.status);
        }
    }


    parseData() {
        if(!this.data){
            return;
        }

        if(typeof this.data === 'string'){
            return this.data;
        }

        return Object.keys(this.data).map( key => {
            return `${key}=${this.data[key]}`
        }).join('&');
    }
}