import './_normalize.scss';
import './_app.scss';
import { Get } from './request';
import { Spa , View } from './spa';
import { ApplicationsList , Application } from './components';


const hosts = [
    '7e6272f7-098e.dakota.biz',
    '1d717554-bf17.sydnie.name',
    '9a450527-cdd9.kareem.info'
];

const spa = new Spa( document.querySelector('body'));
spa.on('start', () => {

    const hostsData = new Get(`http://localhost:9000/host-app-data.json`);
    hostsData.then( data => {
        const applications = data.map(data => new Application(data));
        const appsList = new ApplicationsList(applications);
        const hosts = appsList.getAllHosts();
        const pageView = new View('hosts',
            '<main class="main-content">' +
                '<section class="app-row">' +
                    '<div class="app-grid--inline">'+
                        '<h1 class="app-list--title">Apps by Host</h1>' +
                        '<p class="app-list--description">for user {{user}}</p>' +
                    '</div>'+
                    '<div class="app-grid--inline">' +
                        '<input class="app-checkbox--as-list" data-event="onChange" type="checkbox" id="asList" name="asList">' +
                        '<label for="asList" class="apps-as-list--toggle">' +
                            'Show as list' +
                        '</label>'+
                    '</div>'+
                '</section>'+
                '<section class="app-row" data-change>' +
                    '{{hostListViews}}' +
                '</section>'+
            '</main>', {
                user: 'averylongnemailaddress@companyname.com',
                onChange: (e) => {
                    const toggleClass = 'app-row-list';
                    const toggleElem = document.querySelector('[data-change]');
                    toggleElem.className = toggleElem.className.match(toggleClass) ?
                        toggleElem.className.replace( new RegExp(' '+toggleClass), ''):
                        toggleElem.className +' '+ toggleClass;
                    e.target.parentNode.querySelector('.apps-as-list--toggle').innerHTML =
                        toggleElem.className.match(toggleElem) ?
                            'Show as grid' : 'Show as list';
                },
                hostListViews: () => hosts.map( host => {
                    return new View(host,
                        '<article class="app-grid app-list--wrapper">' +
                            '<h2 class="host-title">{{host}}</h2>' +
                            '<ul class="app-list">{{appsViewList}}</ul>' +
                        '</article>', {
                            host,
                            appsViewList: () =>
                                appsList.getTopAppsByHost(host, 5).map(app =>
                                    new View(app.name,
                                        '<li class="app-list--item" data-event="onClick">' +
                                            '<p class="app-name">' +
                                                '<span class="app-apdex">{{apdex}}</span>' +
                                                '<span class="app-name--wrapper">{{name}}</span>' +
                                            '</p>' +
                                        '</li>', {
                                            onClick: () =>{
                                                alert(`${app.name} \n version: ${app.version}`)
                                            },
                                            apdex: app.satisfaction(),
                                            name: app.name
                                        })
                                )
                        })
                })
            }
        );

        spa.renderViews([
            pageView
        ]);

        spa.bindEvents(document.querySelectorAll('[data-event]'));

    });
});
