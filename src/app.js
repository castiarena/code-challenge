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

        const pageView = new View('hosts',
            '<main class="main-content">' +
                '<section class="app-row">' +
                    '<div class="app-grid">'+
                        '<h1 class="app-list--title">Apps by Host</h1>' +
                        '<p class="app-list--description">for user {{user}}</p>' +
                    '<div>'+
                    '<div class="app-grid">' +
                        '<label for="asList"><input type="checkbox" id="asList" name="asList">Show as list</label>'+
                    '</div>'+
                '</section>'+
                '{{hostListViews}}' +
            '</main>', {
                user:'averylongnemailaddress@companyname.com',
                hostListViews: () => hosts.map( host => {
                    return new View(host,
                        '<section class="host-list--wrapper">' +
                            '<h1 class="host-title">{{host}}</h1>' +
                            '<ul class="app-list">{{appsViewList}}</ul>' +
                        '</section>', {
                            host,
                            appsViewList: () =>
                                appsList.getTopAppsByHost(host).map(app =>
                                    new View(app.name,
                                        '<li class="app-list" data-on-click>' +
                                            '<p class="app-name">' +
                                                '<span class="app-apdex">{{apdex}}</span>' +
                                                '{{name}}' +
                                            '</p>' +
                                        '</li>', {
                                            apdex: app.satisfaction(),
                                            name: app.name,
                                            onClick: () => {
                                                console.log(app);
                                            }
                                        })
                                )
                        })
                })
            }
        );

        spa.renderViews([
            pageView
        ]);

        setTimeout(appsList.removeAppFromHosts(appsList.findAppByIndex()))

    });
});
