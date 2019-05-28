import axios from 'axios';

class DataService{
    constructor(){    
        axios.defaults.baseURL = 'http://localhost:8081/data.json';
        let service = axios.create();  
        this._service = service;
    }    
    _get() {
        return this._service
        .get();
    }
    getHome(callback){
        this
        ._get()
        .then(response =>{
            callback(response.data.home);
        })
    }
    getAbout(callback){
        this
        ._get()
        .then(response =>{
            callback(response.data.about);
        })
    }

}


export default new DataService;