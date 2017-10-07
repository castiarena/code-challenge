export default class View {
    constructor( name, tagName = 'div', childViews = [] ) {
        this.name = name;
        this.elem = document.createElement(tagName);
        this.childViews = childViews;
    }

    template(template , data){
        this.elem.innerHTML = this.compile(template, data);
    }

    compile(template, data){
        Object.keys(data).forEach( key => {
            template = template.replace( new RegExp( `{{${key}}}` , 'g'), data[key]);
        });
        return template
    }

    content( string ) {
        this.elem.textContent = string;
    }

    addView(view){
        this.childViews.push(view);
        this.render();
    }

    render(){
        this.childViews.forEach(childView => childView.showOn(this.elem));
    }

    showOn( elem ) {
        elem.appendChild(this.elem);
    }
}