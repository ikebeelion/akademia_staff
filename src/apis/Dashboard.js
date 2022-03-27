import Api from './Api'

export default{
    getStudentCount(schoolid){
        return Api.get('/getstudentcount/'+schoolid)
    },
    getStaffCount(schoolid){
        return Api.get('/getstaffcount/'+schoolid)
    },
    getTeachingStaffCount(schoolid){
        return Api.get('/getteachingstaff/'+schoolid)
    },
    getNonTeachingStaffCount(schoolid){
        return Api.get('/getnonteachingstaff/'+schoolid)
    },
    getMaleStudents(schoolid){
        return Api.get('/getmalestudents/'+schoolid)
    },
    getFemaleStudents(schoolid){
        return Api.get('/getfemalestudents/'+schoolid)
    },
    getPaidFees(schoolid){
        return Api.get('/paidfees/'+schoolid)
    },
    getUnpaidFees(schoolid){
        return Api.get('/unpaidfees/'+schoolid)
    },
    getIncompleteFees(schoolid){
        return Api.get('/incompletefees/'+schoolid)
    },

    getSubjectTeacher(id){
        return Api.get('/suject_teacher/'+id)
    },
    getCurrentPeriod(branchid){
        return Api.get('/activeperiod/'+branchid)
    },
    getClassTeacher(id){
        return Api.get('/classroom_teacher/'+id)
    },
    getTimTable(id, academic_period){
        return Api.get('/tutortable/'+id+'/'+academic_period)
    }
    
    






}