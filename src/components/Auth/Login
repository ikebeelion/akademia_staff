<template>
    <div class="container">
		<div class="card">
			<div class="inner-box" id="card">
				<div class="card-front">
						<center>
							<span class="icon">
								<img class="logo" src="logo.png" alt=""> 							
								<h1>Akademia</h1>
							</span>
					</center>
					<center><h3 style="font-weight:500">Staff Login</h3></center>
					<p style="color:red">{{errors}}</p>
					<form>
						<input @input="checkInput" type="text" v-model="logindata.username" class="input-box" name="email" placeholder="Your Username" autocomplete="" required> 
						<input @input="checkInput" type="password" v-model="logindata.password" class="input-box" name="password" placeholder="Your Password" required>

						<button type="button" :disabled="checkFilled" @click="login" class="submit-btn">Login</button>						
					</form>
                                           

					
					<a href="">Forgot password?</a>

					<button type="button" class="btn" >
					<i style="margin-top:25px" class="fas fa-copyright"> </i> 2022 Next It-Services
					</button>


				</div>		
			</div>
		</div>
	</div>		
</template>
<script>
import User from '../../apis/User'
export default {
	data() {
        return {
            checkFilled:true,
            rememberme:false,
            logindata: {
                username:null,
                password:null,
            },
			user:null,
            errors:null,
        }
    },
    methods: {
        checkInput(){
            this.errors = null
            if(this.logindata.username != null && this.logindata.password != null){
                this.checkFilled = false
            }else{
                this.checkFilled = true
            }
        },

		openRegister(){
			var card = document.getElementById('card')
			card.style.transform = 'rotateY(-180deg)'
		},

		openLogin(){
			var card = document.getElementById('card')

			card.style.transform = 'rotateY(0deg)'
		},

        login(){			
					
			User.login(this.logindata).then((result) =>{
				// getUser
				localStorage.setItem("stafftoken", result.data['access_token'])							
				window.location.href = 'dashboard'
				User.auth().then((result)=>{
					if(result.data.roleid == 3){
						localStorage.setItem("auth", "true")
					}else{
						this.errors = "Login as Staff"
					}
				})
				
			}
			).catch((err) => {
				this.errors = err.response.data.errors[0][0]
			});
        }

    },        
    
}
</script>

<style scoped>

    *{
	margin: 0;
	padding: 0;
}

.container{
	width: 100%;
	height: 100vh;
	font-family: sans-serif;
	background-image: url('../../../public/login.png');
	background-size:cover;	
	background-position: center;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.card{
	width: 500px;
	height: 500px;
	box-shadow: 0 0 40px 20px rgba(0, 0, 0, 0.26);	
	border-radius: 20px;
	perspective: 1000px;
}

.inner-box{
	position: relative;
	width: 100%;
	height: 100%;	
	transform-style: preserve-3d;
	transition: transform 1s;
}

.card-front, .card-back{
	position: absolute;
	width: 100%;
	height: 100%;
	background-position: center;
	background-size: cover;	
	background-image: linear-gradient(#10101bec, #10101bec);
	padding: 55px;
	box-sizing: border-box;
	backface-visibility: hidden;
}


.card-back{
	transform: rotateY(180deg);
}

.card h2{
	font-weight: normal;
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
}

.google{
    width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
    cursor: pointer;

}

.google:hover{
    border:1px solid red
}
.input-box{
	width: 100%;
	background: transparent;
	border:  1px solid #fff;
	margin:  6px 0;
	height: 32px;
	border-radius: 20px;
	padding: 0 10px;
	box-sizing: border-box;
	outline: none;
	text-align: center;
	color: #fff;
}

::placeholder{
	color: #fff;
	font-size: 12px;
}

button{
	width: 100%;
	background: transparent;
	border: 1px solid #fff;
	margin: 35px 0 10px;
	height: 32px;
	font-size: 12px;
	border-radius: 20px;
	padding: 0 1px;
	box-sizing: border-box;
	outline: none;
	color: #fff;
	cursor: pointer;
}

.submit-btn{
	position:  relative;
}

.submit-btn::after{
	content: '\27a4';
	color: #333;
	line-height: 32px;
	font-size: 17px;
	height: 32px;
	width: 32px;
	border-radius: 50%;
	background: #fff;
	position: absolute;
	right: -1px;
	top: -1px;
}
.submit-btn:hover{
	background: rgb(11, 117, 25);
}
span{
	font-size: 12px;
	margin-left: 10px;
}

.card .btn{
	border: none;
	margin-top: 70px;
}

.card a{
	display: block;
	text-align: center;
	color: #fff;
	font-size: 13px;
	margin-top: 8px;
}    
.icon{	
	position:  relative;
	display: flex;	
	justify-content: center;
	align-content: center;
	height: 60px;
	max-width: 60px;
	line-height: 60px;
	padding-top: 0;
	margin-top: -46px;
    margin-bottom: 10px;
}
.icon .logo{			
	
	width: 100%;
}
</style>

