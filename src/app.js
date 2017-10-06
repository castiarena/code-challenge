import { Get } from './request';
const request = new Get(`http://localhost:9000/host-app-data.json`);

request.then( data => console.log(data));
