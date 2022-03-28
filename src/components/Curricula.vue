<template>
    <div>
    <h1>Upload Curricula</h1>
    <section>
        <center>
         <div class="form-group">
                <label for="">Document</label>
                <input type="file" class="form-control" @click="pickFile">
            </div>
            <button class="btn btn-success mt-2 col-4" @click="uploadCurricula">
                <i class="fa fa-upload" aria-hidden="true"></i>
            </button>
            </center>
    </section>
     
                <!-- End Page-content -->
        </div>
</template>

<script>
import User from '../apis/User.js'
import Curricula from '../apis/Curricula.js'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            uploadedDoc:{document:null}
            }
    },

    methods: {
        pickFile(e){        
        console.log(e.target.files[0]['size'])
         if(e.target.files[0]['size'] < 2111775){
            this.selectedfile = e.target.files[0]     
            const config = {
                headers:{'content-type':'multipart/form-data'}
            }
            var formData = new FormData()
            formData.append('file',this.selectedfile)
            Curricula.uploadImage(formData, config).then((result) => {
                this.uploadedDoc.document = result.data            
            })
         }else{
                Swal.fire({
                            icon: 'warning',
                            title: 'Oooops',
                            text: 'You are uploading a file larger than 2mb'
                            })
            }
      
    },
getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                  

            }).catch(()=>{
				this.$router.push('/')
			})
        },
        uploadCurricula(){
            Curricula.uploadCurricula(this.uploadedDoc).then((result) => {
                this.uploadedDoc.document = null
                 Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Uploaded Successfully',
                    customClass: 'swal-wide',
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
