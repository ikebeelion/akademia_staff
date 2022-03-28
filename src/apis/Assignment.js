import Api from "./Api"

export default{    
    getClassroomGroups(groupid){
        return Api.get('/classgroups_group/'+groupid)
    },
    getSubjectGroup(userid){
        return Api.get('/suject_teacher/'+userid)
    },
    submitAssignment(form){
        return Api.post('/assignment/store/', form)
    },
    getAssignment(classroom, subject){
        return Api.get('/assignments/'+classroom+'/'+subject)
    },
    getSingleAssignment(id){
        return Api.get('/getSingleAssignment/'+id)
    },
    updateAssignment(id, form){
        return Api.put('/updateAssignment/'+id, form)
    },
    deleteAssignment(id){
        return Api.delete('/delete-assignment/'+id)       
    },
    uploadImage(formData, config){
        return Api.post('/upload-imageassignment', formData, config)
    }
}