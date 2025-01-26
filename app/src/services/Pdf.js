import api from "./Api";

class Pdf{
    static getAll(){
        return api.get('/api/Files')
    }

    static getById(id){
        return api.get(`/api/Files/${id}`)
    }

    static deleteById(id){
        return api.delete(`/api/Files/${id}`)
    }

    static searchTerm(term){
        return api.get(`/api/Files/search?query=${term}`)
    }

    static favorite(id){
        return api.patch(`/api/Files/favorite/${id}`)
    }

    static unfavorite(id){
        return api.patch(`/api/Files/unfavorite/${id}`)
    }

    static postFile(formData){
        return api.post('/api/Files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
        );
    }

    static getFile(id){
        return api.get(`/api/Files/${id}/file`,{
            responseType: 'blob'
          });
    }
}

export default Pdf