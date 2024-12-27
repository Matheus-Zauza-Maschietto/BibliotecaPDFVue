import api from "./Api";

class Usuario{
    static cadastro(body){
        return api.post('/api/User/Create', body)
    }
    static login(body){
        return api.post('/api/User/Login', body)
    }
}

export default Usuario