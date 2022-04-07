<template>
     <div>
        <h1>My Class</h1>  <br>
        <center><router-link to="/classroom">Goto Class Management</router-link></center>
        <section>
        <h4>All Students in {{ this.classdetail.classgroupname }} {{ this.classdetail.classroom }}</h4><s></s>
        <center><p>Listed Below are all the Students in this classroom</p></center>
            <table id="myTable">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>                                                
                </thead>
                <tbody>
                                                <tr v-for="student in students" :key="student.studentuseraccountid">
                                                    <td>{{student.firstname}}</td>
                                                    <td>{{student.lastname}}</td>
                                                    <td>{{student.genderid}}</td>
                                                    <td>
                                                        <button style="width:50px" @click="openModal(student.studentuseraccountid)">
                                                            Score
                                                        </button>
                                                        <button style="width:250px" @click="openPRModal(student.studentuseraccountid)">
                                                            Psychomotor & Remarks
                                                        </button>
                                                        <button style="width:200px" @click="openAffectiveModal(student.studentuseraccountid)">
                                                            Affective Domain
                                                        </button>

                                                    </td>
                                                </tr>

                                                </tbody>
                                            </table>
        </section>
        <section v-if="scoreaStudent" id="scoreStudent">
            <h1>Score {{studentName }}</h1>
            <center>
                <div class="form-group">
                                                    <label>Result Type</label>
                                                    <select v-model="scoreStudent.resultTypeid" class="form-control" @change="checkInput">
                                                    <option value="null">select</option>
                                                        <option v-for="type in resultTypes" :key="type.id" :value="type.id">
                                                            {{ type.resulttype }}
                                                        </option>
                                                    </select>
                                                    <label>Academic Period</label>
                                                    <select v-model="scoreStudent.academicPeriodid" class="form-control" @change="checkInput">
                                                        <option value="null">select</option>
                                                        <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                                                            {{ period.session.session }} - {{ period.term }}
                                                        </option>
                                                    </select>
                                                    <label>Subject</label>
                                                    <select v-model="scoreStudent.subjectid" class="form-control" @change="checkInput">
                                                        <option value="null">select</option>
                                                        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                                                            {{ subject.subjecttitle }} - {{subject.classgroupname}}
                                                        </option>
                                                    </select>
                                                    <label>Score Obtained</label>
                                                    <input type="number" step="any" class="form-control" v-model="scoreStudent.score">
                                                </div>
            </center>
            <center style="margin-bottom:20px">
                <button :disabled="checkFilled == true" @click="scoreStudentResult()">
                    score
                </button>
            </center>
        </section>
        <section v-if="apsychomotor">
            <center>            
            <h5 class="modal-title" id="my-modal-title">Psychomotor Domain and Remark for {{studentName }}</h5>
            <div>
                                                         <div>
                                                            <div class="form-group mb-2">
                                                                <label>Academic Period</label>
                                                                <select v-model="psychomotorRemarks.academicPeriodid" class="form-control" @change="checkInput2">
                                                                    <option value="null">select</option>
                                                                    <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                                                                        {{ period.session.session }} - {{ period.term.term }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                            <div class="form-group mb-4">
                                                                <table class="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Psychomotor</th>
                                                                            <th>Rating</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="motor in psychtypes" :key="motor.id">
                                                                            <td>{{motor.psychomotor}}</td>
                                                                            <td v-for="rating in psychratings" :key="rating.id">
                                                                                <label for="">{{rating.rating}}</label>
                                                                                <input type="checkbox" :value="{psychtype:motor.id, rating:rating.id}" v-model="psychomotorRemarks.psychomotor" @input="checkInput2">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                            <div class="form-group mb-2">
                                                                <label>Principal Remark</label>
                                                                <input type="text" @input="checkInput2" class="form-control" placeholder="..." v-model="psychomotorRemarks.remarks.principal">
                                                            </div>
                                                            <div class="form-group mb-2">
                                                                <label>Class Teacher Remark</label>
                                                                <input type="text" @input="checkInput2" class="form-control" placeholder="..." v-model="psychomotorRemarks.remarks.teacher">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </center>
                                                    <center style="margin-bottom:20px">
                                                        <button class="btn btn-success" :disabled="checkFilled == true" @click="submitPsychMOtor()">
                                                                Submit
                                                            </button>
                                                    </center>
        </section>
        <section v-if="anaffecdomain">
                                           <center>
                                           <h5>Affective Domain for {{studentName }}</h5> 
                                                <div>
                                                    <label>Academic Period</label>
                                                    <select v-model="domain.academicPeriodid" class="form-control" @change="checkInput3">
                                                        <option value="null">select</option>
                                                        <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                                                            {{ period.session.session }} - {{ period.term.term }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </center>
                                                                <table class="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Domain</th>
                                                                            <th>Rating</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr v-for="dom in domains" :key="dom.id">
                                                                            <td>{{dom.affective_domain}}</td>
                                                                            <td v-for="rating in psychratings" :key="rating.id">
                                                                                <label for="">{{rating.rating}}</label>
                                                                                 <input type="checkbox" :value="{domaintype:dom.id, rating:rating.id}" v-model="domain.affective_domain" @input="checkInput3">
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
            <center style="margin-bottom:20px">
                <button class="btn btn-success" :disabled="checkFilled == true" @click="submitAffectiveDomain()">
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
                scoreaStudent:false,
                apsychomotor:false,
                anaffecdomain:false,
                psychomotor:false,
                checkFilled:true,
                user:null,
                classid:null,
                classdetail:null,
                students:null,
                studentid:null,
                resultTypes:null,
                academicPeriods:null,
                subjects:null,
                psychtypes:null,
                psychratings:[
                {id:1, rating:1},
                {id:2, rating:2},
                {id:3, rating:3},
                {id:4, rating:4},
                {id:5, rating:5}
                ],
                scoreStudent:{
                    resultTypeid:null,
                    academicPeriodid:null,
                    subjectid:null,
                    studentid:null,
                    score:null,
                    classid:null,
                },
                psychomotorRemarks:{
                    studentid:null,
                    academicPeriodid:null,
                    psychomotor:[],
                    remarks: {
                            teacher:null,
                            principal:null
                        }

                },
                studentName:null,
                domains:null,
                domain:{
                    studentid:null,
                    academicPeriodid:null,
                    affective_domain:[],
                }

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

        checkInput2(){
            if(this.psychomotorRemarks.academicPeriodid != null && this.psychomotorRemarks.psychomotor != [] && this.psychomotorRemarks.remarks.teacher != null && this.psychomotorRemarks.remarks.principal !=null ){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },
         checkInput3(){
            if(this.domain.academicPeriodid != null && this.domain.affective_domain != []  ){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

        getPsych(){
            Classroom.getPsych(this.user.branchid).then((result) => {
                this.psychtypes = result.data
            })
        },

        getStudentsInClass(){
            Classroom.getStudentsInClass(this.classid).then((result) => {
                this.students = result.data
                this.datatable()
            });
        },

        getClassgroup(){
            Classroom.getClassGroup(this.classid).then((result) => {
                this.classdetail = result.data
            })
        },

        openModal(id){
            this.apsychomotor = false
            this.scoreaStudent = true
            this.anaffecdomain = false
            this.scoreStudent.studentid = id
              this.students.forEach(student => {
                    if(student.studentuseraccountid == this.scoreStudent.studentid)                                        
                    this.studentName = student['firstname']+' '+student['lastname']
                });

        },

        openPRModal(id){
            this.apsychomotor = true 
            this.scoreaStudent = false
            this.anaffecdomain = false
            this.psychomotorRemarks.studentid = id
            this.students.forEach(student => {
                    if(student.studentuseraccountid == this.psychomotorRemarks.studentid)                                        
                    this.studentName = student['firstname']+' '+student['lastname']
                });
        },

        openAffectiveModal(id){
            this.apsychomotor = false
            this.scoreaStudent = false
            this.anaffecdomain = true
            this.domain.studentid = id
            this.students.forEach(student => {
                    if(student.studentuseraccountid == this.domain.studentid)                                        
                    this.studentName = student['firstname']+' '+student['lastname']
                });
            
        },

        hideModal(){
            $('#student-modal').modal('hide')
            this.scoreStudent.resultTypeid = null
            this.scoreStudent.academicPeriodid = null
            this.scoreStudent.subjectid = null
            // this.scoreStudent.studentid = null
            this.scoreStudent.score = null

        },
   

        getResultTypes(){
            Classroom.getResultTypes(this.user.branchid).then((result) => {
                this.resultTypes = result.data
            })
        },

        getAcademicPeriod(){
            Classroom.getAcademicPeriod(this.user.branchid).then((result) => {
                this.academicPeriods = result.data
            })
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
               this.getAcademicPeriod()
                this.getResultTypes()
                this.getSubjectGroups()
                this.getPsych()
                this.getDomains()
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        getSubjectGroups(){
            Classroom.getSubjectGroups(this.classid).then((result) => {
                this.subjects = result.data
            })
        },

        submitPsychMOtor(){
            Classroom.submitPsychMOtor( this.psychomotorRemarks).then((result) => {
                Classroom.postPsychomotor(this.psychomotorRemarks).then((result) => {
                    this.psychomotorRemarks.remarks.teacher = null
                    this.psychomotorRemarks.remarks.principal = null
                    this.psychomotorRemarks.psychomotor = []
                    this.psychomotorRemarks.studentid = null
                    this.psychomotorRemarks.academicPeriodid = null
                    this.hideRemarkModal()

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
                    title: 'Error Uploading Psychomotor',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
            }).catch((err) => {

            });

        },

        getDomains(){
            Classroom.getDomains(this.user.branchid).then((result) => {
                this.domains = result.data
            })
        },
        submitAffectiveDomain(){
            Classroom.submitAffectiveDomain(this.domain).then((result) => {
                Classroom.postDomain(this.domain).then((result) => {
                    this.domain.affective_domain = []
                    this.domain.studentid = null
                    this.domain.academicPeriodid = null
                    this.hideAffectiveModal()

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
                    title: 'Error Uploading Affective Domain',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
            })
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



    },

    created() {
        this.getAuth()
        this.classid = parseInt(localStorage.getItem('classid'))
        this.scoreStudent.classid = this.classid
        this.getClassgroup()
        this.getStudentsInClass()        
    },

}
</script>
