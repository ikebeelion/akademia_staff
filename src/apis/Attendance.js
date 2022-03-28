import Api from "./Api"

export default{         

    getStudents(id){
        return Api.get('/allstudentsclass/'+id)
    },
    getClassroomGroups(id){
        return Api.get('/classgroups_group/'+id)
    },
    getSubjectGroup(id){
        return Api.get('/suject_teacher/'+id)
    },
    saveAttendance(form){
        return Api.post('/save_attendance/', form)
    },
    getAttendance(id1,id2,id3){
        return Api.get('/attendance/'+id1+'/'+id2+'/'+id3)
    },
    
}