<template>
    <div>
        <h1>Assignment</h1>
        <section v-show="!viewAssignment">
        <center>
            <div class="form-group">
                                            <label for="">Subject</label>
                                            <select v-model="assignment.subdetail" @change="getClassroomGroups()">
                                                <option value="">--</option>
                                                <option v-for="subject in subjectgroups" :value="{subject:subject.sub, groupid:subject.groupid }" :key="subject.sub">
                                                    {{ subject.subjecttitle }} - {{ subject.classgroupname }}
                                                </option>
                                            </select>
                                        </div><br/>
                                        <div class="form-group">
                                            <label for="">Class Room</label>
                                            <select v-model="assignment.classroom" @change="checkInput">
                                                <option value="">--</option>
                                                <option v-for="classroom in classroomgroups" :value="classroom.id" :key="classroom.id">
                                                    {{ classroom.classgroup.classgroupname }} - {{ classroom.classroom.classroom }}
                                                </option>

                                            </select>
                                        </div><br/>
                                        <div class="form-group">
                                            <label for="">Description</label>
                                            <textarea cols="30" rows="2" @input="checkInput" v-model="assignment.description" placeholder="..."></textarea>
                                        </div><br/>
                                        <div class="form-group">
                                            <label for="">Submission Date</label>
                                            <input type="date" @input="checkInput" v-model="assignment.submission_date">
                                        </div><br>
                                        <div class="form-group">
                                            <label for="">Image/Diagram</label>
                                            <input type="file" @click="pickFile">
                                          </div>
                                            <div style="margin-bottom: 50px">
                                            <button style="background:green" v-show="updateMode == false" @click.prevent="submitAssignment" :disabled="checkFilled==true">Set Assignment</button>
                                            <button  style="background:blue" v-show="updateMode == true" @click.prevent="updateAssignment" :disabled="checkFilled==true">Update Assignment</button>

                                            <button  style="background:brown" @click.prevent="seeAssignment">View assignment</button>
                                               
                                                </div>
                                            </center>
                                            

        </section>
        <section  v-show="viewAssignment">
            <center>
            <h1>View assignment</h1>
                    <div class="form-group">
                    <label for="">Subject</label>
                    <select v-model="assignment.subdetail" @change="getClassroomGroups()">
                        <option value="">--</option>
                        <option v-for="subject in subjectgroups" :value="{subject:subject.sub, groupid:subject.groupid }" :key="subject.sub">
                            {{ subject.subjecttitle }} - {{ subject.classgroupname }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="">Class Room</label>
                    <select v-model="assignment.classroom" @input="getAssignment">
                        <option value="">--</option>
                        <option v-for="classroom in classroomgroups" :value="classroom.id" :key="classroom.id">
                            {{ classroom.classgroup.classgroupname }} - {{ classroom.classroom.classroom }}
                        </option>
                    </select>
                </div><br/>
                <div class="form-group">
                    <label for="">Submission Date</label>
                    <input type="date" class="form-control col-4" v-model="assignment.submission_date" >
                </div>
                </center>
                
                <table id="myTable">
                    <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Class Room</th>
                        <th>Submission Date</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="assignment in allassignments" :key="assignment.assid">
                        <td>{{assignment.subjecttitle}}</td>
                        <td>{{assignment.classgroupname}}</td>
                        <td>{{assignment.submission_date}}</td>
                        <td>
                            <button class="btn btn-danger" @click.prevent="deleteAssignment(assignment.assid)">
                                 <i class="fas fa-trash" aria-hidden="true"></i>
                            </button>
                            <button class="btn btn-info" @click.prevent="getSingleAssignment(assignment.assid)">
                                <i class="fas fa-edit" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>

                    </tbody>
                </table>
           
            <center>
                <button  @click.prevent="seeAssignment">Goto Set Assignment</button>
            </center>
            </section>       
        </div>
</template>

<script>
import User from '../apis/User.js'
import Assignment from '../apis/Assignment.js'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
                viewAssignment:false,
                checkFilled:true,
                classroomgroups:null,
                subjectgroups:null,
                user:null,
                classid:null,
                students:null,
                selectedid:null,
                assignment:{
                    subdetail:"",
                    classroom:"",
                    submission_date:"",
                    description:"",
                    image:""
                },
                updateMode:false,
                allassignments:null
            }
    },

    methods: {
        checkInput(){
            if(this.assignment.subdetail && this.assignment.classroom != "" && this.assignment.description != '' && this.assignment.submission_date != "")
            {
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
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
        seeAssignment(){
            this.viewAssignment = !this.viewAssignment
            this.assignment.subdetail =null
                    this.assignment.classroom =null
                    this.assignment.submission_date =null
                    this.assignment.description = null
        },
        pickFile(e){        
        console.log(e.target.files[0]['size'])
         if(e.target.files[0]['size'] < 2111775){
            this.selectedfile = e.target.files[0]     
            const config = {
                headers:{'content-type':'multipart/form-data'}
            }
            var formData = new FormData()
            formData.append('file',this.selectedfile)
            Assignment.uploadImage(formData, config).then((result) => {
                this.assignment.image = result.data            
            }).catch((err) => {});
         }else{
                Swal.fire({
                            icon: 'warning',
                            title: 'Oooops',
                            text: 'You are uploading a file larger than 2mb'
                            })
            }
      
    },
       getClassroomGroups(){
            Assignment.getClassroomGroups(this.assignment.subdetail.groupid).then((result) => {
                this.classroomgroups = result.data
            })        
        },

        getSubjectGroup(){
           Assignment.getSubjectGroup(this.user.id).then((result) => {
                this.subjectgroups = result.data                
            })
        },
        submitAssignment(){
            Assignment.submitAssignment(this.assignment).then((result) => {
                this.getAssignment()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Assignment Added',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        },
        getAssignment(){
            console.log(this.assignment)
            Assignment.getAssignment(this.assignment.classroom, this.assignment.subdetail.subject).then((result) => {
                this.allassignments = result.data
            })
        },
        getSingleAssignment(id){
            Assignment.getSingleAssignment(id).then((result) => {
                this.assignment.subdetail.subject = result.data[0]['subjectid']
                this.assignment.classroom = result.data[0]['classid']
                this.assignment.submission_date = result.data[0]['submission_date']
                this.assignment.description = result.data[0]['description']
                this.assignment.image = result.data[0]['image']
                this.selectedid = result.data[0]['assid']
                this.updateMode = true
                this.viewAssignment = false
                this.checkFilled = false
            });

        },
        updateAssignment(){
            Assignment.updateAssignment(this.selectedid, this.assignment).then((result) => {
                this.getAssignment()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Assignment Updated',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.assignment.subdetail.subject = null
                this.assignment.classroom = null
                this.assignment.submission_date = null
                this.assignment.description = null
                this.assignment.image = null
                this.selectedid = null
                this.updateMode = false
                this.allassignments = null
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

        deleteAssignment(id){
            Assignment.deleteAssignment(id).then((result) => {
                this.getAssignment()
                    Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Assignment Deleted',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
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
        border-radius: 10%;        
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
        border-radius: 10%;        
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

