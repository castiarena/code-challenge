import Events from './Events';

export default class Spa extends Events{
    constructor(rootElement, views) {
        super({
            'start': null
        }, 'Spa');
        window.addEventListener('load', e => this.init(rootElement, views));
    }

    init(rootElement, views){
        this.trigger('start');
        this._rootElement = rootElement;
        this.views = views;

        this.views.showOn(this._rootElement);
    }
}