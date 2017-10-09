import Host from '../host/Host';

export default class ApplicationsList{
    constructor( applications ){
        this.applications = applications;
        this.max = 25;
    }

    getTopAppsByHost( hostName , cant = this.max){
        this.orderByApdex();
        const apps = Object.assign([], this.applications);

        return apps.filter( app =>
            app.host.some( host =>
                host.url() === hostName
            ) ? app : null
        ).splice(0, cant);
    }

    addAppToHosts(app, host){
        app.host.push(new Host(host));
    }

    removeAppFromHosts(app, host){
        app.host.splice( app.findHost(host) , 1);
    }

    orderByApdex(){
        this.applications.sort( (app1 , app2) =>{
            const diff = app1.satisfaction() - app2.satisfaction();
            if(diff === 0) return 0;
            if(diff < 0) return 1;
            if(diff > 0) return -1;
        });
    }

    findAppByIndex(index){
        return this.applications[index];
    }

    print(){
        return this.applications.map(app => app.print()).join('\n');
    }

    getAllHosts(){
        let allHosts = {};
        this.applications.forEach(app => {
            app.host.forEach(host => {
                allHosts[host.url()] = host;
            });
        });
        return Object.keys(allHosts).map( key => key);
    }
}