
export default class Events {
    constructor(events = {}, name = 'Events'){
        this._events = events;
        Object.keys(this._events).forEach(eventName =>{
            this._events[eventName] = [];
        });
    }

    on(event, callback){
        if(event in this._events){
            this._events[event].push(callback);
            return;
        }
        throw `${event} not found: try with one of ${JSON.stringify(this._events)}`;
    }

    trigger(event, injected){
        if(event in this._events){
            Object.keys(this._events).forEach( event =>
                this._events[event].forEach(fn =>
                    fn(injected)
                )
            );
            return;
        }
        throw `${event} not found: try with one of ${JSON.stringify(this._events)}`;
    }

}