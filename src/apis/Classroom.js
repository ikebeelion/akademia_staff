import Api from "./Api"

export default{
    getClassRoomTeacher(id){
        return Api.get('/classroom_teacher/'+id)
    },
    getClassGroupsTaught(id){
        return Api.get('/get-students/'+id)
    },
    getStudentClassRoom(id){
        return Api.get('/studentClassroom/'+id)
    },
    goToClassGroup(id){
        return Api.get('/get-students-sub/'+id)
    },
    getSubjectGroups(subj){
        return Api.get('/subjectGrpd/'+subj)        
    },
    getAcademicPeriod(branchid){
        return Api.get('/period/'+branchid)        
    },
    getResultTypes(branchid){
        return Api.get('/type/'+branchid)
    },
    scoreStudentResult(form){
        return Api.post('/score', form)
    },
    scoreStudents(form){
        return Api.post('/storeresult', form)
    },
    addComment(form){
        return Api.post('/comment/store', form) 
    },
    getClassGroup(id){
        return Api.get('/singleroomgroup/'+id)
    },

    getStudentsInClass(id){
        return Api.get('/allstudentsclass/'+id)
    },
    getPsych(branchid){
        return Api.get('/psychomotors/'+branchid)
    },
    submitPsychMOtor(form){
        return Api.put('/deletepsychmotor', form)
    },
    postPsychomotor(form){
        return Api.post('/storepsychmotor', form)
    },
    getDomains(id){
        return Api.get('/domains/'+id)
    },
    submitAffectiveDomain(form){
        return Api.put('/deletedomain', form)
    },
    postDomain(form){
        return Api.post('/storedomain', form)
    },
    getClassRoomGroup(id){
        return Api.get('classrmgroup/'+id)
    },
    getScoredStudents(periodid,subjectid,resulttype){
        return Api.get('/scored-students/'+periodid+'/'+subjectid+'/'+resulttype)
    }

}