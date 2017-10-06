export default class Apdex {
    constructor(score) {
        this.score = score;
    }

    satisfaction(){
        return this.score;
    }
}