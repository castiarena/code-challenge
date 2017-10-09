
import { expect } from 'chai';
import ApplicationsList from '../../../src/components/applications-list/ApplicationsList';
import Application from '../../../src/components/application/Application';
import data from '../../../host-app-data.json';

describe('Applications List test suite', ()=>{

    it('should list the most satisfactory application', ()=>{
        const firstTreeAppsData = Object.assign([], data).splice(0,3);
        const appsList = new ApplicationsList(
            firstTreeAppsData.map( data => {
                return new Application(data);
            })
        );

        appsList.orderByApdex();
        expect(appsList.print()).to.be.equal(
            '68 Small Fresh Pants - Kautzer - Boyer, and Sons\n' +
            '61 Ergonomic Wooden Soap - Lemke and Sons, Inc\n' +
            '57 Refined Concrete Shirt - Hudson - Sauer, Group'
        )
    });

    it('should list apps grouped by host', ()=>{
        const firstTenAppsData = Object.assign([], data).splice(0,10);
        const appsList = new ApplicationsList(
            firstTenAppsData.map( data => new Application(data) )
        );

        const hostName = 'b0b655c5-928a.nadia.biz';

        expect(appsList.getTopAppsByHost(hostName).some(
            app => app.host.some(
                host => host.url() === hostName
            )
        )).to.be.equal(true);
    });

    it('should remove host (7e6272f7-098e.dakota.biz) from one app', ()=>{
        const firstFiftyAppsData = Object.assign([], data).splice(0,50);
        const appsList = new ApplicationsList(
            firstFiftyAppsData.map( data => new Application(data))
        );

        const hostName = '7e6272f7-098e.dakota.biz';
        const firstApp = appsList.findAppByIndex(0);
        const firsAppHost = firstApp.findHost(hostName);

        expect( firstApp.findHost(hostName).url() === hostName ).to.be.true;

        appsList.removeAppFromHosts(firstApp, hostName);

        expect( firstApp.findHost(hostName) === firsAppHost).to.be.false;
    });

    it('should add host from app', ()=>{
        const firstFiftyAppsData = Object.assign([], data).splice(0,50);
        const appsList = new ApplicationsList(
            firstFiftyAppsData.map( data => new Application(data))
        );
        const firstApp = appsList.findAppByIndex(0);

        const hostName = 'mock-host.name.baz';

        expect(firstApp.host.some( host =>
            host.url() === hostName)
        ).to.be.false;

        appsList.addAppToHosts(firstApp, hostName);

        expect(firstApp.host.some( host =>
            host.url() === hostName)
        ).to.be.true;
    });


    it('should only list 25 apps', ()=>{
        const appsList = new ApplicationsList( data.map( data => new Application(data)));
        const hostName = 'b0b655c5-928a.nadia.biz';
        expect(appsList.getTopAppsByHost(hostName).length).to.be.equal(appsList.max);
    });


    it('should only list 25 apps after remove one app from that host', ()=>{
        const appsList = new ApplicationsList( data.map( data => new Application(data)));
        const hostName = 'b0b655c5-928a.nadia.biz';
        appsList.removeAppFromHosts(
            appsList.getTopAppsByHost(hostName)[0],
            hostName
        );
        expect(appsList.getTopAppsByHost(hostName).length).to.be.equal(appsList.max);
    });

    it('should return a list of every host on demand' , () => {
        const firstFiftyAppsData = Object.assign([], data).splice(0,2);
        const appsList = new ApplicationsList(
            firstFiftyAppsData.map( data => new Application(data))
        );

        expect(appsList.getAllHosts()[0]).to.be.equal(
            '7e6272f7-098e.dakota.biz'
        );
        expect(appsList.getAllHosts()[1]).to.be.equal(
            '9a450527-cdd9.kareem.info'
        );
    })
});

