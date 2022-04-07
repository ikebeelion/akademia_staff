<template>
    <div>
          <section v-if="resultMode" >
        <!-- SCHOOL INFORMATION -->
            <div class="form-group-row">
                <div class="img-container" style="margin-bottom:10px">
                    <img :src="'https://raw.githubusercontent.com/ikebeelion/akademia_api/main/public/images/school/'+this.schoolProfile.schoollogo" alt="school photo" height="80px" width="100px">
                </div>
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
                                  <img :src="'https://raw.githubusercontent.com/ikebeelion/akademia_api/main/public/images/students/'+this.resultProfile.photo" alt="student photo" height="80px" width="90px">
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
                            <table style="margin-bottom:3%;margin-top:3%; ">
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
                            
                               <table>
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
                                            <table>
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

                        <!-- STUDENT DOMAIN -->                                                            
                                 
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
                          
        </section> 
    </div>
</template>

<script>
export default {    
    props:{
        result:null,
        average:null,
        gpa:null,
        psych:null,
        domain:null,
        teacher_remark:null,
        principal_remark:null,
        comments:null,        
    }    
}
</script>