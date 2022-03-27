import Api from './Api'
import Csrf from './Csrf'
export default{
    async login(form){
        await Csrf.getCookie()
        return Api.post("/login", form)        
    },

    async logout(){
        return Api.post("/logout")
    },

    auth(){
        return Api.get("/user")
    }
}