<template>
   <div class="container">   
        <div class="navigation" v-if="this.$route.path != '/'">
            <ul>
				<li>
					<router-link @click="closeToggle" to="">
						<span class="icon">
                			<img class="logo" src="logo.png" alt="">
            			</span>
						<span class="title"><h2>Akademia</h2></span>
					</router-link>
				</li>		
        <li>		
					<router-link @click="closeToggle" to="/dashboard" active-class="activeLink">
						<span class="icon"> 
              <i class="fas fa-tachometer-alt"></i>
            </span>
						<span class="title">Dashboard</span>
					</router-link>
				</li>				
          <!-- <li>		
          <router-link @click="closeToggle"  to="/attendance" active-class="activeLink">
            <span class="icon"> 
                      <i class="fas fa-clock" aria-hidden="true"></i>
                  </span>
            <span class="title">Attendance</span>
          </router-link>
         </li> -->
          <li>		
          <router-link @click="closeToggle"  to="/assignment" active-class="activeLink">
            <span class="icon"> 
                      <i class="fas fa-tasks" aria-hidden="true"></i>
                  </span>
            <span class="title">Assignment</span>
          </router-link>
         </li>
          <li>		
          <router-link @click="closeToggle"  to="/curricula" active-class="activeLink">
            <span class="icon"> 
                      <i class="fas fa-file-text" aria-hidden="true"></i>
                  </span>
            <span class="title">Upload Curriculum</span>
          </router-link>
         </li>
          <li>		
          <router-link @click="closeToggle"  to="/classroom" active-class="activeLink">
            <span class="icon"> 
                      <i class="fas fa-chalkboard-teacher    "></i>
                  </span>
            <span class="title">Manage Clasroom</span>
          </router-link>
         </li>
          <li>		
          <router-link @click="closeToggle"  to="/result" active-class="activeLink">
            <span class="icon"> 
                      <i class="fas fa-list-alt"></i>
                  </span>
            <span class="title">Result</span>
          </router-link>
         </li>
  
			</ul>
        </div>

		<!-- <Result /> -->
		
        <div class="main" v-if="this.$route.path != '/'">		
        <div class="topbar">
            <div class="toggle" @click.prevent="toggleMenu"></div>				                
			<div class="schoolinfo">
				<h1>
					{{this.schoolProfile.schoolname}}
					
				</h1>
				<small>
						<p>{{this.schoolProfile.address}}</p>	
					</small>
			</div>
			
			
			<p style="color:white; margin-left:25%">
				Logged In: {{this.user.username}}
			</p>
		<div>
			<button @click.prevent="logout" style="background:red; border:none; border-radius:20px; width:70px"> 
					<i class="fas fa-sign-out" aria-hidden="true"></i>
			</button>
			</div>
         </div>
          <div class="content">
            <router-view />
          </div>
        </div>     
		<div v-else>
			<router-view />
		</div>                              
    </div>
</template>

<script>
import User from '../src/apis/User'
import School from '../src/apis/School'
import Result from './components/Print.vue'
export default {	
  components:{Result},
  name: 'App',
  data() {
	  return {
		user:null,
		schoolProfile:{
			schoolname:"",
			schoolemail:"",
			schooltel:"",
			schoollogo:"",
			schoolmotto:"",
			address:"",
		},
		schoolname:"",
		address:""
	  }
  },
  methods: {
	getAuth(){
            User.auth().then((result)=>{				
                this.user = result.data                                                                				                
				this.getSchoolInfo()
			}).catch(()=>{
				this.$router.push('/')
			})
        },
	getSchoolInfo(){
		School.getSchoolInfo(this.user.branch.schoolid).then((result) => {
        this.schoolProfile.schoolname = result.data['schoolname']                
        this.schoolProfile.schoolemail = result.data['schoolemail']
        this.schoolProfile.schooltel = result.data['schooltel']
        this.schoolProfile.schoollogo = result.data['schoollogo']
        this.schoolProfile.schoolmotto = result.data['schoolmotto']
        this.schoolProfile.address = result.data['address']                
				this.schoolname = result.data['schoolname']
				this.address =  result.data['address']
                                    
            })
	},
    toggleMenu(){    
      		let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		},
	closeToggle(){
		let toggle = document.querySelector('.toggle');            
		let navigation = document.querySelector('.navigation')
		let main = document.querySelector('.main')            
		navigation.classList.remove('active')
		toggle.classList.remove('active')
		main.classList.remove('active')	
	},	 
		logout(){
			User.logout().then(() => {
				localStorage.removeItem("auth")				
				localStorage.clear()
				this.$router.push('/')
			})
		}
  },

  created() {
	this.getAuth()	
  },
  
}
</script>

<style>
@import url('../src/assets/style.css');
#delete{
	background:red;
	margin-right:5%;
}

#edit{
	background: navy;
}

@media print{
	.main .topbar{
	display:none}
	#ShowPrint{
	display:block !important}
	.content{
	display: none;}
}

</style>
