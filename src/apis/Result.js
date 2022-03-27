import Api from "./Api"

export default{
    getStudentsInClass(classroom){
        return Api.get('/allstudentsclass/'+classroom)
    },
    getClassRoomTeacher(id,classgroup){
        return Api.get('/classroom_teacher/'+id+'/'+classgroup)        
    },
    getClassGroups(id){
        return Api.get('/classroom_teacher/'+id)                
    },
    getSubjectGroups(classgroup){
        return Api.get('/subjectGrpres/'+classgroup)
    },
    getPrincipalOfficer(branchid){
        return Api.get('/principalOfficer/'+branchid)
    },
    getStudentsCount(id){
        return Api.get('/studentscount/'+id)
    },
    getStudentResult(studentid,period,id){
        return Api.get('/result/'+studentid+'/'+period+'/'+id)
    },
    getResult(studentid,period,){
        return Api.get('/result/'+studentid+'/'+period)
    },
    getResultData(studentid,period,){
        return Api.get('/points/'+studentid+'/'+period)
    },    
    getResultProfile(studentid){
        return Api.get('/result-profile/'+studentid)        
    },
    
    getComments(studentid, periodid){
        return Api.get('comment/'+studentid+'/'+periodid)
    },
    getSchoolInfo(schoolid){
        return Api.get('/index/'+schoolid)
    },
    getPsychoMotor(studentid, period){        
        return Api.get('/psych/'+studentid+'/'+period)
    },
    getAffectiveDomain(studentid, period){
        return Api.get('/domain/'+studentid+'/'+period)
    },
    getRemarks(studentid, period){
        return Api.get('/remark/'+studentid+'/'+period)
    },
    getAcademicPeriod(branchid){
        return Api.get('/period/'+branchid)
    },
}