<template>
    <div>
        <h1>Attendance</h1>
        <section v-show="!viewAttendance">
            <center>
                <div class="form-group">
                    <label for="">Subject</label>
                    <select v-model="attendance.subdetail" @change="getClassroomGroups()">
                        <option value="">--</option>
                        <option v-for="subject in subjectgroups" :value="{subject:subject.sub, groupid:subject.groupid }" :key="subject.sub">
                            {{ subject.subjecttitle }} - {{ subject.classgroupname }}
                        </option>
                    </select>
                </div><br/>
                <div class="form-group">
                    <label for="">Class Room</label>
                    <select v-model="attendance.classroom" @change="getStudents()">
                        <option value="">--</option>
                        <option v-for="classroom in classroomgroups" :value="classroom.id" :key="classroom.id">
                            {{ classroom.classgroup.classgroupname }} - {{ classroom.classroom.classroom }}
                        </option>
                    </select>
                </div><br/>
                <div class="form-group">
                    <label for="">Date</label>
                    <input type="date" v-model="attendance.date">
                </div>           
            </center>
                                       
                </section>
        <section v-show="!viewAttendance">
            <table id="all-students" >
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Present</th>
                </tr>
                </thead>
                <tbody :key="tableKey">
                <tr v-for="student in students" :key="student.studentuseraccountid">
                    <td>{{student.firstname}}</td>
                    <td>{{student.lastname}}</td>
                    <td>
                        <input type="checkbox" :value="{'studentuseraccount':student.studentuseraccountid, 'status':1}" v-model="student_attendance">
                    </td>
                    </tr>
                    </tbody>
                </table>
                 <center>
                    <button class="btn btn-success col-8 mb-4 mt-2" @click="saveAttendance" :disabled="student_attendance==''">Mark Attendance</button>
                    <button class="btn btn-info col-4" @click="seeAttendance">View Attendance</button>
                 </center>
        </section> 
          <section v-show="viewAttendance">
                                        <h1>View Attendance</h1>
                                        <center>
                                            <div class="form-group">
                                            <label for="">Subject</label>
                                            <select v-model="attendance.subdetail" @change="getClassroomGroups()">
                                                <option value="">--</option>
                                                <option v-for="subject in subjectgroups" :value="{subject:subject.sub, groupid:subject.groupid }" :key="subject.sub">
                                                    {{ subject.subjecttitle }} - {{ subject.classgroupname }}
                                                </option>
                                            </select>
                                        </div><br/>
                                        <div class="form-group">
                                            <label for="">Class Room</label>
                                            <select v-model="attendance.classroom">
                                                <option value="">--</option>
                                                <option v-for="classroom in classroomgroups" :value="classroom.id" :key="classroom.id">
                                                    {{ classroom.classgroup.classgroupname }} - {{ classroom.classroom.classroom }}
                                                </option>
                                            </select>
                                        </div><br/>
                                        <div class="form-group">
                                            <label for="">Date</label>
                                            <input type="date" class="form-control col-4" v-model="attendance.date" @input="getAttendance">
                                        </div>
                                                                                </center>




                                     <div class="table-responsive mt-5">
                                            <table id="studentstable">
                                                <thead>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Present</th>
                                                </tr>
                                                </thead>
                                                <tbody :key="attendanceKey">
                                                <tr v-for="student in students" :key="student.id">
                                                    <td>{{student.firstname}}</td>
                                                    <td>{{student.lastname}}</td>
                                                    <td>{{student.status}}</td>
                                                </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        <center>
                                            <button class="btn btn-info col-4" @click="seeAttendance">Goto Mark Attendance</button>
                                        </center>

            </section>
               
        </div>

</template>

<script>
import User from '../apis/User.js'
import Attendance from '../apis/Attendance.js'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
                viewAttendance:false,
                checkFilled:true,
                classroomgroups:null,
                subjectgroups:null,
                user:null,
                classid:null,
                attendanceKey:0,
                students:null,
                tableKey:0,
                attendance:{
                    subdetail:null,
                    classroom:null,
                    date:null
                },
                student_attendance:[]
            }
    },

    methods: {
        seeAttendance(){
            this.viewAttendance = !this.viewAttendance
            this.attendance.subdetail =null
                    this.attendance.classroom =null
                    this.attendance.date =null
                this.student_attendance =[]
                this.students= null
        },

        getStudents(){
            Attendance.getStudents(this.attendance.classroom).then((result) => {
                this.students = result.data
                this.datatable()
                this.tableKey++
            }).catch((err) => {

            })
        },

       getClassroomGroups(){
            Attendance.getClassroomGroups(this.attendance.subdetail.groupid).then((result) => {
                this.classroomgroups = result.data
            }).catch((err) => {

            });
        },

        getSubjectGroup(){
           Attendance.getSubjectGroup(this.user.id).then((result) => {
                this.subjectgroups = result.data
            }).catch((err) => {

            });
        },
        saveAttendance(){
            var post = [this.attendance, this.student_attendance]
            Attendance.saveAttendance( post).then((result) => {
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Attendance Submitted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.attendance.subdetail =null
                    this.attendance.classroom =null
                    this.attendance.date =null
                this.student_attendance =[]
                this.students= null
            })
        },
        getAttendance(){
            Attendance.getAttendance(this.attendance.classroom, this.attendance.subdetail.subject, this.attendance.date).then((result) => {
                this.students = result.data
                this.attendanceKey++
            })
        },
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getSubjectGroup()                           
                this.datatable()
            }).catch(()=>{
				this.$router.push('/')
			})
        },
     datatable(){            
            $(function() {
                 $('#all-students').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
            $(function() {
                 $('#studentstable').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        }
        },
           
               

    created() {
        this.getAuth()
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
