import Api from "./Api"

export default{
    uploadCurricula(form){
        return Api.post('/curricula/store/', form) 
    },
    uploadImage(formData, config){
        return Api.post('/curriculadoc', formData, config)
    }
}