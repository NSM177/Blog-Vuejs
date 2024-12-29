<template>
    <div class="signup-container">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Họ và Tên:</label>
          <input type="text" id="name" v-model="formData.name" required placeholder="Nhập họ và tên của bạn" />
          <p class="msg-error" v-if="errors.name">{{ errors.name }}</p>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required placeholder="Nhập địa chỉ email" />
          <p class="msg-error" v-if="errors.email">{{ errors.email }}</p>

        </div>
        <div class="form-group">
          <label for="password">Mật khẩu:</label>
          <input type="password" id="password" v-model="formData.password" required placeholder="Nhập mật khẩu" />
          <p class="msg-error" v-if="errors.password">{{ errors.password }}</p>

        </div>
       
        <button @click="SignUp()">Đăng ký</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  export default {
    data() {
      return {
        formData: {
          name: "",
          email: "",
          password: ""
        },
        errors: {
          
        }
      };
    },
    methods: {
     
      async SignUp(){
        console.log(this.formData);
        if(this.validateUser()){
          let useritem = {
          name : this.formData.name,
          email : this.formData.email,
          password : this.formData.password
          
        }
        let result = await axios.post("http://localhost:3000/user", useritem);

        if(result.status == 201){
          Swal.fire({
          title: "Success!",
          text: "Data inserted",
          icon: "success",
          timer:2000
          });
          setTimeout(() =>{
            this.$router.push({
              name: 'Login'
            }, 20000)
          })
        }
        }

      },

      validateUser(){
        const errors = {};
        if(!this.formData.name){
          errors.name = "Name is required!";
        }

        if(!this.formData.email){
          errors.email = "email is required!";
        }else if(!this.validateEmail(this.formData.email)){
          errors.email = " valid email is required!";
        }

        if(!this.formData.password){
          errors.password = "password is required!";
        }
        
        this.errors = errors;

        return Object.keys(errors).length ===0;
      },
      validateEmail(email){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
      }
    }

  };
  </script>
  
  <style scoped>
  .signup-container {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  