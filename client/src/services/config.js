const API_URI = 'http://localhost:3000/';

class ConfigServer {
    constructor() {
        this.api_url = API_URI;
    }
    setHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const token = this.getToken();
        if(token) headers.append('Authorization', 'Bearer ' + token);
        return headers;
    }
    getToken() {
        return localStorage.getItem('token');
    }
}
const configService = new ConfigServer();

export default configService;