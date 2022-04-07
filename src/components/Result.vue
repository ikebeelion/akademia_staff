<template>
    <div>
        <section  v-if="!resultMode">
        <h1>Check Result of Students in your class</h1>
            <center>
                <div class="form-group">
                    <label for="">Class Group</label>
                    <select  v-model="getResult.classgroup" @change="makeNull()">
                        <option value="null">Select Class Group</option>
                        <option v-for="classroom in classroomgroup" :value="classroom.clgid" :key="classroom.clgid">
                            {{ classroom.classgroupname }}
                        </option>

                    </select>
                </div>
                <div class="form-group">
                    <label for="">Class Room</label>
                    <select  v-model="getResult.classroom" @change="getStudentsInClass()">
                        <option value="null">Select Class Room</option>
                        <option v-for="classroom in classroomgroups" :value="classroom.clsrmgpid" :key="classroom.clsrmgpid">
                            {{ classroom.classgroupname }} - {{classroom.classroom}}
                        </option>

                    </select>
                </div>
                  <div class="form-group">
                    <label for="">Academic Period</label>
                     <select v-model="getResult.academicPeriodid"  @change="checkInput">
                        <option value="null">Select Academic Period</option>
                         <option v-for="period in academicPeriods" :key="period.id" :value="period.id">
                            {{ period.session.session }} - {{ period.term }}
                         </option>
                    </select>
                </div>                                                
                <table id="stres">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody :key="tableKey">
                    <tr v-for="student in students" :key="student.studentuseraccountid">
                        <td>{{student.firstname}}</td>
                        <td>{{student.lastname}}</td>
                        <td>
                            <button @click.prevent=getStudentResult(student.studentuseraccountid)>
                                Generate Result
                            </button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </center>
        </section>
        <section v-if="resultMode" style="margin-right:5%" >
        <!-- SCHOOL INFORMATION -->
            <div class="form-group">
                <center>
                    <div class="img-container" style="margin-bottom:10px">
                        <img :src="'https://raw.githubusercontent.com/ikebeelion/akademia_api/main/public/images/school/'+this.schoolProfile.schoollogo" alt="school photo" height="80px" width="100px">
                    </div>
                </center>
                <center>
                    <div class="img-watermark" style="margin-bottom:10px">
                        <img :src="'https://raw.githubusercontent.com/ikebeelion/akademia_api/main/public/images/school/'+this.schoolProfile.schoollogo" alt="school photo" height="80px" width="100px">
                    </div>
                </center>
            </div>
            <div class="form-group">
                <center style="margin-left:2%">
                    <h1 id="school-name">{{this.schoolProfile.schoolname}}</h1>
                    <p><strong>{{this.schoolProfile.address}}</strong></p>
                </center>
            </div>
            <!-- STUDENT INFORMATION -->            
            <center style="margin-bottom:3%;margin-top:3%; ">
                 <u><h3> {{ resultProfile.term}} Student Performance Report </h3></u>
            </center>
                <table style="margin-bottom:3%;margin-top:3%; ">
                    <tbody>
                        <tr>
                            <td class="mr-3"><b>NAME:</b>
                                {{resultProfile.firstname}}{{ resultProfile.othername }} {{ resultProfile.lastname}}
                            </td>
                             <td class="mr-3"><b>GENDER:</b>
                                 {{resultProfile.genderid}}
                            </td>
                             <td><b>ADMISSION NO:</b>
                                 {{ resultProfile.studentuseraccountid}}3171
                             </td>
                             <td rowspan=3>
                             <div class="img-container" style="margin-bottom:10px">
                                  <img :src="'http://localhost:8000/images/students/'+this.resultProfile.photo" alt="student photo" height="80px" width="90px">
                             </div>
                              </td>
                        </tr>
                         <tr>
                             <td><b>CLASSROOM:</b>
                                {{resultProfile.classgroupname}} {{resultProfile.classroom}}
                            </td>
                            <td><b>ACADEMIC SESSION:</b>
                                {{resultProfile.session}}
                            </td >
                            <td><b>TERM:</b>
                                {{ resultProfile.term}}
                            </td>
                        </tr>
                         <tr>
                             <td class="mr-1"><b>DOB:</b>
                                {{resultProfile.dob}}
                            </td>
                            <td class="mr-1"><b>Age:</b>
                                 {{ age(resultProfile.dob) }} years
                            </td>

                             <td class="mr-1"><b>Students in Class:</b>
                                {{ studentsCount }}
                            </td>
                        </tr>
                        <tr>
                            <td class="mr-1"><b>Next Term Begins:</b>
                                {{ resultProfile.next_resumption }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                   <!-- STUDENT RESULT -->
                            <table style="margin:3%; ">
                                <thead class="thead">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <!-- <td rowspan="2">HESOYAM</td> -->
                                        <th colspan="3">
                                            <center>CA</center>
                                        </th>
                                        <th rowspan="2">EXAM</th>
                                        <th rowspan="2">TOTAL</th>
                                        <th rowspan="2">GRADE</th>
                                        <th rowspan="2">REMARK</th>
                                    </tr>
                                    <tr>
                                        <th>Subjects</th>
                                        <th>Credit Load</th>
                                        <th>G.P.A</th>
                                        <th>1st</th>
                                        <th>2nd</th>
                                        <th>3rd</th>
                                    </tr>
                                </thead>
                                <tbody :key="resultKey" >
                                    <tr v-for="res in result" :key="res.id" >                                            
                                            <td><center>{{res[0]['title']}}</center></td>                                            
                                            <td><center>{{res[0]['creditload']}}</center></td>
                                            <td><center>{{gradeGpa((res[0]['creditload']), sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center></td>
                                            <td><center>{{res[0]['score'] }}</center></td>
                                            <td><center>{{res[1]['score'] }}</center></td>
                                            <td><center>{{res[2]['score'] }}</center></td>
                                            <td><center>{{res[3]['score'] }}</center></td>
                                            <td><center>{{sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score']) }}</center></td>
                                            <td><center>{{gradeResult(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center></td>
                                            <td class="distinction" v-if="distinction(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score']))">
                                                <center>{{distinction(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center>
                                            </td>
                                            <td class="verygood" v-if="verygood(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score']))">
                                                <center>{{verygood(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center>
                                            </td>
                                            <td class="credit" v-if="credit(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score']))">
                                                <center>{{credit(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center>
                                            </td>
                                            <td class="pass" v-if="pass(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) ">
                                                <center>{{pass(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center>
                                            </td>
                                            <td class="fail" v-if="fail(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score']))">
                                                <center>{{fail(sumScore(res[0]['score'],res[1]['score'],res[2]['score'],res[3]['score'])) }}</center>
                                            </td>
                                            
                                    </tr>
                                </tbody>
                            </table>
                              
                            
                             
                                    
                                    
                                        <div class="form-group">
                                        <table>
                                                <thead>
                                                    <tr>
                                                        <th><center>Average</center></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>                                     
                                                        <td>
                                                            <center>{{ Math.round(this.average * 100) / 100}}</center>
                                                        </td>
                                                    </tr>
                                                </tbody>  
                                        </table>
                                        </div>
                                        <div class="form-group">
                                        <table>
                                            <thead>
                                                <tr>                                                
                                                    <th><center>G.P.A</center></th>
                                                    <th>REMARK</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>                                                    
                                                    <td>
                                                        <center>{{Math.round(this.gpa * 100)/ 100}}</center>
                                                    </td>
                                                    <td v-if="this.gpa >= 4.5"><center>First Class</center></td>
                                                    <td v-if="this.gpa >= 3.5 && this.gpa <= 4.4"><center>Second Class Upper</center></td>
                                                    <td v-if="this.gpa >= 3.0 && this.gpa <= 3.4"><center>Second Class Lower</center></td>
                                                    <td v-if="this.gpa < 3.0"><center>Third Class</center></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </div>
                                        <div class="form-group">
                                            <table >
                                                <thead>
                                                    <tr>
                                                        <th> A </th>
                                                        <th> B </th>
                                                        <th> C </th>
                                                        <th> D </th>
                                                        <th> F </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><center>70 & above</center></td>
                                                        <td><center>60 - 69 </center></td>
                                                        <td><center>50 - 59</center></td>
                                                        <td><center>40 - 49</center></td>
                                                        <td><center>0 - 39</center></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                            
                           <p class="breakPage" style="color:white">here
                           </p>
                           
                        <!-- STUDENT DOMAIN -->      
                                    <table style="margin-top:10%">
                                        <thead>
                                            <tr>
                                                <th><center>RATING INDICES</center></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                                <tr>
                                                    <td>
                                                        <p>5 - Maintains an Excellent degree of Observable traits</p>
                                                        <p>4 - Maintains an High Level of Observable traits</p>
                                                        <p>3 - Acceptable Level of Observable traits</p>
                                                        <p>2 - Shows Minimal regard for Observable traits</p>
                                                        <p>1 - Has No regard for Observable traits</p>
                                                    </td>
                                                </tr>
                                        </tbody>
                                    </table>                                                      
                                 
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>AFFECTIVE DOMAIN</th>
                                                <th>RATING</th>
                                                <th>Remark</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                                <tr v-for="psych in psych" :key="psych.id" >
                                                    <td>{{psych.psychomotor}}</td>
                                                    <td><center>{{psych.rating}}</center></td>
                                                    <td class="text-light distinction" v-if="psych.rating == 5"><center>Excellent</center></td>
                                                    <td class="text-dark verygood" v-if="psych.rating == 4"><center>Very good</center></td>
                                                    <td class="text-dark credit" v-if="psych.rating == 3"><center>Satisfactory</center></td>
                                                    <td class="text-light pass" v-if="psych.rating == 2"><center>Fair</center></td>
                                                    <td class="text-light fail" v-if="psych.rating == 1"><center>Poor</center></td>
                                                </tr>
                                        </tbody>
                                    </table>
                                    <table>
                                    <thead>
                                        <tr>
                                            <th>PSYCHOMOTIVE DOMAIN</th>
                                            <th>RATING</th>
                                            <th>REMARK</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="dom in domain" :key="dom.id" >
                                            <td>{{dom.affective_domain}}</td>
                                            <td><center>{{dom.rating}}</center></td>
                                            <td class="text-light distinction" v-if="dom.rating == 5"><center>Excellent</center></td>
                                            <td class="text-dark verygood" v-if="dom.rating == 4"><center>Very good</center></td>
                                            <td class="text-dark credit" v-if="dom.rating == 3"><center>Satisfactory</center></td>
                                            <td class="text-light pass" v-if="dom.rating == 2"><center>Fair</center></td>
                                            <td class="text-light fail" v-if="dom.rating == 1"><center>Poor</center></td>
                                        </tr>
                                    </tbody>
                                    </table>                                
                                   
                            <!-- STUDENT REMARK -->
                            <table>
                                <thead>
                                    <tr>
                                        <th><center>REMARKS</center></th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        <tr>
                                            <td>Class Teacher Remark: <b>{{remark[0].teacher_remark}}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Principal Remark: <b>{{remark[0].principal_remark}}</b></td>
                                        </tr>
                                    </tbody>                                                      
                            </table>
                            
                               
                        <!-- PERFORMANCE COMMENT -->
                             <table>
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>comment</th>
                                            <th>Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>                              
                                        <tr v-for="comment in comments" :key="comment.id">
                                            <td>{{comment.subjecttitle}}</td>
                                            <td>{{comment.teacher_remark}}</td>
                                            <td>
                                                        <tr>
                                                            <td>C.A</td>
                                                            <td>EXAM</td>
                                                            <td>SCORE</td>
                                                            <td>CLASS AVG</td>
                                                        </tr>
                                                        <tr>
                                                            <td>{{comment.ca}}</td>
                                                            <td>{{comment.exam}}</td>
                                                            <td>{{comment.score}}</td>
                                                            <td>{{comment.avg}}</td>
                                                        </tr>                                                    
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                          
                        <div id="print">
                                <h1 @click.prevent="print">
                                    <i class="fas fa-print"></i>
                                </h1>
                            </div>
        </section> 
        
                   
    </div>
</template>

<script>
import User from '../apis/User.js'
import Result from '../apis/Result.js'
import pulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Swal from 'sweetalert2'
export default {
    components:[pulseLoader],
    data() {
        return {
                printMode: false,
                viewAttendance:false,
                checkFilled:true,
                classroomgroups:null,
                classroomgroup:null,
                tableKey:0,
                user:null,
                students:null,
                academicPeriods:null,
                resultMode:false,
                getResult:{
                    academicPeriodid:null,
                    classroom:null,
                    classgroup:null
                },
                totalScores:null,
                psych:null,
                remark:null,
                result:null,
                subjects:null,
                classid:null,
                resultProfile:null,
                principalOfficer:null,
                studentsCount:null,
                schoolProfile:{
                    schoolname:null,
                    total:null,
                    alias:null,
                    schoolemail:null,
                    schooltel:null,
                    schoollogo:null,
                    schoolmotto:null,
                    address:null,
                    countryid:null,
                    stateid:null,
                    cityid:null,
                    year_of_establishment:null,
                    schoolzone:null,
                    schoolchapter:null,
                    associationAffiliation:null,
                    educationDistrict:null,
                    date:null
                },
                date:null,
                gpa:0,
                average:0,
                domain:null,
                comments:null,
                totalCredit:0,
                creditloadpoints:0,
                totalpoints:0,
                isLoading:false,
                resultKey:0,
                scores:[],
                creditLoad:[],
                gradePoints:[]
            }
    },

    methods: {
        getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  
                this.getClassGroups()
                this.getSchoolInfo()
                this.getPrincipalOfficer()
                this.getAcademicPeriod()
                this.getCurrentDate()
            })
            .catch(()=>{
				this.$router.push('/')
			})
        },
         

        makeNull(){
            this.getClassRoomTeacher()
        },
        getStudentsInClass(){           
           this.getStudentsCount()
            Result.getStudentsInClass(this.getResult.classroom).then((result) => {
                this.students = result.data
                this.datatable()
                this.tableKey++
            })
        },

        pushToArray(data){            
            this.gradePoints.push(data)
        },

        getClassRoomTeacher(){
            Result.getClassRoomTeacher(this.user.id,this.getResult.classgroup).then((result) => {
                this.classroomgroups = result.data
            })
        },

        getClassGroups(){
            Result.getClassGroups(this.user.id).then((result) => {
                this.classroomgroup = result.data
            })
        },

        getSubjectGroups(){
            Result.getSubjectGroups(this.getResult.classgroup).then((result) => {
                this.subjects = result.data
            })
        },

        getPrincipalOfficer(){
            Result.getPrincipalOfficer(this.user.branchid).then((result) => {
                this.principalOfficer = result.data
            })
        },

         getStudentsCount(){
                    Result.getStudentsCount(this.classroomgroups[0]['clsrmgpid']).then((result) => {
                        this.studentsCount = result.data
                    })
                },

        sumScore(a,b,c,d){                        
            return parseFloat(a)+parseFloat(b)+parseFloat(c)+parseFloat(d)
        },

        getTotalScores(){            
            this.result.forEach(res =>{                
                for(var subject of res){
                    this.scores.push(subject.score)
                }
            })
        },
       
        gradeResult(totalScore){
            if(totalScore >= 70){
                return "A"
            }
            if(totalScore >= 60 && totalScore < 70){
                return "B"
            }
            if(totalScore >= 50 && totalScore < 60){
                return "C"
            }
            if(totalScore >= 40 && totalScore < 50){
                return "D"
            }
            if(totalScore < 40){
                return "F"
            }

        },

        gradeGpa(cl, totalScore){               
            if(totalScore >= 70){                
                return parseFloat(cl) * 5
            }
            if(totalScore >= 60 && totalScore < 70){                
                return parseFloat(cl) * 4
            }
            if(totalScore >= 50 && totalScore < 60){         
                return parseFloat(cl) * 3
            }
            if(totalScore >= 40 && totalScore < 50){
                return parseFloat(cl) * 1
            }
            if(totalScore < 40){
                return parseFloat(cl) * 0
            }
            

        },

        distinction(totalScore){
            if(totalScore >= 70){                
                return "Excellent"
            }
        },
        verygood(totalScore){
            if(totalScore >= 60 && totalScore < 70){                                
                return 'Very Good'
            }
        },
        credit(totalScore){
            if(totalScore >= 50 && totalScore < 60){
                return "Credit"
            }
        },
        pass(totalScore){
            if(totalScore >= 40 && totalScore < 50){
                return "Pass"
            }
        },
        fail(totalScore){
            if(totalScore < 40){
                return "Fail"
            }
        },        
        getStudentResult(studentid){                            
            Result.getResultProfile(studentid).then((result) => {
                this.resultProfile = result.data
            })
            Result.getResult(studentid,this.getResult.academicPeriodid).then((result) => {            
                var res =  result.data                                                        
                var subjects = []
                res.forEach(rxlt =>{
                    this.scores.push(rxlt.score_obtained)                    
                })     
               Result.getResultData(studentid,this.getResult.academicPeriodid).then((result) => {                   
                   this.gpa = result.data['gpa']
                   this.average = result.data['average']
                   this.totalCredit = result.data['totalCredit']
                   this.totalpoints = result.data['totalPoints']
               })

                res.forEach(element => {
                    subjects.push({
                            id:element.resultsubject,
                            title:element.subjecttitle,
                            creditload:element.credit_load,
                            resultype:element.restult_typeid,
                            score:element.score_obtained                                                    
                        }
                    )                                      
                });
                var results = subjects.reduce((results, subject)=>{
                    (results[subject.id] = results[subject.id] || []).push(subject)
                    return results
                }, {}) 
                                                
                this.result = results                                 
                this.resultMode = true
            })                                          
                    this.getPsychoMotor(studentid)
                    this.getRemarks(studentid)
                    this.getAffectiveDomain(studentid)
                    this.getComments(studentid, this.getResult.academicPeriodid )
                
                
                
                
                
             Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Loaded',
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 1000
                })

        },


        getComments(studentid, periodid){
            Result.getComments(periodid, studentid).then((result) => {
                this.comments = result.data
            })

        },

         datatable(){            
            $(function() {
                 $('#stres').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },


        getSchoolInfo(){
            Result.getSchoolInfo(this.user.branch.schoolid).then((result) => {
                this.schoolProfile.schoolname = result.data['schoolname']
                this.schoolProfile.alias = result.data['alias']
                this.schoolProfile.schoolemail = result.data['schoolemail']
                this.schoolProfile.schooltel = result.data['schooltel']
                this.schoolProfile.schoollogo = result.data['schoollogo']
                this.schoolProfile.schoolmotto = result.data['schoolmotto']
                this.schoolProfile.address = result.data['address']
                this.schoolProfile.countryid = result.data['countryid']
                this.schoolProfile.stateid = result.data['stateid']
                this.schoolProfile.cityid = result.data['cityid']
                this.schoolProfile.year_of_establishment = result.data['year_of_establishment']
                this.schoolProfile.schoolzone = result.data['schoolzone']
                this.schoolProfile.schoolchapter = result.data['schoolchapter']
                this.schoolProfile.associationAffiliation = result.data['associationAffiliation']
                this.schoolProfile.educationDistrict = result.data['educationDistrict']
            })
        },

        getPsychoMotor(studentid){
            Result.getPsychoMotor(studentid,this.getResult.academicPeriodid).then((result) => {
                this.psych = result.data
            })
        },

        getAffectiveDomain(studentid){
            Result.getAffectiveDomain(studentid,this.getResult.academicPeriodid).then((result) => {
                this.domain = result.data
            })
        },

        getRemarks(studentid){
            Result.getRemarks(studentid, this.getResult.academicPeriodid).then((result) => {
                this.remark = result.data
            })
        },

        getAcademicPeriod(){
            Result.getAcademicPeriod(this.user.branchid).then((result) => {
                this.academicPeriods = result.data
            })
        },

        print(){            
            window.print()
            this.$router.push('/result')
        },

        getCurrentDate(){
            let today = new Date()
            let month = today.getMonth()
            let year = today.getFullYear()
            let date = today.getDate()
            let current_date = month+'/'+date+'/'+year

            this.date = current_date
            this.year = year
        },


        age(dob){
            let year = dob.substr(0,4).trim()
            let age = this.year - year

            return age
        },
        
      
        roundPoints(){
            const point= this.gpa
            var strPoint = point.toString()
            return strPoint.substring(0, 4)
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
        align-items: center;
        
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
    #printResult{
        display:none;
    }
    body{
        background-color: transaprent;
        -webkit-print-color-adjust: exact;
        opacity: 0.2;
    }
    .distinction{
    background-color: green;
    }
    .verygood{
    background-color: greenyellow;
    }
    .credit{
    background-color:cyan;
    }
    .pass{
    background-color: chocolate;
    }
    .fail{
    background-color: red;
    }

    #align{
        vertical-align: middle;
    }
    #school-name{
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    }
    .psyh{
        background-color: crimson;
        color: white;
    }

      #print{
    display:block}
    .img-watermark img{display:none}
    @media print{
    
    table, th, h1, td{
        font-size: smaller;        
    }

    tr{
        background-color: transparent;
    }

    thead{
        background: lightslategrey;
    }
    .breakPage{
        page-break-after: always !important;
        color:white;
    }
    #print{
    display:none}
    
	table tbody{
		background: transparent
	}
            
        .img-watermark img{        
            display: flex;        
            justify-content: center;
            height: 100%;
            width: 100%;
            max-height: 300px;
            max-width: 300px;            
            position: absolute;            
            margin-left: 30%;
            margin-right: 30%;
            margin-top:40%;
            opacity: 0.1;
            z-index: 10000;
        }
    }


   
</style>
