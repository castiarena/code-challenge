
export default class Events {
    constructor(events = {}, name = 'Events'){
        this._customEvents = events;
        Object.keys(this._customEvents).forEach(eventName =>{
            this._customEvents[eventName] = [];
        });
    }

    on(event, callback){
        if(event in this._customEvents){
            this._customEvents[event].push(callback);
            return;
        }
    }

    trigger(event, injected){
        if(event in this._customEvents){
            Object.keys(this._customEvents).forEach( event =>
                this._customEvents[event].forEach(fn =>
                    fn(injected)
                )
            );
            return;
        }
    }

}