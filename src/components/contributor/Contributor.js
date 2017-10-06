
export default class Contributor {
    constructor( name ) {
        this.name = name;
    }

    description(){
        return `${this.name}`;
    }
}