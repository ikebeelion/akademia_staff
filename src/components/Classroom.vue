<template>
 <div>
    <h1>Class Management</h1>
    <section v-if="!scoreaStudent || !addaComment">
            <h4 class="card-title">Classrom Managed</h4><s></s>
        <center>
        <p>Listed Below are all the Classes Managed By Form Teacher
        </p></center>
        <div v-if="classroomsmgd != ''">
            <div v-for="clsmgd in classroomsmgd" :key="clsmgd.id" style="margin-bottom:20px">
                <center>
                    <td></td><button  @click="goToClass(clsmgd.clsrmgpid )">{{ clsmgd.classgroupname }} - {{clsmgd.classroom}}</button>
                </center>
            </div>
        </div>
        <div v-else>
            <h1 class="lead">NOT MANAGING ANY CLASSROOM</h1>
        </div>        
    </section>
    <section v-if="!scoreaStudent || !addaComment">
        <h4 class="card-title">Class Groups Taught</h4><s></s>
            <center><p>Listed Below are all the Class Groups Taught</p></center>
            <div v-if="glassGroupManaged != ''">
                 <div v-for="clsmgd in glassGroupManaged" :key="clsmgd.id">
                    <center  style="margin-bottom:20px">
                        <button  @click="goToClassGroup(clsmgd.clgrid, clsmgd.sclid )">{{ clsmgd.classgroupname }} - {{clsmgd.subjecttitle}}</button>
                    </center>
                </div>
            </div>
            <div v-else>
                <h1 class="lead">NOT TEACHING ANY CLASS GROUP</h1>
            </div><br>
    </section>

    <section>
        <table id="myTable">
                                            <thead>
                                                <tr>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody :key="studentKey">
                                                <tr v-for="student in students" :key="student.id">
                                                    <td>{{student.firstname}}</td>
                                                    <td>{{student.lastname}}</td>
                                                    <td>
                                                        <button class="btn btn-secondary" @click="openModal(student.studentuseraccountid)">
                                                            Score
                                                        </button>
                                                        <button class="btn btn-info" @click="openCommentDomain(student.studentuseraccountid)">
                                                            Comment 
                                                        </button>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
    </section>

    <section v-if="scoreaStudent" id="scoreStudent">
    <center><h5 >Score {{this.studentName}}</h5></center><br><br>
    <center>

        <div class="form-group">
                                                                <label class="form-label">Result Type</label>
                                                                <select v-model="scoreStudent.resultTypeid" class="form-control" @change="checkInput">
                                                                <option value="">select</option>
                                                                    <option v-for="type in resultTypes" :key="type.id" :value="type.id">
                                                                        {{ type.resulttype }}
                                                                    </option>
                                                                </select>
                                                                <label class="form-label">Academic Period</label>
                                                                <select v-model="scoreStudent.academicPeriodid" class="form-control" @change="checkInput">
                                                                    <option value="">select</option>
                                                                    <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                                                                        {{ period.session.session }} - {{ period.term.term }}
                                                                    </option>
                                                                </select>
                                                                <label class="form-label">Subject</label>
                                                                <select v-model="scoreStudent.subjectid" class="form-control" @change="checkInput">
                                                                    <option value="">select</option>
                                                                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                                                                        {{ subject.subjecttitle }} - {{subject.classgroupname}}
                                                                    </option>
                                                                </select>
                                                                <label class="form-label">Score Obtained</label>
                                                                <input type="number" step="any" class="form-control" v-model="scoreStudent.score">
                                                            </div>
                                                            </center>
                                                            <center>
                                                                <button class="btn btn-success" :disabled="checkFilled == true" @click="scoreStudentResult()">
                                                                    Submit
                                                                </button>
                                                            </center>
    </section>
    <section v-if="addaComment" id="addComment">
        <center>
        <h5>Comment on {{this.studentName}} Performance</h5><br><br>
                <div class="form-group">
                                                                <label class="form-label">Academic Period</label>
                                                                <select v-model="performanceComment.academicPeriodid" class="form-control" @change="commentInput">
                                                                    <option value="">select</option>
                                                                    <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                                                                        {{ period.session.session }} - {{ period.term.term }}
                                                                    </option>
                                                                </select>
                                                                <label class="form-label">Subject</label>
                                                                <select v-model="performanceComment.subjectid" class="form-control" @change="commentInput">
                                                                    <option value="">select</option>
                                                                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                                                                        {{ subject.subjecttitle }} - {{subject.classgroupname}}
                                                                    </option>
                                                                </select>
                                                                <label class="form-label">Comment</label>
                                                                <textarea class="form-control" @input="commentInput" v-model="performanceComment.comment" id="" cols="30" rows="2"></textarea>
                                                                <label class="form-label">C.A</label>
                                                                <input type="number" step="any" class="form-control" v-model="performanceComment.ca">
                                                                <label class="form-label">Exam</label>
                                                                <input type="number" step="any" class="form-control" v-model="performanceComment.exam">
                                                                <label class="form-label">Score</label>
                                                                <input type="number" step="any" class="form-control" v-model="performanceComment.score">
                                                                <label class="form-label">Average</label>
                                                                <input type="number" step="any" class="form-control" v-model="performanceComment.avg">

                                                            </div>
                        </center>
                                                            <center>
                                                                <button class="btn btn-success" :disabled="checkComment"  @click="addComment()">
                                                                    Submit
                                                                </button>
                                                            </center>
    </section>
        </div>

</template>

<script>
import User from '../apis/User.js'
import Classroom from '../apis/Classroom.js'
import Swal from 'sweetalert2'
export default {   
    data() {
        return {
                checkFilled:true,
                checkComment:true,
                studentKey:0,
                classroomsmgd:null,
                scoreaStudent:false,
                addaComment:false,
                user:null,
                glassGroupManaged:null,
                students:null,
                academicPeriods:null,
                resultTypes:null,
                selectedsubject:null,
                scoreStudent:{
                    resultTypeid:null,
                    academicPeriodid:null,
                    subjectid:null,
                    studentid:null,
                    score:null,
                    classid:null,
                },
                performanceComment:{
                    comment:null,
                    academicPeriodid:null,
                    subjectid:null,
                    studentid:null,
                    ca:null,
                    exam:null,
                    score:null,
                    avg:null,
                },
                subjects:null,
                studentName:null

            }
    },

    methods: {       
        checkInput(){
            if(this.scoreStudent.resultTypeid != null && this.scoreStudent.academicPeriodid && this.scoreStudent.subjectid != null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getClassRoomTeacher()
                this.getClassGroupsTaught()
                this.getAcademicPeriod()
                this.getResultTypes()
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        commentInput(){
            if(this.performanceComment.academicPeriodid != null && this.performanceComment.subjectid != null && this.performanceComment.comment != null){
                this.checkComment = false
            }else{
                this.checkComment = true
            }
        },

        goToClass(id){
             var classid = null
                if(localStorage.getItem('classid')){
                    classid = localStorage.getItem('classid')

                }
                    if(this.$route.params.id != ''){
                    classid = id
                    localStorage.setItem('classid', classid);
                }            
            this.$router.push('/class-managed')
        },

        getClassRoomTeacher(){
            Classroom.getClassRoomTeacher(this.user['id']).then((result) => {
                this.classroomsmgd = result.data
            })
        },

        getClassGroupsTaught(){
            Classroom.getClassGroupsTaught(this.user['id']).then((result) => {
                this.glassGroupManaged = result.data
            })
        },

        getStudentClassRoom(){
            Classroom.getStudentClassRoom(this.scoreStudent.studentid).then((result) => {
                this.scoreStudent.classid = result.data['classroomgroupid']
            })
        },

        goToClassGroup(id, subject){
            Classroom.goToClassGroup(id).then((result) => {
                this.selectedsubject =  subject
                this.getSubjectGroups()
                this.datatable()                       
                this.students = result.data
                this.studentKey++
            })
        },

        getSubjectGroups(){
            Classroom.getSubjectGroups(this.selectedsubject).then((result) => {
                this.subjects = result.data
            })
        },

        getAcademicPeriod(){
            Classroom.getAcademicPeriod(this.user.branchid).then((result) => {
                this.academicPeriods = result.data
            })
        },

        getResultTypes(){
            Classroom.getResultTypes(this.user.branchid).then((result) => {
                this.resultTypes = result.data
            })
        },

        scoreStudentResult(){
            Classroom.scoreStudentResult(this.scoreStudent).then((result) => {
                this.scoreStudent.resultTypeid = null
                this.scoreStudent.academicPeriodid = null
                this.scoreStudent.subjectid = null
                // this.scoreStudent.studentid = null
                this.scoreStudent.score = null
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Uploaded Successfully',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                if(err.response.status == 400){
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Score Assigned is higher than the score for selected result type',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                }else{
                    Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Record already exists for this academic period',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                }
            });
        },
        datatable(){            
            $(function() {
                 $('#myTable').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        
           

        openModal(id){
            if(this.scoreStudent.studentid == id){
                this.scoreaStudent = false
                this.addaComment = false
                this.scoreStudent.studentid =null
                this.getStudentClassRoom() 
                this.scoreStudent.resultTypeid = null
                this.scoreStudent.academicPeriodid = null
                this.scoreStudent.subjectid = null
                // this.scoreStudent.studentid = null
                this.scoreStudent.score = null                               
            }else{
                this.scoreaStudent = true
                this.scoreStudent.studentid = id
                this.addaComment = false
                
                // getStudentName
                this.students.forEach(student => {
                    if(student.studentuseraccountid == this.scoreStudent.studentid)                                        
                    this.studentName = student['firstname']+' '+student['lastname']
                });
                
                this.getStudentClassRoom()                
            }
        },   
        
        openCommentDomain(id){
            if(this.performanceComment.studentid == id){
                this.addaComment = false
                this.scoreaStudent = false
                this.scoreStudent.studentid = null
            }else{
                this.performanceComment.studentid = id
                this.addaComment = true
                this.scoreaStudent = false
                this.scoreStudent.studentid = null
                   this.students.forEach(student => {
                    if(student.studentuseraccountid == this.performanceComment.studentid)                                        
                    this.studentName = student['firstname']+' '+student['lastname']
                });
            }
        },

        addComment(){
            Classroom.addComment(this.performanceComment).then((result) => {
                this.performanceComment.comment = null
                this.hideCommentModal()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Uploaded Successfully',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })

            });
        },
        

        
    },

    created() {
       this.getAuth()
       this.datatable()                       
    },

}
</script>
<style scoped>
    .form-group-row{
		display: flex;
        position: relative;
        justify-content: center;        
	}

    .form-group-row input, select{
        position:relative ;
        width: 300px;
        margin-right: 10px;
    }

    .img-container{
        max-width: 100px;
        max-height: 100px;
        border-radius: 50%;
        overflow: hidden;
    }   
    .img-container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width:992px) {
    .form-group-row{
		display: block;
        position: relative;        
	}
            
    }
</style>
