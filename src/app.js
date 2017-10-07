import { Get } from './request';
import { Spa , View } from './spa';
import { ApplicationsList , Application } from './components';

const hosts = [
    '7e6272f7-098e.dakota.biz',
    '1d717554-bf17.sydnie.name',
    '9a450527-cdd9.kareem.info'
];

const pageView = new View('hosts', 'main');
const spa = new Spa( document.querySelector('body'), pageView);

spa.on('start', () => {

    const hostsData = new Get(`http://localhost:9000/host-app-data.json`);
    hostsData.then( data => {
        const applications = data.map(data => new Application(data));
        const appsList = new ApplicationsList(applications);

        hosts.forEach( host => {
            const applicationsByHost = appsList.getTopAppsByHost(host);
            const li = new View('item', 'li');

            const list = applicationsByHost.map( app =>
                `<li><a href="#" spa:on:click="show"><span>${app.satisfaction()}</span> ${app.name}</a>`
            ).join('');

            const view = new View( host, 'section');
            view.template(
                '<article class="app-lists">' +
                    '<h2>{{title}}</h2>'+
                    '<ul>{{list}}</ul>'+
                '</article>', {
                    title: host,
                    list
                }
            );
            pageView.addView(view);
        });
    });


});

