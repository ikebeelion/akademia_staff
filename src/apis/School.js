import Api from './Api'

export default{
    getCountry(){
        return Api.get('/country')
    },
    getState(countryid){
        return Api.get('/state/'+countryid)
    },    
    getPrincipalOfficer(branchid){
        return Api.get('/principalOfficer/'+branchid)
    },
    getCity(stateid){
        return Api.get('/city/'+stateid)
    },        
    getSchoolInfo(schoolid){
        return Api.get('/index/'+schoolid)
    },
    updateSchoolProfile(schoolid, form){
        return Api.put('/school/'+schoolid, form)
    },
    uploadImage(formData, config){
        return Api.post('/submitImage/', formData, config)
    }
}