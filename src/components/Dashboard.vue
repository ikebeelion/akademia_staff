<template>
    <div :key="chartKey">        
        <div class="cardBox">
			<div class="card">
				<div>
					<div class="numbers">{{ getSubjectLenght() }}</div>
					<div class="cardName">Subjects Taught</div><br>					
						<div v-if="subjectsTaught != null" >
							<p v-for="subject in subjectsTaught" :key="subject">
							{{ subject.subjecttitle }} {{ subject.classgroupname}}</p>
						</div>
						<div v-else>
							<p>No Subjects Taught</p>
						</div>
				</div>
				<div>
					
				</div>
				<div class="iconBox">					
					<i class="fas fa-book" aria-hidden="true"></i>
				</div>

			</div>

			<div class="card">
				<div>
					<div class="numbers">{{ getManagedLenght() }}</div>
					<div class="cardName">Class Rooms Managed</div><br>										
						<div v-if="subjectsTaught != null" >
							<p v-for="classroom in classroomManaged" :key="classroom">
							{{ classroom.classgroupname }} {{ classroom.classroom}}</p>
						</div>
						<div v-else>
							<p>No Class Room Managed</p>
						</div>
				</div>
				<div class="iconBox">
				 <i class="fas fa-chalkboard-teacher"></i>
				</div>
			</div>

			
		</div>

		<section style="margin-top:8%">
			<h1>Time Table</h1>
			<table>
				<thead>
					<tr>
						<th>Subject</th>
						<th>Day</th>
						<th>Class</th>
						<th>Start Time</th>
						<th>Finish Time</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="table in timetable" :key="table">
						<td>{{table.subjecttitle}}</td>
						<td>{{table.day}}</td>
						<td>{{table.classgroupname}} {{table.classroom}}</td>
						<td>{{table.from}}</td>
						<td>{{table.to}}</td>
					</tr>
				</tbody>
			</table>
		</section>
	
    



    </div>
</template>

<script>
import User from '../../src/apis/User.js'
import Dashboard from '../../src/apis/Dashboard.js'
export default {
    data() {
        return {
			
			user:[],
            timetable:null,
			series: [],
			subjectsTaught:[],
			classroomManaged:[],
			activeperiod:null
		}
    },
    methods: {
		getManagedLenght(){
			if(this.classroomManaged != []){				
				var classrooms = this.classroomManaged
				return classrooms.length
			}else{
				return 0
			}
		},

		getTimTable(){
			Dashboard.getTimTable(this.user.id, this.activeperiod).then((result) => {
				this.timetable = result.data[1]
			})
		},

		getSubjectLenght(){
			if(this.subjectsTaught != []){				
				var classrooms = this.subjectsTaught
				return classrooms.length
			}else{
				return 0
			}
		},
        getSubjectTeacher(){
			Dashboard.getSubjectTeacher(this.user.id).then((result) => {
				this.subjectsTaught = result.data
			})
		},
		getClassTeacher(){
			Dashboard.getClassTeacher(this.user.id).then((result) => {
				this.classroomManaged = result.data	
			})
		},

		getCurrentPeriod(){
			Dashboard.getCurrentPeriod(this.user.branch.id).then((result) => {
				this.activeperiod = result.data['period']
				this.getTimTable()
			})

		}
    },  
    created() {
        User.auth().then((result)=>{			
            this.user = result.data 
			this.getCurrentPeriod()           	
			this.getSubjectTeacher()	
			this.getClassTeacher()
			
        })	

    },

	

}
</script>
<style scoped>
	.cardBox{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(2, 2fr);
		grid-gap: 200px;		
	}
	.chartBox{
		position: relative;
		width: 100%;
		padding: 20px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 20px;
	}

	.chartBox .card {
		
		position: relative;
		background: #fff;		
		display: flex;
		padding: 20px;
		justify-content: space-between;
		cursor: pointer;	
	}

	.cardBox .card {
		position: relative;
		background: #fff;
		border:1px solid rgb(190, 190, 190);
		padding: 20px;
		display: flex;
		justify-content: space-between;
		cursor: pointer;	
	}

	.cardBox .card .numbrs{
		position: relative;
		font-size: 2em;
		font-weight: 500;
	}

	.cardBox .card .cardName{
		color: #999
	}

	.cardBox .card .iconBox{
		font-size: 2.5em;
		color: #0a2b3a;
	}	

	@media (max-width:992px){
		.cardBox{
			display:block;
		}	
		.chartBox{
			display: block;
		}
	}
</style>