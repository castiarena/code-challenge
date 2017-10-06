import Request from './Request';

export default class Get extends Request {
    /**
     * Get request constructor
     * @param url
     * @param data
     * @param type
     */
    constructor(url, data , type = 'json'){
        super(url, 'get', data, type);
    }
}
