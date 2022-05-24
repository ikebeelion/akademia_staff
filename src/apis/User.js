import Api from './Api'
export default{
    async login(form){     
        return Api.post("/login", form)        
    },

    async logout(){
        return Api.post("/logout")
    },

    auth(){
        return Api.get("/user")
    }
}