<template>
    <div>
        <center>
            <div class="form-group">
                <label for="">Class Group</label>
                <select v-model="result.classroomid" @change="getClassRoomGroups">
                    <option value="null">Select Subject</option>
                    <option :value="{class:clsmgd.clgrid, subject:clsmgd.sclid }" v-for="clsmgd in glassGroupManaged" :key="clsmgd.id">
                        {{ clsmgd.classgroupname }} - {{clsmgd.subjecttitle}}
                    </option>
                </select>
            </div>

              <div class="form-group">
                    <label for="">Class Room <small>Select Class Group first</small></label>
                    <select v-model="classroom" @change="getStudentsInClass()">
                        <option value="null"> Select </option>
                        <option :value="classroom.id" v-for="classroom in classgroomgroups" :key="classroom.id">
                            {{ classroom.classgroupname }} - {{classroom.classroom}}
                        </option>
                    </select>
                </div>
            <div class="form-group">
                <label class="form-label">Result Type</label>
                <select v-model="result.resulttype" class="form-control" @change="checkInput">
                    <option value="null">select</option>
                    <option v-for="type in resulttype" :key="type" :value="type.id">
                        {{ type.resulttype }} - {{ type.percentage }}
                    </option>
                </select>
            </div>
            <div class="form-group">
            <label class="form-label">Academic Period</label>
            <select v-model="result.academic_periodid" class="form-control" @change="getScoredStudents()">
                <option value="null">select</option>
                <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                    {{ period.session.session }} - {{ period.term }}
                </option>
            </select>
            </div>
        </center>                   

             <section>
        <table id="myTable">
                                            <thead>
                                                <tr>
                                                    <th>Firstname</th>
                                                    <th>Lastname</th>
                                                    <th>Score</th>
                                                </tr>

                                            </thead>
                                            <tbody :key="studentKey">
                                                <tr v-for="(student, index) in students" :key="student">
                                                    <td>
                                                        <center>
                                                            {{student.firstname}} <small><span v-if="student.score_obtained" style="background:green; color:white">scored</span></small>
                                                        </center>
                                                    </td>
                                                    <td>
                                                        <center>
                                                            {{student.lastname}}
                                                        </center>
                                                    </td>
                                                    <td>
                                                        <center>
                                                            <input v-if="!student.score_obtained" type="number" v-model="result.score_obtained[index]" @input="pickScore(student.studentuseraccountid,index)">
                                                            <input v-if="student.score_obtained" :disabled="student.score_obtained" type="number" v-model="student.score_obtained" @input="pickScore(student.studentuseraccountid,index)">
                                                        </center>
                                                    </td>                                              
                                                </tr>
                                            </tbody>
                                        </table>
                                        <center  style="margin-bottom:20px">
                                            <button :disabled="postResult.length == 0" @click="scoreStudent">Score Student</button>
                                        </center>
    </section>
    </div>
</template>
<script>
import User from '../apis/User'
import Result from '../apis/Result'
import Classroom from '../apis/Classroom'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            glassGroupManaged: null,
            students:null,
            studentKey:0,
            subjects:null,
            result: {                                
                academic_periodid: null,
                subjectid: null,
                classroomid: null,
                resulttype:null,
                score_obtained:[],
                exam_score:[],
            },
            resulttype:null,
            postResult:[],
            user:null,
            academicPeriods:null,
            classgroomgroups:null,
            classroom:null,
            scoredStudents:[]
        }
    },
    methods: {
        getResultType(){
            Result.getResultType(this.user.branchid).then((result) => {
                this.resulttype = result.data                
            })
        },
        getClassGroupsTaught(){
            Classroom.getClassGroupsTaught(this.user['id']).then((result) => {
                this.glassGroupManaged = result.data
            })
        },
        pickScore(studentid,index){ 
            var res = this.postResult
            if(res.length > 0 ){                
                var x = res.find(x => x.studentid === studentid)
                if(x){
                    x.score_obtained = this.result.score_obtained[index]
                }else{
                    var addResult = {
                        restult_typeid:this.result.resulttype,
                        studentid:studentid,
                        academic_periodid:this.result.academic_periodid,
                        subjectid:this.result.classroomid.subject,
                        classroomid:this.result.classroomid.class,
                        score_obtained:this.result.score_obtained[index],               
                    }
                    res.push(addResult )
                }                
            }else{
                console.log('empty')                
                var addResult = {
                    restult_typeid:this.result.resulttype,
                    studentid:studentid,
                    academic_periodid:this.result.academic_periodid,
                    subjectid:this.result.classroomid.subject,
                    classroomid:this.result.classroomid.class,
                    score_obtained:this.result.score_obtained[index],               
                }
                res.push(addResult )
            }
                      
         },
        
        getScoredStudents(){
            Classroom.getScoredStudents(this.result.academic_periodid, this.result.classroomid.subject, this.result.resulttype).then((result) => {                
                this.scoredStudents = result.data
            }).catch((err) => {
                
            });
        },
        
        scoreStudent(){
            Classroom.scoreStudents(this.postResult).then((result) => {
                this.postResult = []
                this.students = []                
                this.scoredStudents = []
                this.result.academic_periodid = null
                this.result.subjectid = null
                this.result.classroomid = null
                this.result.resulttype = null
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
                        title: 'Duplicate Entries on Database',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })  
            });
        },

        getAcademicPeriod(){
            Classroom.getAcademicPeriod(this.user['branchid']).then((result) => {
                this.academicPeriods = result.data
            })
        },
        getSubjectGroups(){
            Classroom.getSubjectGroups(this.selectedsubject).then((result) => {
                this.subjects = result.data
            })
        },
        getClassRoomGroups(){
            Classroom.getClassRoomGroup(this.result.classroomid['class']).then((result) => {
                this.classgroomgroups = result.data
            })
        },
        getStudentsInClass(){           
            Result.getStudentsInClass(this.classroom).then((result) => {
                this.students = result.data
                this.datatable()
                this.studentKey++
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
        
        datatable(){            
            $(function() {
                 $('#myTable').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },

        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getClassGroupsTaught()                
                this.getAcademicPeriod()
                this.getResultType()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
    },

    computed(){
        
    },
    
    watch:{
        scoredStudents(){
            this.students.forEach(element => {
                var indx = this.students.indexOf(element)                                        
                delete this.students[indx].score_obtained                
                this.studentKey++
                
                if(this.scoredStudents.length > 0){                    
                    this.scoredStudents.forEach(ele =>{
                        if(element.studentuseraccountid === ele.studentid){
                            var indx = this.students.indexOf(element)
                            const score_obtained = {score_obtained:ele.score_obtained}
                            this.students[indx] = Object.assign(score_obtained, this.students[indx])
                            this.studentKey++
                        }
                    })                
                }else{                
                    var indx = this.students.indexOf(element)                                        
                    delete this.students[indx].score_obtained
                    console.log(['empty'+indx, this.students])    
                    this.studentKey++
                }
                
            });
            
        }

    },
    created() {
       this.getAuth()
       this.datatable()  
    },
}
</script>