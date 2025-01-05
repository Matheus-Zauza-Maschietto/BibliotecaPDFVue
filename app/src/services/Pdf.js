import api from "./Api";

class Pdf{
    static getAll(){
        return api.get('/api/Files')
    }

    static getByName(name){
        return api.get(`/api/Files/${name}`)
    }

    static deleteByName(name){
        return api.delete(`/api/Files/${name}`)
    }

    static favorite(name){
        return api.patch(`/api/Files/favorite/${name}`)
    }

    static unfavorite(name){
        return api.patch(`/api/Files/unfavorite/${name}`)
    }

    static postFile(formData){
        return api.post('/api/Files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        );
    }

    static getFile(fileName){
        return api.get(`/api/Files/${fileName}/file`,{
            responseType: 'blob'
          });
    }
}

export default Pdf