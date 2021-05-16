import configService from './config';

class AppService {
    constructor() {
        this.api_url = configService.api_url;
    }

    createUser = async ( username ) => {
        return await fetch( this.api_url, {
            method: 'post',
            headers: configService.setHeaders(),
            body: JSON.stringify(username)
        });
    }

    getHours = async () => {
        return await fetch( this.api_url );
    }

    getTurns = async () => {
        return await fetch( this.api_url+'turns' );
    }

    takeTurn = async ( id_hour ) => {
        return await fetch( this.api_url+'take', {
            method: 'post',
            headers: configService.setHeaders(),
            body: JSON.stringify(id_hour)
        });
    }

    deleteTurn = async ( id_hour ) => {
        return await fetch( this.api_url+'turn', {
            method: 'delete',
            headers: configService.setHeaders(),
            body: JSON.stringify(id_hour)
        });
    }
}
const appService = new AppService();

export default appService;