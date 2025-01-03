import api from "./Api";

class Pdf{
    static getAll(token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.get('/api/Files')
    }

    static getByName(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.get(`/api/Files/${name}`)
    }

    static deleteByName(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.delete(`/api/Files/${name}`)
    }

    static favorite(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.patch(`/api/Files/unfavorite/${name}`)
    }

    static unfavorite(name, token){
        api.defaults.headers.common.Authorization = `Bearer ${token}`
        return api.post(`/api/Files/favorite/${name}`)
    }

    static postFile(formData){
        return api.post('/api/Files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        );
    }
}

export default Pdf