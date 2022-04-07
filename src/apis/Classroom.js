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
        return Api.get('/subjectGrpc/'+subj)        
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
    submitPsychMOtor(id){
        return Api.put('/deletepsychmotor/'+id)
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
    }

}