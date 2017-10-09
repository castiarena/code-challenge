import Contributor from '../contributor/Contributor';
import Apdex from '../apdex/Apdex';
import Host from '../host/Host';


export default class Application {
    /**
     * Constructor
     * @param data.name String
     * @param data.appdex Integer
     * @param data.contributors Array
     * @param data.host Array
     * @param data.version Integer
     */
    constructor( data ) {
        this.name = data.name;
        this.apdex = new Apdex(data.apdex);
        this.contributors = data.contributors.map( name =>
            new Contributor(name)
        );
        this.version = data.version;
        this.host = data.host.map( url => new Host(url));
    }

    satisfaction(){
        return this.apdex.satisfaction();
    }

    print(){
        return `${this.apdex.satisfaction()} ${this.name}`
    }

    findHost( hostName ){
        return this.host.find( host => host.url() === hostName);
    }
}