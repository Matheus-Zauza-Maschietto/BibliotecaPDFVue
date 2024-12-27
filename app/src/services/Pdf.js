import api from "./Api";

class Pdf{
    static getAll(token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.get('/api/Files')
    }

    static getByName(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.get(`/api/Files/${name}`, he)
    }

    static deleteByName(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.delete(`/api/Files/${name}`, he)
    }

    static favorite(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.patch(`/api/Files/unfavorite/${name}`, he)
    }

    static unfavorite(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.post(`/api/Files/favorite/${name}`, he)
    }
}

export default Pdf