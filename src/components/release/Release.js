export default class Release {
    constructor(version) {
        this.version = version;
    }
    description(){
        return `version ${this.version}`;
    }
}